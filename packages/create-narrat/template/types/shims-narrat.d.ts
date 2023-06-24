// shims-narrat.d.ts

declare module "*.narrat" {
  import { NarratScript } from "narrat";
  const narratScript: NarratScript;
  export default narratScript;
}
