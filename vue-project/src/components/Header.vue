<script setup lang="ts">
import { useCounterStore } from '@/stores/theme';
import { inject } from 'vue'

const appName = inject('appName')
const theme = useCounterStore();
</script>
<template>
    <div class="header">
        <div>{{ appName }}</div>
        <el-button text key="plain" plain @click="theme.changeTheme">{{theme.isDarkTheme ? '白色' : '护眼'}}</el-button>
    </div>
</template>
<style lang="less" scoped>
.header {
    height: 39px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>