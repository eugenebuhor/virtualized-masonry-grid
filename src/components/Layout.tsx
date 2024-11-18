import styled, { css } from 'styled-components';

const SectionRowCss = css`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Section = styled.section<{ $row?: boolean; $gap?: string }>`
  ${({ theme, $row, $gap = '0rem' }) => css`
    width: 100%;
    max-width: ${({ theme }) => theme.layout.maxWidth};
    padding: ${theme.layout.padding};
    display: flex;
    $gap: ${$gap};
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;

    ${$row && SectionRowCss}
  `}
`;

const ColumnsCss = css<{ $columns?: number }>`
  ${({ theme, $columns }) => css`
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;

    & > ${Section} {
      max-width: calc(${theme.layout.maxWidth} / ${$columns});
    }
  `}
`;

export const Main = styled.main<{ $columns?: number; $gap?: string }>`
  ${({ theme, $columns = 1, $gap = '0rem' }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    min-height: calc(100vh - ${theme.layout.headerHeight});
    min-width: ${theme.layout.minWidth};
    gap: ${$gap};

    & > ${Section} {
      max-width: ${theme.layout.maxWidth};
    }

    ${$columns > 1 && ColumnsCss};
  `};
`;
