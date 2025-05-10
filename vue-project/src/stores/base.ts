// stores/counter.js
import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';

export const useBaseInfoStore = defineStore('baseInfo', {
  state: () => {
    return {
      activeTab: ref('2'),
      shoucanWords: reactive({}),
      reviewWords: ref([])
    }
  },
  getters: {
    shoucanWordsArr: (state) => {
      let arr = [];
      for (let key in state.shoucanWords) {
        arr.push(state.shoucanWords[key])
      }
      return arr;
    }
  },
  actions: {
    changeActiveTab(val) {
      this.activeTab = val;
    },
    changeShouCanWords(val) {
      this.shoucanWords = val;
    },
    changeRreviewWords(val) {
      this.reviewWords = val;
    }
  }
});
