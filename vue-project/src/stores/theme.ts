// stores/counter.js
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('theme', () => {
    // 是否主题
    const isDarkTheme = ref(false);

    // 操作方法（Actions）
    function changeTheme() {
        isDarkTheme.value = !isDarkTheme.value
    }

    return { isDarkTheme, changeTheme };
});
