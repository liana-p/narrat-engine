<template>
  <pre
    class="editable-code"
  ><code :class="`language-${props.language}`" v-html="highlightedCode"></code></pre>
</template>
<script lang="ts" setup>
import { defineProps, ref } from 'vue';
import hljs from 'highlight.js/lib/core';

const props = defineProps<{
  codeInput: string;
  language: string;
}>();

console.log(props.codeInput);

const test = `function test() {
  console.log('test');
}`;
const convertedCode = hljs.highlight(test, {
  language: 'javascript',
});
console.log(convertedCode);

const highlightedCode = ref(convertedCode.value);
</script>
<style scoped>
.editable-code {
  border: 1px solid gray;
  margin-top: 20px;
  margin-bottom: 20px;
  /* background-color: white; */
}
</style>
