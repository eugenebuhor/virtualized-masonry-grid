import { type ReactNode, useEffect, useRef, forwardRef, useLayoutEffect } from 'react';
import { useTheme } from 'styled-components';
import { GridContainer, GridItem as StyledGridItem } from './VirtualizedMasonryGrid.styled.ts';
import { useGridLayout } from '../hooks/masontry/useGridLayout.ts';
import { useVisibleItems } from '../hooks/masontry/useVisibleItems.ts';
import type { GridColumnsConfig, GridItem } from '../types/masonry.ts';

interface VirtualizedMasonryGridProps<T extends GridItem> {
  /**
   * Array of items to display in the grid.
   */
  items: T[];

  /**
   * Function that returns a ReactNode to render for each item.
   */
  children: (item: T, index: number) => ReactNode;

  /**
   * Number of columns in the grid or a GridColumnsConfig object.
   */
  columns?: number | GridColumnsConfig;

  /**
   * Gap between grid items in pixels.
   */
  gap?: number;

  /**
   * Number of extra items to render.
   */
  overscan?: number;

  /**
   * Function to load more items (infinite scrolling).
   */
  loadMore?: (index: number) => void;

  /**
   * Indicating whether there are more items to load.
   */
  hasMore?: boolean;

  /**
   * Index of the item to scroll to.
   */
  indexToScroll?: number;

  /**
   * Throttle the scroll event.
   * Note: This is useful when the scroll event is causing performance issues.
   */
  throttledScroll?: boolean;
}

export const DEFAULT_COLUMNS = 3;

const LoadingFallback = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} style={{ height: '50px', textAlign: 'center' }}>
      Loading...
    </div>
  );
});

const VirtualizedMasonryGrid = <T extends GridItem>({
  items,
  children,
  columns = DEFAULT_COLUMNS,
  gap = 16,
  overscan = 8,
  loadMore,
  hasMore,
  indexToScroll,
  throttledScroll = true,
}: VirtualizedMasonryGridProps<T>) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const hasScrolledInitially = useRef(false);
  const theme = useTheme();

  const { positions, containerHeight } = useGridLayout({
    items,
    columns,
    gap,
    containerRef,
    breakpoints: theme.viewport.breakpoints,
  });

  const visibleItems = useVisibleItems({
    positions,
    containerRef,
    overscan,
    gap,
    throttledScroll,
    itemsLength: items.length,
  });

  // infinite scrolling to load more items
  useEffect(() => {
    if (!loadMore || !hasMore || containerHeight === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore(items.length ? items.length - 1 : 0);
        }
      },
      { threshold: 0 },
    );

    const loaderRefCurrent = loaderRef.current;

    if (loaderRefCurrent) observer.observe(loaderRefCurrent);
    return () => {
      if (loaderRefCurrent) observer.unobserve(loaderRefCurrent);
    };
  }, [loadMore, hasMore, items.length, containerHeight]);

  // scroll to the item on mount
  useLayoutEffect(() => {
    if (indexToScroll !== undefined && !hasScrolledInitially.current && positions[indexToScroll]) {
      const { translateX, translateY } = positions[indexToScroll];
      hasScrolledInitially.current = true;
      window.scrollTo({ top: translateY, left: translateX });
    }
  }, [indexToScroll, positions]);

  return (
    <>
      <GridContainer ref={containerRef} style={{ height: containerHeight }} role="list">
        {visibleItems.map((index) => {
          const pos = positions[index];
          const item = items[index];

          return (
            <StyledGridItem
              role="listitem"
              key={`${item.id}-${index}`}
              $translateX={pos.translateX}
              $translateY={pos.translateY}
              $width={pos.width}
              $height={pos.height}
            >
              {children(item, index)}
            </StyledGridItem>
          );
        })}
      </GridContainer>
      {hasMore && containerHeight > 0 ? <LoadingFallback ref={loaderRef} /> : null}
    </>
  );
};

export default VirtualizedMasonryGrid;
