import { defineStore } from 'pinia';

export const useCounter = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  actions: {
    save() {
      return {
        count: this.count,
      };
    },
    load(data: any) {
      this.count = data.count;
    },
    reset() {
      this.count = 0;
    },
  },
});
