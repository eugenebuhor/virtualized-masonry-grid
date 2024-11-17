import { type ReactNode, useEffect, useState, useRef, useCallback } from 'react';
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
}

export const DEFAULT_COLUMNS = 3;

const VirtualizedMasonryGrid = <T extends BaseGridItem>({
  items,
  children,
  columns = DEFAULT_COLUMNS,
  gap = 16,
  overscan = 8,
}: VirtualizedMasonryGridProps<T>) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
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
    if (!positions.length) return;

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;

    const start = scrollTop;
    const end = scrollTop + windowHeight;

    const viewportIndices = positions.reduce<number[]>((acc, pos, index) => {
      if (pos.translateY + pos.height + gap >= start && pos.translateY + gap <= end) {
        acc.push(index);
      }
      return acc;
    }, []);

    const startOverscan = Math.max(0, viewportIndices[0] - overscan);
    const endOverscan = Math.min(
      items.length - 1,
      viewportIndices[viewportIndices.length - 1] + overscan,
    );

    setVisibleItems(
      Array.from({ length: endOverscan - startOverscan + 1 }, (_, i) => startOverscan + i),
    );
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

    window.addEventListener('scroll', updateVisibleItems);
    return () => {
      window.removeEventListener('scroll', updateVisibleItems);
    };
  }, [updateVisibleItems]);

  return (
    <GridContainer ref={containerRef} style={{ height: containerHeight }} role="list">
      {visibleItems.map((index) => {
        const pos = positions[index];
        const item = items[index];

        return (
          <GridItem
            role="list-item"
            key={item.id}
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
  );
};

export default VirtualizedMasonryGrid;
