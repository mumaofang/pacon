<script setup lang="ts">
import { useBaseInfoStore } from '@/stores/base';
import { storeToRefs } from 'pinia';
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { becomeReviewPlan, changeReviewPlan } from '@/assets/js/common'
const word = ref('')
const translation = ref('')

const isShowP = ref(false);
const isShowM = ref(false);
const isShowT = ref(false);
const isSHowtranslation = ref(true)
const isShowWorld = ref(true)
const index = ref(1);
let reviewList = ref([])
const isReviewSuccess = ref(false);
const baseInfo = useBaseInfoStore();
const { shoucanWordsArr } = storeToRefs(baseInfo);


let wordInfo = reactive({
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
function initStatus() {
    word.value = '';
    translation.value = '';
    isShowP.value = false;
    isShowM.value = false;
    isSHowtranslation.value = true;
    isShowWorld.value = true;
}
function handle() {
    if (!isSHowtranslation.value && !isShowWorld.value) {
        ElMessage.success('通过复习')
        reviewList.value.shift();
        console.log(reviewList.value)
        changeReviewPlan([...reviewList.value])
        if (reviewList.value.length > 0) {
            wordInfo = reviewList.value[0];
            initStatus()
        } else {
            ElMessage.success('今天已经复习完')
            isReviewSuccess.value = true;
        }

        return
    }
    ElMessage.error('复习未通过')
}
watch(shoucanWordsArr, (val) => {
    if (!wordInfo.from && val.length > 0) {
        reviewList.value = becomeReviewPlan(val);
        if (reviewList.value.length > 0) {
            wordInfo = reviewList.value[0]
            console.log('reviewlist===', reviewList)
        } else {
            isReviewSuccess.value = true;
        }
    }
}, { immediate: true })
const playSound = (url: string) => {

    const audio = new Audio(url);
    audio.play().catch(() => {
        ElMessage.error('音频来源错误')
    });
};


function handleEnter() {
    if (translation.value === wordInfo.translation) {
        ElMessage.success('输入正确')
        isSHowtranslation.value = false
        return
    }
    ElMessage.error('输入错误，请重新输入')
}
function handleEnterWord() {
    if (word.value === wordInfo.word) {
        ElMessage.success('输入正确')
        isShowWorld.value = false
        return
    }
    ElMessage.error('输入错误，请重新输入')
}

</script>
<template>

    <div class="review">
        <div v-if="!isReviewSuccess" class="review-content">
            <div class="review-option">
                <div class="title">
                    <span><span>{{ index }}</span>/{{ reviewList.length }}</span>
                </div>
                <div class="review-step">
                    <div class="step-two">
                        <div class="phonetic">
                            <el-button text @click="isShowP = !isShowP">{{ isShowP ? '隐藏' : '查看' }}音标</el-button>
                            <div v-if="isShowP">
                                <div class="item">
                                    <span>英：</span>
                                    <span>{{ wordInfo.phonetic.uk }}</span>

                                </div>
                                <div class="item">
                                    <span>美：</span>
                                    <span>{{ wordInfo.phonetic.us }}</span>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="notes">
                            <el-button text>查看笔记</el-button>
                        </div> -->
                        <div class="mp3">
                            <el-button text @click="isShowM = !isShowM">{{ isShowM ? '隐藏' : '查看' }}音频</el-button>
                            <div v-if="isShowM">
                                <div class="item">
                                    <span>google: </span>
                                    <span class="icon-12" @click="playSound(wordInfo.mp3.google)">
                                        <img src="@/assets/img/sound.png" alt="">
                                    </span>

                                </div>
                                <div class="item">
                                    <span>youdao：</span>
                                    <span class="icon-12" @click="playSound(wordInfo.mp3.youdao)">
                                        <img src="@/assets/img/sound.png" alt="">
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="step-one">
                        <div class="gudu">
                            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#000000"
                                stroke-width="2">
                                <path d="M12 5v14M5 12l7 7 7-7" />
                            </svg>
                        </div>
                        <div>
                            <div v-if="!isSHowtranslation"> {{ wordInfo.translation || '' }}</div>
                            <div v-else class="translation">
                                <el-input @keyup.enter.native="handleEnter" class="center-input" v-model="translation"
                                    placeholder="请输入对应的中文，按回车验证" />
                                <div>
                                    <!-- <span>查看答案</span>
                                <span>{{ wordInfo.translation }}</span> -->
                                    <el-popconfirm width="320" hide-icon confirm-button-text="记住了"
                                        :title="wordInfo.translation || ''">
                                        <template #reference>
                                            <el-button>提示</el-button>
                                        </template>
                                    </el-popconfirm>
                                </div>
                            </div>

                        </div>
                        <div class="gudu">
                            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#000000"
                                stroke-width="2">
                                <path d="M12 5v14M5 12l7 7 7-7" />
                            </svg>
                        </div>
                        <div>
                            <div v-if="!isShowWorld"> {{ wordInfo.word }}</div>
                            <div v-else class="step-input">
                                <el-input class="center-input" @keyup.enter.native="handleEnterWord" v-model="word"
                                    placeholder="请输入对应的英文，按回车验证" />
                                <el-popconfirm width="320" hide-icon confirm-button-text="记住了" :title="wordInfo.word">
                                    <template #reference>
                                        <el-button>提示</el-button>
                                    </template>
                                </el-popconfirm>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="review-btn">
                <!-- <el-button :disabled="index === 1" @click="handle">上一个</el-button>
                <span> / </span> -->
                <el-button @click="handle">下一个</el-button>
            </div>
        </div>
        <div v-if="!isReviewSuccess" class="ai-content"></div>
        <div v-if="isReviewSuccess" class="no-plan-content">
            <div class="no-plan">今天没有复习计划或者已经复习完成了</div>
            <div class="no-plan tip">复习计划根据昨天单词本来制定的，今天收藏到单词本的今天是没有复习计划的</div>
        </div>
    </div>
</template>
<style lang="less" scoped>
::v-deep(.center-input .el-input__inner) {
    text-align: center;
}

::v-deep(.el-input__inner)::placeholder {
    font-size: 12px;
}

.review {
    display: flex;
    height: calc(100vh - 81px);

    .review-content {
        flex-grow: 1;
        width: 50%;
        border-right: 1px solid var(--border-color);

        .review-option {
            height: calc(100% - 140px);
            width: 90%;
            border-radius: 20px;
            border: 1px solid var(--border-color);
            margin: 20px 5%;

            .title {
                padding: 15px 20px;
            }

            .review-step {
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: center;

                // padding-top: 50px;
                .step-two {
                    display: flex;
                    // align-items: center;
                    justify-content: center;
                    height: 150px;
                    padding-top: 50px;

                    .mp3 {
                        padding-left: 10px;

                        .item {
                            display: flex;
                            align-items: center;
                        }
                    }
                }

                .step-one {
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    .gudu {
                        display: flex;
                        justify-content: center;
                        padding: 20px;
                    }

                    .step-input {
                        // width: 200px;
                        display: flex;
                    }

                    .translation {
                        // padding-bottom: 50px;
                        display: flex;
                    }
                }
            }
        }

        .review-btn {
            height: 100px;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;

        }
    }

    .ai-content {
        flex-grow: 1;
        flex: 1;
    }
}

.no-plan-content {
    width: 100%;
    padding-top: 100px;
    .no-plan {
        width: 100%;
        text-align: center;
        margin: 0 auto;
        color: var(--text-primary);
    }
    .tip {
        font-size: 13px;
        opacity: 0.8;
        padding-top: 10px;
    }
}
</style>