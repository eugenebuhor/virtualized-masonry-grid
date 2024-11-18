import { type RefObject, useEffect, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import type { GridItemPosition } from '../../types/masonry.ts';

type VisibleItemsHook = {
  positions: GridItemPosition[];
  containerRef: RefObject<HTMLDivElement>;
  overscan: number;
  gap: number;
  itemsLength: number;
};

/**
 * Custom hook to determine which items are visible in the viewport.
 */
export const useVisibleItems = ({
  positions,
  containerRef,
  overscan,
  gap,
  itemsLength,
}: VisibleItemsHook) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

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
      itemsLength - 1,
      viewportIndices[viewportIndices.length - 1] + overscan,
    );

    setVisibleItems(Array.from({ length: endIndex - startIndex + 1 }, (_, i) => startIndex + i));
  }, [positions, overscan, itemsLength, gap, containerRef]);

  // update visible items on scroll
  useEffect(() => {
    updateVisibleItems();

    const throttledScrollHandler = debounce(updateVisibleItems, 50);

    window.addEventListener('scroll', throttledScrollHandler);
    return () => {
      throttledScrollHandler.cancel();
      window.removeEventListener('scroll', throttledScrollHandler);
    };
  }, [updateVisibleItems]);

  // update visible items when positions change
  useEffect(() => {
    updateVisibleItems();
  }, [positions, updateVisibleItems]);

  return visibleItems;
};
