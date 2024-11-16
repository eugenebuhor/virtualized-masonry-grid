import type { ColumnsConfig } from '../types/masonry';

export const getInheritedColumns = (columns: ColumnsConfig, fallback: number): ColumnsConfig => {
  const inheritedColumns = {} as ColumnsConfig;
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
