<template>
  <ClientOnly>
    <NarratPreview
      :scriptContent="scriptContent"
      :autoJumpOnChange="autoJumpOnChange"
      :codeHeight="codeHeight"
    />
  </ClientOnly>
</template>
<script lang="ts" setup>
import NarratPreview from './NarratPreview.vue';
import { defineProps } from 'vue';

defineProps<{
  scriptContent: string;
  autoJumpOnChange: boolean;
  codeHeight: number;
}>();
</script>
