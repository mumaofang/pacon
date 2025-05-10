<script setup lang="ts">
import Query from '@/components/query/index.vue'
import Review from '@/components/review/index.vue'
import WordBook from '@/components/word-book/index.vue'
import Setting from '@/components/setting/index.vue'
import { useBaseInfoStore } from '@/stores/base';
let baseInfo = useBaseInfoStore();
let tabs = {
    '1': Query,
    '2': Review,
    '3': WordBook,
    '4': Setting,
}
</script>
<template>

    <KeepAlive>
        <component :is="tabs[baseInfo.activeTab]"></component>
    </KeepAlive>

</template>
<style lang="less" scoped></style>