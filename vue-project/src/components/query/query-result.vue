<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { getData, save, getAiAnswer, saveNotesApi } from '@/api/getApi'
import { getSettingInfo } from '@/stores/setting'
import { useBaseInfoStore } from '@/stores/base';
const baseInfo = useBaseInfoStore();
const settingInfo = getSettingInfo();
const props = defineProps(['wordInfo']);
let wordInof = reactive({
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
wordInof = props.wordInfo;
const isShoucan = ref(false)
let aiAnswer = ref([])
const aiLoading = ref(false)
const clickMap = reactive({})
const playSound = (urls: object) => {

    const audio = new Audio(urls[settingInfo.mp3Source]);
    audio.play().catch(() => {
        ElMessage.error('请去设置里设置为其他音频来源')
    });
};
watch(props.wordInfo.word, () => {
    aiAnswer.value = []
})
async function shoucang() {
    // 保存wordInfo到文件哦
    const res = await save({ ...wordInof })
    if (res.success) {
        isShoucan.value = false;
        baseInfo.changeShouCanWords(res.shoucan);
    }
}
async function aiKj() {
    aiLoading.value = true;
    if (clickMap[wordInof.word]) {
        clickMap[wordInof.word]++;
    } else {
        clickMap[wordInof.word] = 1;
    }
    const res = await getAiAnswer({
        data: wordInof.word,
        clickNum: clickMap[wordInof.word] || 1
    })

    aiLoading.value = false;
    aiAnswer.value = res.items[1]
    console.log(clickMap)

}
const isAddNotes = ref(false)

async function addNotes() {
    isAddNotes.value = true
}
async function saveNotes() {
    isAddNotes.value = !isAddNotes.value;
    // console.log(wordInof)
    const res = await saveNotesApi({ ...wordInof });
    baseInfo.changeShouCanWords(res.shoucan);

}

</script>
<template>

    <!-- <div class="query-main"> -->




    <div class="query-result">
        <div class="query-result-base">
            <div class="world">
                <span>{{ wordInof.from }}</span>
                <span class="icon-12" @click="playSound(wordInof.mp3)">
                    <img src="@/assets/img/sound.png" alt="">
                </span>
                <div v-if="isShoucan" class="shoucan">
                    <el-button @click="shoucang" text>收藏</el-button>
                </div>
                <div class="shoucan">
                    <el-tooltip class="box-item" effect="dark" content="生成内容不喜欢，可以再次点击" placement="top">
                        <el-button @click="aiKj" text :loading="aiLoading">AI帮记</el-button>
                    </el-tooltip>

                </div>

                <!-- <span class="icon-12" @click="playSound(wordInof.mp3.youdao)">
                        <img src="@/assets/img/sound.png" alt="">
                    </span> -->
            </div>
            <div class="duying">
                <div class="item">
                    <span>英：</span>
                    <span>{{ wordInof.phonetic.uk }}</span>

                </div>
                <div class="item">
                    <span>美：</span>
                    <span>{{ wordInof.phonetic.us }}</span>
                    <!-- <span class="icon-12" @click="playSound(wordInof.mp3.youdao)">
                            <img src="@/assets/img/sound.png" alt="">
                        </span> -->
                </div>
            </div>
            <div class="fanyi">
                {{ wordInof.translation }}
            </div>

            <div class="notes">
                <div class="btn">
                    <div>笔记内容</div>
                    <el-tooltip class="box-item" effect="dark" content="点击笔记可以修改和新增笔记内容，（可以把AI生成好的记忆单词内容放在笔记里）"
                        placement="top">
                        <el-button @click="addNotes" text>笔记</el-button>
                    </el-tooltip>
                </div>
                <div class="notes-content">
                    <div v-if="!isAddNotes">
                        <div v-if="wordInof.notes">
                            <div v-for="item in wordInof.notes.split('\n')">{{ item }}</div>
                        </div>

                    </div>
                    <div v-else>
                        <el-input v-model="wordInof.notes" maxlength="100" placeholder="请输入笔记内容，最多100个字，多了也记不住"
                            show-word-limit :rows="10" type="textarea" />

                        <div class="add-save-btn"><el-button text @click="saveNotes">保存</el-button></div>

                    </div>

                </div>
            </div>
        </div>
        <div class="ai-box" v-loading="aiLoading">

            <div class="ai-content">
                <div class="item" v-for="(item, index) in aiAnswer" :key="index">
                    {{ item }}
                </div>
            </div>

        </div>
    </div>




    <!-- </div> -->
</template>
<style lang="less" scoped>
.query-result {
    height: calc(100%);
    display: flex;
    flex: 1;



    .query-result-base {
        min-width: 30%;
        max-width: 50%;
        padding: 20px;
        font-size: 13px;
        border-right: 1px solid var(--border-color);


        .duying {
            padding: 10px;
            display: flex;

            .item {
                display: flex;
                align-items: center;
                padding-right: 20px;
            }
        }

        .fanyi {
            padding: 10px;
            font-size: 20px;
            border-bottom: 1px solid var(--border-color);
        }

        .world {
            display: flex;
            align-items: baseline;
            font-size: 30px;
            padding: 10px;

            .icon-12 {
                padding-left: 10px;

                img {
                    width: 14px;

                }
            }

            .icon-12:hover {
                cursor: pointer;
            }

            .shoucan {
                flex: 1;
                display: flex;
                justify-content: flex-end;
                margin-left: 20px;
            }
        }

        .notes {
            .btn {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 60px;
                border-bottom: 1px solid var(--border-color);
            }

            .notes-content {
                padding: 15px 0;

                .add-save-btn {
                    display: flex;
                    justify-content: flex-end;
                    padding: 10px 0;
                }
            }
        }
    }

    .ai-box {
        flex-grow: 1;
        // background-color: aqua;
        flex: 1;
        overflow: auto;

        .ai-content {
            // height: 1000px;
            font-size: 15px;

            .item {
                margin: 10px 0 0 20px;
            }
        }
    }
}
</style>