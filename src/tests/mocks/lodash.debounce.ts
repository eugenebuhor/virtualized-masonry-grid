const mockDebounce = jest.fn((fn) => {
  const debounced = fn;
  debounced.cancel = jest.fn();
  return debounced;
});

jest.mock('lodash.debounce', () => mockDebounce);

export { mockDebounce };
