import { createSearchParams } from 'react-router-dom';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../tests/utils/renderWithProviders';
import Header from '../components/Header';
import { mockUseMatch, mockUseNavigate } from '../tests/mocks/react-router';

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Search component', () => {
    mockUseMatch.mockReturnValue({});
    renderWithProviders(<Header />);
    expect(screen.getByRole('search')).toBeInTheDocument();
  });

  it('navigates to root with query when not on root page', () => {
    const mockNavigate = jest.fn();
    mockUseMatch.mockReturnValue(null);
    mockUseNavigate.mockReturnValue(mockNavigate);

    renderWithProviders(<Header />);

    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'test query' } });

    expect(mockNavigate).toHaveBeenCalledWith(
      {
        pathname: '/',
        search: createSearchParams({ query: 'test query' }).toString(),
      },
      { replace: true },
    );
  });
});
