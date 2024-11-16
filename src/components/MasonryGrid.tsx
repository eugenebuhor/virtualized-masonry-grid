import { type ReactNode, Children } from 'react';
import { GridContainer, GridItem } from './MasonryGrid.styled.ts';
import type { ColumnsConfig } from '../types/masonry.ts';

type MasonryGridProps = {
  children: ReactNode;
  columns?: number | ColumnsConfig;
  gap?: number;
};

export const DEFAULT_COLUMNS = 3;

const MasonryGrid = ({ columns = DEFAULT_COLUMNS, gap = 16, children }: MasonryGridProps) => {
  return (
    <GridContainer $columns={columns} $gap={gap}>
      {Children.map(children, (child) => (
        <GridItem $gap={gap}>{child}</GridItem>
      ))}
    </GridContainer>
  );
};

export default MasonryGrid;
