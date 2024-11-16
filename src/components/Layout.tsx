import styled, { css } from 'styled-components';

export const Main = styled.main`
  ${({ theme }) => css`
    width: 100%;
    min-width: ${theme.layout.minWidth};
    min-height: 100vh;
    padding-top: ${theme.layout.headerHeight};
  `}
`;

export const Section = styled.section`
  ${({ theme }) => css`
    width: 100%;
    max-width: ${theme.layout.maxWidth};
    padding-left: ${theme.layout.padding};
    padding-right: ${theme.layout.padding};
    margin: auto;
  `}
`;
