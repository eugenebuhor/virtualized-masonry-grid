import styled from 'styled-components';

export const GridContainer = styled.div<{ $columns: number; $gap: number }>`
  column-gap: ${(props) => props.$gap}px;
  column-count: ${(props) => props.$columns};
`;

export const GridItem = styled.div<{ $gap: number }>`
  break-inside: avoid;
  margin-bottom: ${(props) => props.$gap}px;
`;
