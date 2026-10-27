import { vi } from 'vitest';

// jsdom has no media-query layout engine. Provide the browser API used by
// Ionic split panes; keep unhandled errors fatal in the Vitest configuration.
vi.stubGlobal('matchMedia', (media: string): MediaQueryList => ({
  media,
  matches: false,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(() => false),
}));
