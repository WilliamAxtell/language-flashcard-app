import { defineStore } from 'pinia'

export const wordStore = defineStore('wordStore', {
  state: () => ({
    sharedData: null, // The shared data
  }),
  actions: {
    setSharedData(data) {
      this.sharedData = data
    }
  }
})
