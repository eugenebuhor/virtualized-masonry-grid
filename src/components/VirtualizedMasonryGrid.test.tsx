import { screen } from '@testing-library/react';
import VirtualizedMasonryGrid from './VirtualizedMasonryGrid';
import type { GridItem } from '../types/masonry';
import { renderWithProviders } from '../tests/utils/renderWithProviders.tsx';

jest.mock('../hooks/masontry/useGridLayout', () => ({
  useGridLayout: jest.fn(() => ({
    positions: [
      { translateX: 0, translateY: 0, width: 100, height: 100 },
      { translateX: 100, translateY: 0, width: 100, height: 100 },
    ],
    containerHeight: 200,
  })),
}));

jest.mock('../hooks/masontry/useVisibleItems', () => ({
  useVisibleItems: jest.fn(() => [0, 1]),
}));

describe('VirtualizedMasonryGrid Component', () => {
  const mockItems: GridItem[] = [
    { id: '1', height: 100, width: 100 },
    { id: '2', height: 100, width: 100 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders GridContainer and GridItems', () => {
    renderWithProviders(
      <VirtualizedMasonryGrid items={mockItems} columns={3}>
        {(item) => <div key={item.id}>{`Item ${item.id}`}</div>}
      </VirtualizedMasonryGrid>,
    );

    const gridContainer = screen.getByRole('list');
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toHaveStyle({ height: '200px' });

    const gridItems = screen.getAllByRole('listitem');
    expect(gridItems).toHaveLength(2);
    expect(gridItems[0]).toHaveStyle({
      transform: 'translateX(0px) translateY(0px)',
      width: '100px',
      height: '100px',
    });
    expect(gridItems[1]).toHaveStyle({
      transform: 'translateX(100px) translateY(0px)',
      width: '100px',
      height: '100px',
    });
  });

  it('renders LoadingFallback when hasMore is true', () => {
    renderWithProviders(
      <VirtualizedMasonryGrid items={mockItems} hasMore>
        {(item) => <div key={item.id}>{`Item ${item.id}`}</div>}
      </VirtualizedMasonryGrid>,
    );

    const loader = screen.getByTestId('vmg-loader');
    expect(loader).toBeInTheDocument();
  });

  it('does not render LoadingFallback when hasMore is false', () => {
    renderWithProviders(
      <VirtualizedMasonryGrid items={mockItems} hasMore={false}>
        {(item) => <div key={item.id}>{`Item ${item.id}`}</div>}
      </VirtualizedMasonryGrid>,
    );

    const loader = screen.queryByTestId('vmg-loader');
    expect(loader).not.toBeInTheDocument();
  });

  it('calls loadMore when loader intersects', () => {
    const mockLoadMore = jest.fn();
    renderWithProviders(
      <VirtualizedMasonryGrid items={mockItems} loadMore={mockLoadMore} hasMore>
        {(item) => <div key={item.id}>{`Item ${item.id}`}</div>}
      </VirtualizedMasonryGrid>,
    );

    const loader = screen.getByTestId('vmg-loader');
    expect(loader).toBeInTheDocument();

    (IntersectionObserver as jest.Mock).mock.calls[0][0]([{ isIntersecting: true }]);
    expect(mockLoadMore).toHaveBeenCalledWith(1); // Last index
  });

  it('scrolls to item on mount when indexToScroll is provided', () => {
    global.scrollTo = jest.fn();

    renderWithProviders(
      <VirtualizedMasonryGrid items={mockItems} indexToScroll={1}>
        {(item) => <div key={item.id}>{`Item ${item.id}`}</div>}
      </VirtualizedMasonryGrid>,
    );

    expect(global.scrollTo).toHaveBeenCalledWith({ top: 0, left: 100 });
  });
});
