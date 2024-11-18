import { type RefObject, useEffect, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { getColumns } from '../../utils/masonry.ts';
import type { GridItemPosition, GridColumnsConfig, GridItem } from '../../types/masonry.ts';
import { Viewport } from '../../types/theme.ts';

type GridLayoutHook = {
  items: GridItem[];
  columns: number | GridColumnsConfig;
  gap: number;
  containerRef: RefObject<HTMLDivElement>;
  breakpoints: Viewport['breakpoints'];
};

/**
 * Custom hook to calculate the layout positions of grid items.
 */
export const useGridLayout = ({
  items,
  columns,
  gap,
  containerRef,
  breakpoints,
}: GridLayoutHook) => {
  const [positions, setPositions] = useState<GridItemPosition[]>([]);
  const [containerHeight, setContainerHeight] = useState(0);

  const updateLayout = useCallback(() => {
    if (!containerRef.current) return;

    const columnsCount = typeof columns === 'number' ? columns : getColumns(columns, breakpoints);

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
  }, [items, gap, columns, breakpoints, containerRef]);

  // update the layout when items or dimensions change
  useEffect(() => {
    updateLayout();

    const debouncedResizeHandler = debounce(updateLayout, 200);

    window.addEventListener('resize', debouncedResizeHandler);
    return () => {
      debouncedResizeHandler.cancel();
      window.removeEventListener('resize', debouncedResizeHandler);
    };
  }, [updateLayout]);

  return { positions, containerHeight };
};
