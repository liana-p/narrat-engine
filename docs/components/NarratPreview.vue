<template>
  <code-input
    v-if="loaded"
    lang="narrat"
    placeholder="Type code here"
    template="syntax-highlighted"
    :oninput="codeInputChanged"
    :style="{
      width: '100%',
      height: props.codeHeight + 'px',
    }"
    >{{ props.scriptContent }}</code-input
  >
  <div class="narrat-preview" ref="narratContainer"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineProps, shallowRef } from 'vue';
import { gameConfig } from '../data/defaultGameConfig';
import { getCodeInput } from '../utils/code-input';

const narratContainer = ref<HTMLDivElement | null>(null);
const isNarratRunning = ref<boolean>(false);

async function importNarrat() {
  const narrat = await import('narrat');
  return narrat;
}

type NarratModule = Awaited<ReturnType<typeof importNarrat>>;
const narrat = shallowRef<NarratModule | null>(null);
const loaded = ref(false);
const props = defineProps<{
  scriptContent: string;
  autoJumpOnChange: boolean;
  codeHeight: number;
}>();

const script = ref({
  fileName: 'demo-script.narrat',
  code: props.scriptContent,
  id: 'demo-script',
  type: 'script',
});

function scriptToNarratModule(): {
  default: any;
} {
  return {
    default: {
      fileName: script.value.fileName,
      code: script.value.code,
      id: script.value.id,
      type: 'script',
    },
  };
}

function codeInputChanged(el) {
  const newCode = el.target.value;
  script.value.code = newCode;
  narrat.value.handleHMR(scriptToNarratModule() as any);
  if (props.autoJumpOnChange) {
    jumpBackToLabel();
  }
}

onMounted(async () => {
  await readyCodeInput();
  loaded.value = true;
  narrat.value = await importNarrat();
  launchNarratGame();
});

async function readyCodeInput() {
  const codeInput = await getCodeInput();
  console.log('uwu ', codeInput);
}

function launchNarratGame() {
  if (narratContainer.value) {
    if (!isNarratRunning.value) {
      startNarratApp();
    }
  } else {
    console.error('narratContainer is null');
  }
}

function stopNarratGame() {
  narrat.value.stopApp();
  isNarratRunning.value = false;
}

function jumpBackToLabel() {
  const vm = narrat.value.useVM();
  vm.jumpToLabel('main');
}
function startNarratApp() {
  narrat.value.startApp({
    debug: true,
    logging: false,
    scripts: [script.value],
    container: narratContainer.value!,
    config: gameConfig as any,
  });
  isNarratRunning.value = true;
}
</script>

<style scoped>
.narrat-preview {
  width: 100%;
  aspect-ratio: 1280/720;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
