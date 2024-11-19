import { type RefObject } from 'react';
import { renderHook, act } from '@testing-library/react';
import { useGridLayout } from './useGridLayout';
import { GridItem } from '../../types/masonry';
import { lightTheme } from '../../styles/theme.ts';
import { mockDebounce } from '../../tests/mocks/lodash.debounce.ts';

const COLUMNS = 3;

jest.mock('../../utils/masonry.ts', () => ({
  getColumns: jest.fn(() => COLUMNS),
}));

describe('useGridLayout hook', () => {
  const mockItems: GridItem[] = [
    { id: 1, width: 200, height: 300 },
    { id: 2, width: 200, height: 150 },
    { id: 3, width: 200, height: 400 },
  ];
  const mockBreakpoints = lightTheme.viewport.breakpoints;
  const mockContainerRef = (width: number): RefObject<HTMLDivElement> => ({
    current: {
      offsetWidth: width,
    } as HTMLDivElement,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calculates initial layout', () => {
    const containerRef = mockContainerRef(600);
    const columns = COLUMNS;
    const gap = 10;

    const { result } = renderHook(() =>
      useGridLayout({
        items: mockItems,
        columns,
        gap,
        containerRef,
        breakpoints: mockBreakpoints,
      }),
    );
    const { positions, containerHeight } = result.current;

    expect(positions).toHaveLength(3);
    expect(containerHeight).toBeGreaterThan(0);

    const columnWidth = (600 - 10 * (3 - 1)) / 3; // 193.333
    const expectedPositions = [
      {
        translateX: 0,
        translateY: 0,
        width: columnWidth,
        height: (300 / 200) * columnWidth, // 290
      },
      {
        translateX: columnWidth + 10, // 193.333 + 10 = 203.333
        translateY: 0,
        width: columnWidth,
        height: (150 / 200) * columnWidth, // 145
      },
      {
        translateX: 2 * (columnWidth + 10), // 2 * 203.333 = 406.666
        translateY: 0,
        width: columnWidth,
        height: (400 / 200) * columnWidth, // 386.666
      },
    ];

    expect(positions).toEqual(expectedPositions);
    expect(Number(containerHeight.toFixed(3))).toBe(Math.max(290 + 10, 145 + 10, 386.667 + 10)); // 396.667
  });

  it('recalculates layout on window resize', () => {
    const containerRef = mockContainerRef(600);
    const columns = COLUMNS;
    const gap = 10;

    const { result } = renderHook(() =>
      useGridLayout({
        items: mockItems,
        columns,
        gap,
        containerRef,
        breakpoints: mockBreakpoints,
      }),
    );

    act(() => {
      if (containerRef.current) {
        (containerRef.current as unknown as { offsetWidth: number }).offsetWidth = 800;
      }
      window.dispatchEvent(new Event('resize'));
    });

    const newColumnWidth = (800 - 10 * (3 - 1)) / 3; // 260

    const expectedPositions = [
      {
        translateX: 0,
        translateY: 0,
        width: newColumnWidth,
        height: (300 / 200) * newColumnWidth, // 390
      },
      {
        translateX: newColumnWidth + 10, // 260 + 10 = 270
        translateY: 0,
        width: newColumnWidth,
        height: (150 / 200) * newColumnWidth, // 195
      },
      {
        translateX: 2 * (newColumnWidth + 10), // 2 * 270 = 540
        translateY: 0,
        width: newColumnWidth,
        height: (400 / 200) * newColumnWidth, // 520
      },
    ];

    expect(result.current.positions).toEqual(expectedPositions);
    expect(result.current.containerHeight).toBe(Math.max(390 + 10, 195 + 10, 520 + 10)); // 530
  });

  it('calls debounce with updateLayout and delay', () => {
    const containerRef = mockContainerRef(600);
    const columns = COLUMNS;
    const gap = 10;

    renderHook(() =>
      useGridLayout({
        items: mockItems,
        columns,
        gap,
        containerRef,
        breakpoints: mockBreakpoints,
      }),
    );

    expect(mockDebounce).toHaveBeenCalledWith(expect.any(Function), 200);
  });
});
