import { renderWithProviders } from '../tests/utils/renderWithProviders';
import MasonryGrid from './MasonryGrid';

describe('MasonryGrid Component', () => {
  const mockChildren = [
    <div key={1}>Item 1</div>,
    <div key={2}>Item 2</div>,
    <div key={3}>Item 3</div>,
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default props', () => {
    const { container } = renderWithProviders(<MasonryGrid>{mockChildren}</MasonryGrid>);

    const gridContainer = container.querySelector('[role="list"]');
    expect(gridContainer).toBeInTheDocument();

    const gridItems = container.querySelectorAll('[role="listitem"]');
    expect(gridItems).toHaveLength(3);
  });

  it('renders with custom gap', () => {
    const { container } = renderWithProviders(<MasonryGrid gap={24}>{mockChildren}</MasonryGrid>);

    const gridContainer = container.querySelector('[role="list"]');
    expect(gridContainer).toHaveStyleRule('column-gap', '24px');

    const gridItems = container.querySelectorAll('[role="listitem"]');
    gridItems.forEach((item) => {
      expect(item).toHaveStyleRule('margin-bottom', '24px');
    });
  });

  it('renders no items when children are empty', () => {
    const { container } = renderWithProviders(<MasonryGrid>{null}</MasonryGrid>);

    const gridContainer = container.querySelector('[role="list"]');
    expect(gridContainer).toBeInTheDocument();

    const gridItems = gridContainer?.querySelectorAll('[role="listitem"]');
    expect(gridItems).toHaveLength(0);
  });
});
