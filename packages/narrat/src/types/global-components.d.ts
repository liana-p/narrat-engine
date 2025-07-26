// src/global-components.d.ts
import LocalizedText from '@/components/LocalizedText.vue';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    LocalizedText: typeof LocalizedText;
  }
}
