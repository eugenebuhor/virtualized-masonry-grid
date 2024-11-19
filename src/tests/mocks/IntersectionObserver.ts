Object.defineProperty(window, 'IntersectionObserver', {
  value: jest.fn(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
  })),
});
