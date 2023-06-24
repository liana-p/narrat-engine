// shims-narrat.d.ts

declare module '*.narrat' {
  import { NarratScript } from './app-types';
  const narratScript: NarratScript;
  export default narratScript;
}
