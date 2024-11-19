import { getInheritedColumns, getColumns } from './masonry';
import { lightTheme } from '../styles/theme.ts';

describe('Masonry Util', () => {
  const mockBreakpoints = lightTheme.viewport.breakpoints;
  const columnsConfig = {
    mobile: 1,
    tablet: 2,
    desktop: 4,
  };

  beforeEach(() => {
    jest.resetAllMocks();

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  test('getInheritedColumns returns correct inherited columns', () => {
    const expected = {
      mobile: 1,
      tablet: 2,
      laptop: 2,
      desktop: 4,
      largeScreen: 4,
    };

    const result = getInheritedColumns(columnsConfig, 3);
    expect(result).toEqual(expected);
  });

  test('getColumns returns correct columns for mobile', () => {
    Object.defineProperty(window, 'innerWidth', { value: 500 });
    const columns = getColumns(columnsConfig, mockBreakpoints);
    expect(columns).toBe(1);
  });

  test('getColumns returns correct columns for tablet', () => {
    Object.defineProperty(window, 'innerWidth', { value: 800 });
    const columns = getColumns(columnsConfig, mockBreakpoints);
    expect(columns).toBe(2);
  });

  test('getColumns returns inherited columns for laptop (inherited from tablet)', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1024 });
    const columns = getColumns(columnsConfig, mockBreakpoints);
    expect(columns).toBe(2);
  });

  test('getColumns returns correct columns for desktop', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1300 });
    const columns = getColumns(columnsConfig, mockBreakpoints);
    expect(columns).toBe(4);
  });

  test('getColumns returns inherited columns for largeScreen (inherited from desktop)', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1600 });
    const columns = getColumns(columnsConfig, mockBreakpoints);
    expect(columns).toBe(4);
  });

  test('getColumns uses fallback when no columns are defined', () => {
    const emptyColumnsConfig = {};
    Object.defineProperty(window, 'innerWidth', { value: 500 });
    const columns = getColumns(emptyColumnsConfig, mockBreakpoints);
    expect(columns).toBe(3);
  });
});
