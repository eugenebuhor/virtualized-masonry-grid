import styled, { css, DefaultTheme } from 'styled-components';
import { DEFAULT_COLUMNS } from './MasonryGrid.tsx';
import { getInheritedColumns } from '../utils/masonry.ts';
import type { ColumnsConfig } from '../types/masonry.ts';

const getColumnCountCss = (theme: DefaultTheme, columns: number | ColumnsConfig) => {
  const cascadedColumns =
    typeof columns === 'number'
      ? { mobile: columns }
      : getInheritedColumns(columns, DEFAULT_COLUMNS);

  return css`
    @media ${theme.viewport.mediaQueries.mobile} {
      column-count: ${cascadedColumns.mobile};
    }
    @media ${theme.viewport.mediaQueries.tablet} {
      column-count: ${cascadedColumns.tablet};
    }
    @media ${theme.viewport.mediaQueries.laptop} {
      column-count: ${cascadedColumns.laptop};
    }
    @media ${theme.viewport.mediaQueries.desktop} {
      column-count: ${cascadedColumns.desktop};
    }
    @media ${theme.viewport.mediaQueries.largeScreen} {
      column-count: ${cascadedColumns.largeScreen};
    }
  `;
};

export const GridContainer = styled.div<{ $columns: number | ColumnsConfig; $gap: number }>`
  column-gap: ${(props) => props.$gap}px;
  ${(props) => getColumnCountCss(props.theme, props.$columns)};
`;

export const GridItem = styled.div<{ $gap: number }>`
  break-inside: avoid;
  margin-bottom: ${(props) => props.$gap}px;
`;
