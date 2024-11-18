import 'styled-components';
import type { Palette, Typography, Viewport, Layout, Border, Spacing } from '../types/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: Palette;
    typography: Typography;
    layout: Layout;
    border: Border;
    viewport: Viewport;
    spacing: Spacing;
  }
}
