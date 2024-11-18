import { Viewport } from './theme.ts';

export type GridColumnsConfig = Partial<Viewport['breakpoints']>;

export type GridItem = {
  id: string | number;
  height: number;
  width: number;
};

export type GridItemPosition = {
  translateX: number;
  translateY: number;
  width: number;
  height: number;
};
