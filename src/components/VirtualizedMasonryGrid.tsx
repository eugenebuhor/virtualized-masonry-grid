import { type ReactNode, useEffect, useState, useRef, useCallback, forwardRef } from 'react';
import { useTheme } from 'styled-components';
import debounce from 'lodash.debounce';
import { GridContainer, GridItem } from './VirtualizedMasonryGrid.styled.ts';
import { getColumns } from '../utils/masonry.ts';
import type { ColumnsConfig } from '../types/masonry.ts';

type BaseGridItem = {
  id: string | number;
  height: number;
  width: number;
};

interface GridItemPosition {
  translateX: number;
  translateY: number;
  width: number;
  height: number;
}

interface VirtualizedMasonryGridProps<T extends BaseGridItem> {
  items: T[];
  children: (item: T, index: number) => ReactNode;
  columns?: number | ColumnsConfig;
  gap?: number;
  overscan?: number;
  loadMore?: (index: number) => void;
  hasMore?: boolean;
}

export const DEFAULT_COLUMNS = 3;

const LoadingFallback = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} style={{ height: '50px', textAlign: 'center' }}>
      Loading...
    </div>
  );
});

const VirtualizedMasonryGrid = <T extends BaseGridItem>({
  items,
  children,
  columns = DEFAULT_COLUMNS,
  gap = 16,
  overscan = 8,
  loadMore,
  hasMore,
}: VirtualizedMasonryGridProps<T>) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const [positions, setPositions] = useState<GridItemPosition[]>([]);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [containerHeight, setContainerHeight] = useState(0);

  const theme = useTheme();

  const updateLayout = useCallback(() => {
    if (!containerRef.current) return;

    const columnsCount =
      typeof columns === 'number' ? columns : getColumns(columns, theme.viewport.breakpoints);

    const containerWidth = containerRef.current.offsetWidth;
    const columnWidth = (containerWidth - gap * (columnsCount - 1)) / columnsCount;
    const columnHeights = Array(columnsCount).fill(0);

    const calculatedPositions = items.map((item) => {
      const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
      const translateX = shortestColumn * (columnWidth + gap);
      const translateY = columnHeights[shortestColumn];

      const aspectRatio = item.height / item.width;
      const itemHeight = columnWidth * aspectRatio;
      const itemWidth = columnWidth;

      columnHeights[shortestColumn] += itemHeight + gap;

      return {
        translateX,
        translateY,
        width: itemWidth,
        height: itemHeight,
      };
    });

    setPositions(calculatedPositions);
    setContainerHeight(Math.max(...columnHeights));
  }, [items, gap, columns, theme.viewport.breakpoints]);

  const updateVisibleItems = useCallback(() => {
    if (!positions.length || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerTop = containerRect.top + window.scrollY;

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;

    const start = scrollTop;
    const end = scrollTop + windowHeight;

    // create an array with positions and indices
    const positionsWithIndex = positions.map((pos, index) => ({
      index,
      translateY: pos.translateY,
      height: pos.height,
    }));

    // sort the array by translateY
    positionsWithIndex.sort((a, b) => a.translateY - b.translateY);

    const viewportIndices: number[] = [];
    for (const item of positionsWithIndex) {
      const itemTop = containerTop + item.translateY;
      const itemBottom = itemTop + item.height;

      if (itemBottom + gap >= start && itemTop - gap <= end) {
        viewportIndices.push(item.index);
      } else if (itemTop - gap > end) {
        // break if items are sorted
        break;
      }
    }

    if (viewportIndices.length === 0) {
      setVisibleItems([]);
      return;
    }

    const startIndex = Math.max(0, viewportIndices[0] - overscan);
    const endIndex = Math.min(
      items.length - 1,
      viewportIndices[viewportIndices.length - 1] + overscan,
    );

    setVisibleItems(Array.from({ length: endIndex - startIndex + 1 }, (_, i) => startIndex + i));
  }, [positions, overscan, items.length, gap]);

  useEffect(() => {
    updateLayout();

    const debouncedResizeHandler = debounce(() => {
      updateLayout();
    }, 200);

    window.addEventListener('resize', debouncedResizeHandler);
    return () => {
      debouncedResizeHandler.cancel();
      window.removeEventListener('resize', debouncedResizeHandler);
    };
  }, [updateLayout]);

  useEffect(() => {
    updateVisibleItems();

    const throttledScrollHandler = debounce(() => {
      updateVisibleItems();
    }, 50);

    window.addEventListener('scroll', throttledScrollHandler);
    return () => {
      throttledScrollHandler.cancel();
      window.removeEventListener('scroll', throttledScrollHandler);
    };
  }, [updateVisibleItems]);

  useEffect(() => {
    updateVisibleItems();
  }, [positions, updateVisibleItems]);

  useEffect(() => {
    if (!loadMore || !hasMore || containerHeight === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore(items.length ? items.length - 1 : 0);
        }
      },
      { threshold: 0.5 },
    );

    const loaderRefCurrent = loaderRef.current;

    if (loaderRefCurrent) observer.observe(loaderRefCurrent);
    return () => {
      if (loaderRefCurrent) observer.unobserve(loaderRefCurrent);
    };
  }, [loadMore, hasMore, items.length, containerHeight]);

  return (
    <>
      <GridContainer ref={containerRef} style={{ height: containerHeight }} role="list">
        {visibleItems.map((index) => {
          const pos = positions[index];
          const item = items[index];

          return (
            <GridItem
              role="list-item"
              key={`${item.id}-${index}`}
              $translateX={pos.translateX}
              $translateY={pos.translateY}
              $width={pos.width}
              $height={pos.height}
            >
              {children(item, index)}
            </GridItem>
          );
        })}
      </GridContainer>
      {hasMore && containerHeight > 0 ? <LoadingFallback ref={loaderRef} /> : null}
    </>
  );
};

export default VirtualizedMasonryGrid;
