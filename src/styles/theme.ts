import { type DefaultTheme } from 'styled-components';

const commonTheme = {
  palette: {
    common: {
      white: '#fff',
      black: '#000',
      gray50: '#f9f9f9',
      gray100: '#ececec',
      gray200: '#e3e3e3',
      gray300: '#cdcdcd',
      gray400: '#b4b4b4',
      gray500: '#9b9b9b',
      gray600: '#676767',
      gray700: '#424242',
      gray750: '#2f2f2f',
      gray800: '#212121',
      gray900: '#171717',
      gray950: '#0d0d0d',
      error: '#f93a37',
      /* Service Colors */
      currentColor: 'currentColor',
      inherit: 'inherit',
      initial: 'initial',
      unset: 'unset',
      none: 'none',
      transparent: 'transparent',
    },
  },
  typography: {
    fontFamily: {
      title: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
      text: 'Georgia, Cambria, "Times New Roman", Times, serif',
    },
    fontWeight: {
      regular: 400,
      bold: 700,
    },
    fontSize: {
      h1: '1.875rem',
      h2: '1.75rem',
      h3: '1.5rem',
      h4: '1.375rem',
      h5: '1.25rem',
      h6: '1.125rem',
      subtitle: '1.25rem',
      body1: '1rem',
      body2: '0.875rem',
      caption: '0.75rem',
      overline: '0.75rem',
    },
  },
  layout: {
    maxWidth: '1440px',
    minWidth: '320px',
    headerHeight: '100px',
  },
  spacing: {
    padding: {
      sm: '8px',
      md: '12px',
      lg: '16px',
    },
  },
  border: {
    radius: {
      sm: '4px',
      md: '8px',
    },
    width: {
      sm: '1px',
      md: '2px',
    },
  },
  // mobile-first approach
  viewport: {
    mediaQueries: {
      mobile: '(max-width: 767px)',
      tablet: '(min-width: 768px)',
      laptop: '(min-width: 1024px)',
      desktop: '(min-width: 1280px)',
      largeScreen: '(min-width: 1920px)',
    },
    breakpoints: {
      mobile: 0, // include mobile for consistency
      tablet: 768,
      laptop: 1024,
      desktop: 1280,
      largeScreen: 1920,
    },
  },
  // zIndex: {
  //   header: 10,
  // },
};

export const lightTheme: DefaultTheme = {
  ...commonTheme,
  palette: {
    ...commonTheme.palette,
    text: {
      primary: commonTheme.palette.common.gray950,
      secondary: commonTheme.palette.common.gray600,
    },
    surface: {
      primary: commonTheme.palette.common.white,
      secondary: commonTheme.palette.common.gray50,
    },
    border: {
      light: 'rgba(0, 0, 0, 0.1)',
      medium: 'rgba(0, 0, 0, 0.15)',
    },
  },
};

export const darkTheme: DefaultTheme = {
  ...commonTheme,
  palette: {
    ...commonTheme.palette,
    text: {
      primary: commonTheme.palette.common.gray200,
      secondary: commonTheme.palette.common.gray400,
    },
    surface: {
      primary: commonTheme.palette.common.gray800,
      secondary: commonTheme.palette.common.gray750,
    },
    border: {
      light: 'hsla(0, 0%, 100%, 0.1)',
      medium: 'hsla(0, 0%, 100%, 0.15)',
    },
  },
};
