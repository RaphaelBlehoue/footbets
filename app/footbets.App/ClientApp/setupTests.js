import { afterEach, beforeEach, expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup, configure } from '@testing-library/react';
import '@testing-library/jest-dom';

expect.extend(matchers);
configure({ asyncUtilTimeout: 3500 });
const noop = () => { };
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });


beforeEach(() => {
  window.scrollTo = vi.fn();
});

afterEach(() => {
  cleanup();
});