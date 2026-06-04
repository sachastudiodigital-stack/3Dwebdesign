import '@testing-library/jest-dom'

// Mock IntersectionObserver for useInView
global.IntersectionObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}
