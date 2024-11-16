import { type ReactNode, Children } from 'react';
import { GridContainer, GridItem } from './MasonryGrid.styled.ts';

type MasonryGridProps = {
  children: ReactNode;
  columns?: number;
  gap?: number;
};

const MasonryGrid = ({ columns = 3, gap = 16, children }: MasonryGridProps) => {
  return (
    <GridContainer $columns={columns} $gap={gap}>
      {Children.map(children, (child) => (
        <GridItem $gap={gap}>{child}</GridItem>
      ))}
    </GridContainer>
  );
};

export default MasonryGrid;
