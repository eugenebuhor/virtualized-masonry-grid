import { type RefObject } from 'react';
import { renderHook, act } from '@testing-library/react';
import { useVisibleItems } from './useVisibleItems';
import type { GridItemPosition } from '../../types/masonry';
import { mockDebounce } from '../../tests/mocks/lodash.debounce.ts';

describe('useVisibleItems hook', () => {
  const mockPositions: GridItemPosition[] = [
    { translateX: 0, translateY: 0, width: 100, height: 200 },
    { translateX: 0, translateY: 200, width: 100, height: 200 },
    { translateX: 0, translateY: 400, width: 100, height: 200 },
    { translateX: 0, translateY: 600, width: 100, height: 200 },
  ];

  const mockContainerRef = (): RefObject<HTMLDivElement> => ({
    current: {
      getBoundingClientRect: jest.fn(() => ({
        // used `-window.scrollY` to simulate container behavior on "scroll"
        top: -window.scrollY,
        bottom: -window.scrollY + 800,
        height: 800,
        width: 800,
      })) as () => { top: number; bottom: number; height: number; width: number },
    } as HTMLDivElement,
  });

  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, 'scrollY', { value: 0 });
    Object.defineProperty(window, 'innerHeight', { value: 800 });
  });

  it('calculates initial visible items', () => {
    const containerRef = mockContainerRef();
    const overscan = 0;
    const gap = 10;
    const itemsLength = mockPositions.length;

    const { result } = renderHook(() =>
      useVisibleItems({
        positions: mockPositions,
        containerRef,
        overscan,
        gap,
        itemsLength,
        throttledScroll: false,
      }),
    );

    expect(result.current).toEqual([0, 1, 2, 3]);
  });

  it('updates visible items on scroll', () => {
    const containerRef = mockContainerRef();
    const overscan = 0;
    const gap = 10;
    const itemsLength = mockPositions.length;

    const { result } = renderHook(() =>
      useVisibleItems({
        positions: mockPositions,
        containerRef,
        overscan,
        gap,
        itemsLength,
        throttledScroll: false,
      }),
    );

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 400 });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual([1, 2, 3]);
  });

  it('applies overscan', () => {
    const containerRef = mockContainerRef();
    const overscan = 1;
    const gap = 10;
    const itemsLength = mockPositions.length;

    const { result } = renderHook(() =>
      useVisibleItems({
        positions: mockPositions,
        containerRef,
        overscan,
        gap,
        itemsLength,
        throttledScroll: false,
      }),
    );

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 400 });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual([0, 1, 2, 3]);
  });

  it('returns an empty array when no items are visible', () => {
    const containerRef = mockContainerRef();
    const overscan = 0;
    const gap = 10;
    const itemsLength = mockPositions.length;

    const { result } = renderHook(() =>
      useVisibleItems({
        positions: mockPositions,
        containerRef,
        overscan,
        gap,
        itemsLength,
        throttledScroll: false,
      }),
    );

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 2000 });
      window.dispatchEvent(new Event('scroll'));
    });

    act(() => {
      expect(result.current).toEqual([]);
    });
  });

  it('handles debounce when throttledScroll is enabled', () => {
    const containerRef = mockContainerRef();
    const overscan = 0;
    const gap = 10;
    const itemsLength = mockPositions.length;

    const { result } = renderHook(() =>
      useVisibleItems({
        positions: mockPositions,
        containerRef,
        overscan,
        gap,
        itemsLength,
        throttledScroll: true,
      }),
    );

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 400 });
      window.dispatchEvent(new Event('scroll'));
    });

    jest.runAllTimers();

    expect(result.current).toEqual([1, 2, 3]);
    expect(mockDebounce).toHaveBeenCalled();
  });
});
