// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock IntersectionObserver for components that use it
global.IntersectionObserver = class IntersectionObserver {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor, @typescript-eslint/no-empty-function
  constructor() {}
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-empty-function
  disconnect() {}
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-empty-function
  observe() {}
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-empty-function
  unobserve() {}
};

// Mock ResizeObserver for components that use it
global.ResizeObserver = global.IntersectionObserver;

// Mock window.matchMedia for responsive components
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  // eslint-disable-next-line no-undef
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    // eslint-disable-next-line no-undef
    addListener: jest.fn(), // deprecated
    // eslint-disable-next-line no-undef
    removeListener: jest.fn(), // deprecated
    // eslint-disable-next-line no-undef
    addEventListener: jest.fn(),
    // eslint-disable-next-line no-undef
    removeEventListener: jest.fn(),
    // eslint-disable-next-line no-undef
    dispatchEvent: jest.fn(),
  })),
});

// Mock scrollTo for components that use it
// eslint-disable-next-line no-undef
window.scrollTo = jest.fn();
