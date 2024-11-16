export interface Palette {
  common: {
    white: string;
    black: string;
    gray50: string;
    gray100: string;
    gray200: string;
    gray300: string;
    gray400: string;
    gray500: string;
    gray600: string;
    gray700: string;
    gray750: string;
    gray800: string;
    gray900: string;
    gray950: string;
    error: string;
    currentColor: string;
    inherit: string;
    initial: string;
    unset: string;
    none: string;
    transparent: string;
  };
  text: {
    primary: string;
    secondary: string;
  };
  surface: {
    primary: string;
    secondary: string;
  };
  border: {
    light: string;
    medium: string;
  };
}

export interface Viewport {
  mediaQueries: {
    mobile: string;
    tablet: string;
    laptop: string;
    desktop: string;
    largeScreen: string;
  };
  breakpoints: {
    mobile: number;
    tablet: number;
    laptop: number;
    desktop: number;
    largeScreen: number;
  };
}

export interface Typography {
  fontFamily: {
    title: string;
    text: string;
  };
  fontWeight: {
    regular: number;
    bold: number;
  };
  fontSize: {
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    h5: string;
    h6: string;
    subtitle: string;
    body1: string;
    body2: string;
    caption: string;
    overline: string;
  };
}

export interface Layout {
  maxWidth: string;
  minWidth: string;
  padding: string;
  headerHeight: string;
}

export interface Border {
  radius: {
    sm: string;
    md: string;
  };
  width: {
    sm: string;
    md: string;
  };
}
