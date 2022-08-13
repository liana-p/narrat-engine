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
    <modal
      v-if="jumping"
      @close="finishJumping"
      containerCssClass="jump-menu-container"
    >
      <template v-slot:header>
        <h3 class="title">Jump to label</h3>
      </template>
      <template v-slot:body>
        <input
          type="text"
          class="label-input input"
          ref="search"
          v-model="searchString"
          @input="onSearchInput"
        />
        <div class="search-results" v-if="matches.length > 0">
          <div
            class="search-result"
            v-for="(match, index) in matches"
            :style="getMatchResultStyle(index)"
            :key="index"
          >
            {{ match }}
          </div>
        </div>
        <div v-else><h3>No matches found</h3></div>
      </template>
    </modal>
    <modal
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
    </modal>
    <modal
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
          <!-- <h2>Skills</h2>
          <table class="table-auto">
            <tr>
              <th>Skill</th>
              <th>Level</th>
            </tr>
            <tr v-for="(skill, key) in skills" :key="key">
              <td>{{ key }}</td>
              <td>{{ skill.level }}</td>
            </tr>
          </table> -->
        </div>
      </template>
    </modal>
  </div>
</template>

<script lang="ts">
import { logger } from '@/utils/logger';
import { getPlayTime, toHHMMSS } from '@/utils/time-helpers';
import { computed, defineComponent } from 'vue';
import Modal from '../utils/modal-window.vue';
import Fuse from 'fuse.js';
import { JSONEditor } from 'svelte-jsoneditor/dist/jsoneditor.js';
import { Parser } from '@/types/parser';
import { useSkills } from '@/stores/skills';
import { useMain } from '@/stores/main-store';
import { mapState } from 'pinia';
import { useVM } from '@/stores/vm-store';
import { StaticChoiceOptions } from '@/vm/commands/choice';
import { IfStaticOptions } from '@/vm/commands/if';
import { useQuests } from '../../stores/quest-log';
import { useInventory } from '../../stores/inventory-store';

let fuse: Fuse<string>;

export default defineComponent({
  components: {
    Modal,
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
      searchString: '',
      matches: [] as string[],
      matchCursor: 0,
    };
  },

  mounted() {
    window.addEventListener('keydown', (event) => {
      if (!this.jumping) {
        if (event.key === 'd') {
          this.toggle();
        }
        if (event.key === 'j') {
          this.jump();
        }
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (this.matches.length > this.matchCursor + 1) {
          this.matchCursor += 1;
        } else {
          this.matchCursor = 0;
        }
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (this.matchCursor > 0) {
          this.matchCursor -= 1;
        } else {
          this.matchCursor = this.matches.length - 1;
        }
      }
      if (event.key === 'Escape') {
        this.finishJumping();
        this.showDebug = false;
      }
      if (this.jumping && event.key === 'Enter') {
        if (this.matchCursor < this.matches.length) {
          const match = this.matches[this.matchCursor];
          useVM().jumpToLabel(match);
          this.finishJumping();
        }
      }
    });
  },

  methods: {
    finishJumping() {
      this.jumping = false;
      this.matches = [];
      this.searchString = '';
    },
    labelSelected(event: any) {
      const labelName = event.target.value;
      useVM().jumpToLabel(labelName);
      this.close();
    },
    close() {
      this.showDebug = false;
    },
    closeErrors() {
      useMain().clearErrors();
    },
    open() {
      this.showDebug = true;
      const vmStore = useVM();
      const mainStore = useMain();
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
              json: mainStore.getAllStates(),
            },
            onChange: (updatedContent: any) => {
              mainStore.overrideStates(updatedContent.json);
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
        this.showDebug = false;
      } else if (this.jumping) {
        this.finishJumping();
      } else {
        this.open();
      }
    },
    jump() {
      fuse = new Fuse(this.labels, {
        includeScore: true,
      });
      this.jumping = true;
      setTimeout(() => {
        this.$nextTick(() => {
          (this.$refs.search as any).focus();
        });
      }, 10);
      this.matchCursor = 0;
      this.matches = this.labels;
      // this.onSearchInput();
    },
    getMatchResultStyle(index: number) {
      if (index === this.matchCursor) {
        return {
          background: 'var(--light-background)',
        };
      }
    },
    onSearchInput() {
      const value = this.searchString;
      console.log(value);
      const result = fuse.search(value);
      this.matches = result.map((element) => element.item);
      if (
        this.matches.length > 0 &&
        this.matchCursor > this.matches.length - 1
      ) {
        this.matchCursor = this.matches.length - 1;
      }
    },
    save() {
      useMain().autoSaveGame({});
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
    ...mapState(useVM, ['script', 'data']),
    ...mapState(useMain, ['playTime', 'errors', 'playing', 'flowState']),
    labels(): string[] {
      const scripts = this.script;
      return Object.keys(scripts).sort();
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
