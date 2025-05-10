// stores/counter.js
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const getSettingInfo = defineStore('settingInfo', {
    state: () => {
        return {
            mp3Source: 'youdao'
        }
    },
    // getters: {
    //   activeTab: (state) => state.activeTab
    // },
    actions: {
        changMp3Source(val) {
            this.mp3Source = val;
        }
    }
});
