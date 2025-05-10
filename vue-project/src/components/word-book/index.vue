<script setup lang="ts">
import { reactive } from 'vue';
import { useBaseInfoStore } from '@/stores/base';
import QueryResutl from '../query/query-result.vue'
import { cancelShoucanApi } from '@/api/getApi'
const baseInfo = useBaseInfoStore();
let shoucanWords = baseInfo.shoucanWords;
const wordInfo = reactive({
    word: '',
    phonetic: {
        uk: '',
        us: ''
    },
    mp3: {
        google: '',
        youdao: ''
    },
    from: '',
    translation: '',
    notes: '',
})
let shoucanArr = ref([])
for (let key in shoucanWords) {
    shoucanArr.value.push(shoucanWords[key])
}

function viewWord(words) {
    wordInfo.word = words.word;
    wordInfo.phonetic = words.phonetic;
    wordInfo.mp3 = words.mp3;
    wordInfo.from = words.from;
    wordInfo.translation = words.translation;
    wordInfo.notes = words.notes;
}
viewWord(shoucanArr.value[0])

async function cancelShoucan(item) {
    const res = await cancelShoucanApi(item.word);
    baseInfo.changeShouCanWords(res.shoucan)
    shoucanArr.value = []
    for (let key in res.shoucan) {
        shoucanArr.value.push(res.shoucan[key])
    }
    viewWord(shoucanArr.value[0])
}

</script>
<template>
    <div class="word-book">
        <div class="word-book-list">
            <div class="title">单词列表</div>
            <div v-for="item in shoucanArr" class="item" @click="viewWord(item)">
                <div> {{ item.word }}</div>
                <div>
                    <el-tooltip class="box-item" effect="dark" content="点击代表记住了，将取消收藏" placement="top">
                        <el-button text @click="cancelShoucan(item)">
                            <el-icon class="el-icon-active">
                                <Check />
                            </el-icon>
                        </el-button>
                    </el-tooltip>

                </div>
            </div>
        </div>
        <div class="word-book-sign">
            <QueryResutl :wordInfo="wordInfo"></QueryResutl>
        </div>
        <!-- <div class="word-book-ai"></div> -->
    </div>
</template>
<style lang="less" scoped>
.word-book {
    display: flex;
    height: 100%;

    .word-book-list {
        width: 20%;
        height: 100%;
        border-right: 1px solid var(--border-color);

        // background-color: var(--background-color);
        .title {
            height: 50px;
            font-size: 15px;
            font-weight: bold;
            line-height: 50px;
            padding-left: 15px;
        }

        .item {
            padding: 10px 10px 10px 20px;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
        }

        .item:hover {
            opacity: 0.7;
            background-color: var(--border-color);
        }

        .el-icon-active:hover {
            color: red;
        }
    }

    .word-book-sign {
        // width: 30%;
        flex: 1;
        height: 100%;
        border-right: 1px solid var(--border-color);
        // background-color: var(--card-background);
    }

    // .word-book-ai {
    //     flex: 1;
    //     // background-color: var(--card-background);
    // }
}
</style>