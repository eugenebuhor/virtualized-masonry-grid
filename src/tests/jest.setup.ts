import '@testing-library/jest-dom';
import 'jest-styled-components';
import { mockUseSearchParams } from './mocks/react-router-dom';
import { mockUseMatch, mockUseNavigate } from './mocks/react-router';
import { mockDebounce } from './mocks/lodash.debounce';
import './mocks/IntersectionObserver.ts';

afterEach(() => {
  mockUseMatch.mockReset();
  mockUseNavigate.mockReset();
  mockDebounce.mockClear();
  mockUseSearchParams.mockClear();
});
