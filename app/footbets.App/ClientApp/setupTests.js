import { afterEach, beforeEach, expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup, configure } from '@testing-library/react';
import { server } from './src/__mocks__/server';
import '@testing-library/jest-dom';

expect.extend(matchers);
configure({ asyncUtilTimeout: 3500 });
const noop = () => { };
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });


beforeEach(() => {
  window.scrollTo = vi.fn();
});

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'warn' });
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => server.close());