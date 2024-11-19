import { screen, fireEvent } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';
import { renderWithProviders } from '../tests/utils/renderWithProviders';
import { mockDebounce } from '../tests/mocks/lodash.debounce.ts';
import Search from '../components/Search';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn(),
}));

describe('Search Component', () => {
  const mockUseSearchParams = useSearchParams as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input with default value from search params', () => {
    const mockSetSearchParams = jest.fn();
    mockUseSearchParams.mockReturnValue([
      new URLSearchParams('query=initial'),
      mockSetSearchParams,
    ]);

    renderWithProviders(<Search />);

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    expect(input.value).toBe('initial');
  });

  it('updates search params and calls onSearch on input change', () => {
    const mockSetSearchParams = jest.fn();
    const mockOnSearch = jest.fn();
    mockUseSearchParams.mockReturnValue([new URLSearchParams(), mockSetSearchParams]);

    renderWithProviders(<Search onSearch={mockOnSearch} />);

    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'new query' } });

    expect(mockOnSearch).toHaveBeenCalledWith('new query');
    expect(mockSetSearchParams).toHaveBeenCalledWith({ query: 'new query' }, { replace: true });
  });

  it('clears search params when input is empty', () => {
    const mockSetSearchParams = jest.fn();
    const mockOnSearch = jest.fn();
    mockUseSearchParams.mockReturnValue([
      new URLSearchParams('query=initial'),
      mockSetSearchParams,
    ]);

    renderWithProviders(<Search onSearch={mockOnSearch} />);

    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: '' } });

    expect(mockOnSearch).toHaveBeenCalledWith('');
    expect(mockSetSearchParams).toHaveBeenCalledWith({}, { replace: true });
  });

  it('cancels debounced search and submits immediately on form submit', () => {
    const mockSetSearchParams = jest.fn();
    const mockOnSearch = jest.fn();

    mockUseSearchParams.mockReturnValue([new URLSearchParams(), mockSetSearchParams]);

    renderWithProviders(<Search onSearch={mockOnSearch} />);

    const input = screen.getByTestId('search-input');
    const form = screen.getByTestId('search-form');
    fireEvent.change(input, { target: { value: 'submitted query' } });
    fireEvent.submit(form);

    expect(mockDebounce.mock.results[0].value.cancel).toHaveBeenCalled();
    expect(mockOnSearch).toHaveBeenCalledWith('submitted query');
    expect(mockSetSearchParams).toHaveBeenCalledWith(
      { query: 'submitted query' },
      { replace: true },
    );
  });
});
