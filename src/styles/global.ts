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
      padding: 8px 12px;
      background-color: ${theme.palette.common.gray100};
      color: ${theme.palette.text.primary};
      border-radius: ${theme.border.radius.sm};

      &:disabled {
        cursor: initial;
        color: ${theme.palette.text.secondary};
      }

      &:hover {
        background-color: ${theme.palette.common.gray200};
      }
    }

    input {
      appearance: none;
      padding: 8px 12px;
      color: ${theme.palette.text.primary};
      caret-color: ${theme.palette.text.primary};
      border: ${theme.border.width.sm} solid ${theme.palette.border.medium};
      border-radius: ${theme.border.radius.sm};
      background-color: ${({ theme }) => theme.palette.surface.secondary};
      font-size: ${({ theme }) => theme.typography.fontSize.body2};

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: ${theme.palette.common.gray400};
      }
    }
  `,
);

export default GlobalStyle;
