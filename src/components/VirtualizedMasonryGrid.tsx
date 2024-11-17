import { type ReactNode, useEffect, useState, useRef, useCallback } from 'react';
import { useTheme } from 'styled-components';
import { GridContainer, GridItem } from './VirtualizedMasonryGrid.styled.ts';

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
  columns?: number;
  gap?: number;
}

export const DEFAULT_COLUMNS = 3;

const VirtualizedMasonryGrid = <T extends BaseGridItem>({
  items,
  columns = DEFAULT_COLUMNS,
  gap = 16,
  children,
}: VirtualizedMasonryGridProps<T>) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [positions, setPositions] = useState<GridItemPosition[]>([]);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [containerHeight, setContainerHeight] = useState(0);

  const theme = useTheme();

  const updateLayout = useCallback(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const columnWidth = (containerWidth - gap * (columns - 1)) / columns;
    const columnHeights = Array(columns).fill(0);

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

    const startViewport = Math.max(0, viewportIndices[0]);
    const endViewport = Math.min(items.length - 1, viewportIndices[viewportIndices.length - 1]);

    setVisibleItems(
      Array.from({ length: endViewport - startViewport + 1 }, (_, i) => startViewport + i),
    );
  }, [positions, items.length, gap]);

  useEffect(() => {
    updateLayout();
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
