import matchers from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom/vitest';

import { expect, beforeEach } from 'vitest';

expect.extend(matchers);
