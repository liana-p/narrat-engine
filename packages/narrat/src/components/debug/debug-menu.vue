<template>
  <div class="debug-menu">
    <button @click="open" class="button debug-button">Debug Menu</button>
    <div class="debug-info" v-if="!playing && flowState === 'menu'">
      <h3>Debug mode is ON</h3>
      <ul>
        <li><b>j</b>: Quick Label Jump</li>
        <li><b>d</b>: Debug Menu</li>
        <li><b>a</b>: Auto Play</li>
        <li><b>s</b>: Skip</li>
        <li><b>Space</b>: New Game</li>
        <li><b>c</b>: Continue</li>
        <li><b>Escape</b>: Toggle Menu</li>
      </ul>
    </div>
    <DebugJumping v-if="jumping" @close="closeJumping" />
    <ModalWindow
      v-if="errors.length > 0"
      @close="closeErrors"
      containerCssClass="debug-menu-container"
    >
      <template v-slot:header>
        <h3 class="title">Error(s)</h3>
      </template>
      <template v-slot:body>
        There are errors in your dialogue scripts. Open the developer console
        for more details.
        <ul>
          <li
            v-for="(error, index) in errors"
            :key="index"
            class="error-message list-disc"
            :class="error.type === 'error' ? 'error' : 'warning'"
            v-html="error.text"
          />
        </ul>
      </template>
    </ModalWindow>
    <ModalWindow
      v-if="showDebug"
      @close="close"
      containerCssClass="debug-menu-container"
    >
      <template v-slot:header>
        <h3 class="title">Debug Menu!</h3>
      </template>
      <template v-slot:body>
        <div class="container">
          Hello this is the debug menu.
          <select
            class="select"
            name="label-selector"
            @change="labelSelected($event)"
          >
            <option class="option" selected disabled>Jump to a label</option>
            <option
              class="option"
              v-for="label in labels"
              :value="label"
              :key="label"
            >
              {{ label }}
            </option>
          </select>
          <div class="grid grid-cols-3 gap-4">
            <button @click="wordCount" class="button">Word Count</button>
            <button @click="save" class="button">Save Game</button>
            <button @click="resetSave" class="button">Reset Save</button>
            <button @click="resetGlobalSave" class="button">
              Reset GLOBAL Save
            </button>
          </div>
          <h3>Play time: {{ getPlayTimeString() }}</h3>
          <h2>Variables Editor</h2>
          <div ref="variablesViewer"></div>
          <h2>Skill Checks</h2>
          <table class="table-auto">
            <thead>
              <tr>
                <th>Skill Check</th>
                <th>Happened</th>
                <th>Succeeded</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(check, key) in skillChecks" :key="key">
                <td>{{ key }}</td>
                <td>{{ check.happened ? '✅' : '❌' }}</td>
                <td>
                  {{ !check.happened ? 'NA' : check.succeeded ? '✅' : '❌' }}
                </td>
              </tr>
            </tbody>
          </table>
          <h2>App State editor (entire app and engine</h2>
          <h3 style="color: pink">
            Use for debugging, editing some of those things can cause issues
          </h3>
          <div ref="stateViewer"></div>
        </div>
      </template>
    </ModalWindow>
  </div>
</template>

<script lang="ts">
import { logger } from '@/utils/logger';
import { getPlayTime, toHHMMSS } from '@/utils/time-helpers';
import { computed, defineComponent } from 'vue';
import ModalWindow from '../utils/modal-window.vue';
import { JSONEditor } from 'vanilla-jsoneditor';
import { Parser } from '@/types/parser';
import { useSkills } from '@/stores/skills';
import { useMain } from '@/stores/main-store';
import { mapState } from 'pinia';
import { useVM } from '@/stores/vm-store';
import { StaticChoiceOptions } from '@/vm/commands/choice';
import { IfStaticOptions } from '@/vm/commands/if';
import { useQuests } from '../../stores/quest-log';
import { useInventory } from '../../stores/inventory-store';
import { resetSave } from '@/utils/save-helpers';
import { vm } from '@/vm/vm';
import DebugJumping from './debug-jumping.vue';
import { InputListener } from '@/stores/inputs-store';
import { useRenderingStore } from '@/stores/rendering-store';
import { autoSaveGame, resetGlobalSave } from '@/application/saving';
import { getAllStates, overrideStates } from '@/data/all-stores';

export default defineComponent({
  components: {
    ModalWindow,
    DebugJumping,
  },
  setup() {
    const store = useSkills();
    const skills = computed(() => store.skills);
    const skillChecks = computed(() => store.skillChecks);
    return { skills, skillChecks };
  },
  data() {
    return {
      showDebug: false,
      jumping: false,
      inputListener: null as InputListener | null,
    };
  },

  mounted() {
    const rendering = useRenderingStore();
    rendering.inputsContainer.addEventListener('keydown', (event) => {
      if (!this.jumping) {
        if (event.key === 'd') {
          this.toggle();
        }
        if (event.key === 'j') {
          this.jump();
        }
      }
    });
  },

  methods: {
    closeJumping() {
      this.jumping = false;
    },
    labelSelected(event: any) {
      const labelName = event.target.value;
      useVM().jumpToLabel(labelName);
      this.close();
    },
    close() {
      this.showDebug = false;
      this.endDebug();
    },
    closeErrors() {
      useMain().clearErrors();
    },
    open() {
      this.showDebug = true;
      this.startDebug();
      const vmStore = useVM();
      const questsStore = useQuests();
      const inventoryStore = useInventory();
      const skillsStore = useSkills();
      this.$nextTick(() => {
        // eslint-disable-next-line no-unused-vars
        const _variablesEditor = new (JSONEditor as any)({
          target: this.$refs.variablesViewer as any,
          props: {
            content: {
              text: undefined,
              json: {
                data: this.variables,
                quests: questsStore.quests,
                items: inventoryStore.items,
                skills: skillsStore.skills,
                skillChecks: skillsStore.skillChecks,
              },
            },
            onChange: (updatedContent: any) => {
              vmStore.overrideData(updatedContent.json.data);
              questsStore.quests = updatedContent.json.quests;
              inventoryStore.items = updatedContent.json.items;
              skillsStore.skills = updatedContent.json.skills;
              skillsStore.skillChecks = updatedContent.json.skillChecks;
            },
          },
        });
        // eslint-disable-next-line no-unused-vars
        const _stateEditor = new (JSONEditor as any)({
          target: this.$refs.stateViewer as any,
          props: {
            content: {
              text: undefined,
              json: getAllStates(),
            },
            onChange: (updatedContent: any) => {
              overrideStates(updatedContent.json);
            },
          },
        });
        // const tree = jsonview.create(JSON.stringify(this.variables));
        // jsonview.render(tree, this.$refs.variablesViewer);
        // jsonview.expand(tree);
      });
    },
    toggle() {
      if (this.showDebug) {
        this.close();
      } else {
        this.open();
      }
    },
    startDebug() {
      useMain().debugMode = true;
    },
    endDebug() {
      useMain().debugMode = false;
    },
    jump() {
      this.jumping = true;
      this.startDebug();
    },
    save() {
      autoSaveGame({});
    },
    resetSave() {
      resetSave();
    },
    resetGlobalSave() {
      resetGlobalSave();
    },
    wordCount() {
      const scripts = Object.values(this.script);
      const count = scripts.reduce((count, script) => {
        logger.log(count);
        return count + this.countWordsInScriptBranch(script.branch);
      }, 0);
      alert(`You have ${count} words`);
    },
    countWordsInScriptLine(scriptLine: Parser.ParsedExpression): number {
      if (scriptLine.command.commandType === 'talk') {
        if (typeof scriptLine.command.args[2] === 'string') {
          return this.countWordsInString(scriptLine.command.args[2] as any);
        }
      }
      if (scriptLine.command.commandType === 'text') {
        return this.countWordsInString(scriptLine.code);
      }
      if (scriptLine.command.commandType === 'choice') {
        const opt = scriptLine.command.staticOptions as StaticChoiceOptions;
        let count = this.countWordsInScriptLine(opt.prompt);
        count += opt.choices.reduce(
          (count, choice) =>
            count + this.countWordsInString(choice.prompt.code),
          0,
        );
        const choices = opt.choices;
        return choices.reduce((count, choice) => {
          if (choice.branch) {
            return count + this.countWordsInScriptBranch(choice.branch);
          }
          return count;
        }, count);
      }
      if (scriptLine.command.commandType === 'if') {
        const opt = scriptLine.command.staticOptions as IfStaticOptions;
        const branches = [opt.success, opt.failure];
        return branches.reduce((count, choice) => {
          if (choice) {
            return count + this.countWordsInScriptBranch(choice);
          }
          return count;
        }, 0);
      }
      return 0;
    },
    countWordsInString(string: string): number {
      return string.split(' ').length;
    },
    countWordsInScriptBranch(branch: Parser.Branch): number {
      return branch.reduce((count, script) => {
        if (script) {
          return count + this.countWordsInScriptLine(script);
        }
        return count;
      }, 0);
    },
    getPlayTimeString(): string {
      const time = getPlayTime(
        this.playTime.start,
        this.playTime.previousPlaytime,
      );
      return toHHMMSS(time / 1000);
    },
  },

  computed: {
    ...mapState(useVM, ['data']),
    ...mapState(useMain, ['playTime', 'errors', 'playing', 'flowState']),
    labels(): string[] {
      const scripts = this.script;
      return Object.keys(scripts).sort();
    },
    script() {
      return vm.script;
    },
    variables(): { [key: string]: any } {
      return this.data;
    },
  },
});
</script>

<style>
.debug-menu {
  z-index: 9999;
}

.debug-button {
  position: fixed;
  bottom: 10px;
  right: 10px;
  padding: 5px;
}

.error-message {
  margin-top: 10px;
  margin-bottom: 10px;
}
.error {
  color: orangered;
}

.warning {
  color: orange;
}

.error-filename {
  color: grey;
  text-decoration: underline;
}

.debug-menu-container {
  width: 100%;
}

.search-result {
  border: 1px solid var(--text-color);
  padding: 10px;
  font-weight: 700;
  font-size: 1.25rem;
  width: 100;
}

.jump-menu-container {
  width: 80%;
}

.debug-info {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  border: 1px dotted var(--text-color);
  top: 0;
  left: 0;
  padding: 5px;
}

.variables-viewer {
  height: 100%;
}
</style>
