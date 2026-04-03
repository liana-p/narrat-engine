// shims-narrat.d.ts

declare module '*.narrat' {
  import { NarratScript } from './app-types';
  const narratScript: NarratScript;
  export default narratScript;
}

declare module '*.yaml' {
  import { NarratYaml } from './app-types';
  const narratYaml: NarratYaml;
  export default narratYaml;
}
declare module '*.yml' {
  import { NarratYaml } from './app-types';
  const narratYaml: NarratYaml;
  export default narratYaml;
}
