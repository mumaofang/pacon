<template>
    <div class="setting">
        <el-form :model="form" label-width="120px">
            <el-form-item label="音频来源">
                <el-radio-group v-model="form.mp3Source">
                    <el-radio value="youdao" label="youdao" />
                    <el-radio value="google" label="google" />
                </el-radio-group>
            </el-form-item>
            <!-- <el-form-item label="Activity name">
            <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="Activity zone">
            <el-select v-model="form.region" placeholder="please select your zone">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
            </el-select>
        </el-form-item>
        <el-form-item label="Activity time">
            <el-col :span="11">
                <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%" />
            </el-col>
            <el-col :span="2" class="text-center">
                <span class="text-gray-500">-</span>
            </el-col>
            <el-col :span="11">
                <el-time-picker v-model="form.date2" placeholder="Pick a time" style="width: 100%" />
            </el-col>
        </el-form-item>
        <el-form-item label="Instant delivery">
            <el-switch v-model="form.delivery" />
        </el-form-item>
        <el-form-item label="Activity type">
            <el-checkbox-group v-model="form.type">
                <el-checkbox label="Online activities" name="type" />
                <el-checkbox label="Promotion activities" name="type" />
                <el-checkbox label="Offline activities" name="type" />
                <el-checkbox label="Simple brand exposure" name="type" />
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Resources">
            <el-radio-group v-model="form.resource">
                <el-radio label="Sponsor" />
                <el-radio label="Venue" />
            </el-radio-group>
        </el-form-item>
        <el-form-item label="Activity form">
            <el-input v-model="form.desc" type="textarea" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <el-button>Cancel</el-button>
        </el-form-item> -->
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { getSettingInfo } from '@/stores/setting'
import { ElMessage } from 'element-plus';

const settingInfo = getSettingInfo();

// do not use same name with ref
const form = reactive({
    // name: '',
    // region: '',
    // date1: '',
    // date2: '',
    // delivery: false,
    // type: [],
    mp3Source: settingInfo.mp3Source,
    // desc: '',
})

const onSubmit = () => {
    settingInfo.changMp3Source(form.mp3Source)
    
    ElMessage.success('设置成功')
}
</script>

<style lang="less" scoped>
    .setting {
        padding: 15px;
    }

</style>