const actualReactRouterDom = jest.requireActual('react-router-dom');

const mockReactRouterDom = {
  ...actualReactRouterDom,
  useSearchParams: jest.fn().mockReturnValue([new URLSearchParams(), jest.fn()]),
};

jest.mock('react-router-dom', () => mockReactRouterDom);

export const mockUseSearchParams = mockReactRouterDom.useSearchParams as jest.Mock;
