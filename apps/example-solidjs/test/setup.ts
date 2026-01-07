import { expect } from 'vitest';
import * as axeMatchers from 'vitest-axe/matchers';
import '@testing-library/jest-dom/vitest';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;

expect.extend(axeMatchers);
