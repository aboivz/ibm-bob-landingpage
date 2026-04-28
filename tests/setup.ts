import '@testing-library/jest-dom';

// Carbon components use ResizeObserver — polyfill for jsdom
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
