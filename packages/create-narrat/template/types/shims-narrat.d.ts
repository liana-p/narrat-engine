// shims-narrat.d.ts

declare module "*.narrat" {
  import { NarratScript } from "narrat";
  const narratScript: NarratScript;
  export default narratScript;
}

declare module "*.yaml" {
  import { NarratYaml } from "narrat";
  const narratYaml: NarratYaml;
  export default narratYaml;
}
declare module "*.yml" {
  import { NarratYaml } from "narrat";
  const narratYaml: NarratYaml;
  export default narratYaml;
}
