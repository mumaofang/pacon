<script setup lang="ts">
import { onMounted, onUnmounted, ref, provide } from 'vue';
import { useCounterStore } from '@/stores/theme';
import { useBaseInfoStore } from '@/stores/base';
import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import Main from '@/components/Main.vue'
import Footer from '@/components/Footer.vue'
import { debounce } from '@/assets/js/index'
import baseJosn from '@/assets/data/base.json';
import { getWrods } from '@/api/getApi'
for (let key in baseJosn) {
    provide(key, baseJosn[key])
}

const theme = useCounterStore();
const baseInfo = useBaseInfoStore();
const isWideScreen = ref(false);

const checkWidth = () => {
    isWideScreen.value = window.innerWidth > 900;
};

const debouncedCheck = debounce(checkWidth, 200); // 复用防抖函数

onMounted(() => {
    checkWidth();
    window.addEventListener('resize', debouncedCheck);

    getWrodsInit();
});
async function getWrodsInit() {
    const res = await getWrods();
    // 每天第一次都需要根据单词本生成复习计划
    baseInfo.changeShouCanWords(res.shoucan)
}
onUnmounted(() => {
    window.removeEventListener('resize', debouncedCheck);
});




</script>

<template>
    <div class="main" :class="{ 'dark-theme': theme.isDarkTheme }">
        <el-container class="modern-container">
            <el-header class="modern-header">
                <Header />
            </el-header>
            <el-container class="modern-body-container">
                <el-aside class="modern-aside" v-if="isWideScreen">
                    <Aside />
                </el-aside>
                <el-container class="modern-main-footer">
                    <el-main class="modern-main">
                        <Main />
                    </el-main>
                    <el-footer class="modern-footer">
                        <Footer />
                    </el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<style lang="less" scoped>
.main {
    height: 100vh;
    background-color: #fefefe;
    color: var(--text-primary);

}

.modern-body-container {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
}

.modern-header {
    background-color: var(--card-background);
    height: 40px;
    border-bottom: 1px solid var(--border-color);
}

.modern-aside {
    width: 220px !important;
    overflow: hidden !important;
    background-color: var(--card-background);
    border-right: 1px solid var(--border-color);
    transition: all var(--transition-normal);
    position: relative;
    z-index: 5;
    box-shadow: 4px 0 10px rgba(0, 0, 0, 0.03);
    height: calc(100vh - 40px);
}

.modern-main-footer {
    flex: 1;
    height: calc(100vh - 40px);

}

.modern-main {
    padding: 0 !important;
    background-color: var(--card-background);
    border-bottom: 1px solid var(--border-color);
}

.modern-footer {
    background-color: var(--card-background);
    height: 40px;
}
</style>