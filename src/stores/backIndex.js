import { defineStore } from 'pinia'

export const useBackIndexStore = defineStore('backIndex', {
  state: () => {
    return { currentBackIndex: 0 }
  },
  actions: {
    setBackIndex(value) {
      this.currentBackIndex = value;
    },
  },
})