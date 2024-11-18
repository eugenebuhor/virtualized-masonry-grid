import { type ReactNode, Children } from 'react';
import { GridContainer, GridItem } from './MasonryGrid.styled.ts';
import type { GridColumnsConfig } from '../types/masonry.ts';

interface MasonryGridProps {
  /**
   * ReactNode to render for each item.
   */
  children: ReactNode;

  /**
   * Number of columns in the grid or a GridColumnsConfig object.
   */
  columns?: number | GridColumnsConfig;

  /**
   * Gap between grid items in pixels.
   */
  gap?: number;
}

export const DEFAULT_COLUMNS = 3;

const MasonryGrid = ({ columns = DEFAULT_COLUMNS, gap = 16, children }: MasonryGridProps) => {
  return (
    <GridContainer $columns={columns} $gap={gap} role="list">
      {Children.map(children, (child) => (
        <GridItem $gap={gap} role="listitem">
          {child}
        </GridItem>
      ))}
    </GridContainer>
  );
};

export default MasonryGrid;
