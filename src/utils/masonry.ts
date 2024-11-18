import type { GridColumnsConfig } from '../types/masonry';
import type { Viewport } from '../types/theme.ts';
import { DEFAULT_COLUMNS } from '../components/VirtualizedMasonryGrid';

export const getInheritedColumns = (
  columns: GridColumnsConfig,
  fallback: number,
): GridColumnsConfig => {
  const inheritedColumns = {} as GridColumnsConfig;
  const breakpointsOrder = ['mobile', 'tablet', 'laptop', 'desktop', 'largeScreen'] as const;

  breakpointsOrder.forEach((breakpoint, index) => {
    const closestLeft = breakpointsOrder
      .slice(0, index)
      .reverse()
      .find((bp) => columns[bp]);

    const closestRight = breakpointsOrder.slice(index + 1).find((bp) => columns[bp]);

    inheritedColumns[breakpoint] =
      columns[breakpoint] ??
      (closestLeft ? columns[closestLeft] : undefined) ??
      (closestRight ? columns[closestRight] : fallback);
  });

  return inheritedColumns;
};

export const getColumns = (
  columns: GridColumnsConfig,
  breakpoints: Viewport['breakpoints'],
): number => {
  const inheritedColumns = getInheritedColumns(columns, DEFAULT_COLUMNS);
  const width = window.innerWidth;
  let newColumnsCount;

  if (width >= breakpoints.largeScreen) {
    newColumnsCount = inheritedColumns.largeScreen || DEFAULT_COLUMNS;
  } else if (width >= breakpoints.desktop) {
    newColumnsCount = inheritedColumns.desktop || DEFAULT_COLUMNS;
  } else if (width >= breakpoints.laptop) {
    newColumnsCount = inheritedColumns.laptop || DEFAULT_COLUMNS;
  } else if (width >= breakpoints.tablet) {
    newColumnsCount = inheritedColumns.tablet || DEFAULT_COLUMNS;
  } else {
    newColumnsCount = inheritedColumns.mobile || DEFAULT_COLUMNS;
  }

  return newColumnsCount;
};
