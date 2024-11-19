const actualReactRouter = jest.requireActual('react-router');

const mockReactRouter = {
  ...actualReactRouter,
  useMatch: jest.fn(),
  useNavigate: jest.fn(),
};

jest.mock('react-router', () => mockReactRouter);

export const mockUseMatch = mockReactRouter.useMatch as jest.Mock;
export const mockUseNavigate = mockReactRouter.useNavigate as jest.Mock;
