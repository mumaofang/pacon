<template>


  <el-menu class="tree-menu" :default-active="baseInfo.activeTab" @select="handleOpen"  @close="handleClose">

    <el-menu-item index="1">
      <el-icon><icon-menu /></el-icon>
      <span>查询</span>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon>
        <document />
      </el-icon>
      <span>复习</span>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon>
        <Notebook />
      </el-icon>
      <span>单词本</span>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon>
        <setting />
      </el-icon>
      <span>设置</span>
    </el-menu-item>
  </el-menu>



</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { useBaseInfoStore } from '@/stores/base';
let baseInfo = useBaseInfoStore();

const handleOpen = (key: string, keyPath: string[]) => {
  baseInfo.changeActiveTab(key[0]);
}
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
</script>

<style scoped>
  .tree-menu {
    background-color: transparent !important;
    color: var(--text-primary);
    border-right: transparent;
  }
  .el-menu-item {
    color: var(--text-primary);
  }
</style>