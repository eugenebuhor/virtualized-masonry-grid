import { createGlobalStyle, css } from 'styled-components';

const GlobalStyle = createGlobalStyle(
  ({ theme }) => css`
    :root {
      font-synthesis: none;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      font-family: ${theme.typography.fontFamily.text};
      line-height: 1.5;
      font-weight: ${theme.typography.fontWeight.regular};

      color-scheme: light dark;
      color: ${theme.palette.text.primary};
      background-color: ${theme.palette.surface.primary};
    }

    html {
      box-sizing: border-box;
      overflow-y: visible;
      font-size: 14px; /* rem base */

      @media ${theme.viewport.mediaQueries.laptop} {
        font-size: 16px; /* rem base */
      }
    }

    body {
      margin: 0;
    }

    *,
    *:before,
    *:after {
      box-sizing: inherit;
    }

    button {
      cursor: pointer;
      text-decoration: none;
      border: none;
      user-select: none;
    }

    button:disabled {
      cursor: initial;
    }

    input {
      border: none;
      appearance: none;
      caret-color: ${theme.palette.text.primary};
      &:focus {
        outline: none;
      }
    }
  `,
);

export default GlobalStyle;
