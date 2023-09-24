import { App } from 'vue';
import type { NarratScript } from '@/types/app-types';
import type { Narrat } from '@/utils/construct-narrat';

import 'es6-promise/auto';

export * from '@/main';

export * from '@/exports/exports';
export { Narrat };
export { NarratScript };
