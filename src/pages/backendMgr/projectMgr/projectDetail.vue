<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-24 20:16:45
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2024-01-05 20:58:13
 * @Description: 
-->
<template>
  <el-form
    ref="formRef"
    :rules="rules"
    label-position="left"
    :model="state.detailForm"
    label-width="180px"
    class="custom-form"
  >
    <el-form-item label="项目名称" required prop="name">
      <el-input placeholder="请输入" v-model="state.detailForm.name" />
    </el-form-item>
    <el-form-item label="所在地区" required prop="region">
      <el-input placeholder="请输入" v-model="state.detailForm.region" />
    </el-form-item>
    <el-form-item label="建筑面积(㎡)" required prop="area">
      <el-input placeholder="请输入" v-model="state.detailForm.area" />
    </el-form-item>
    <el-form-item label="建筑分类" required prop="buildingTypeId">
      <el-select v-model="state.detailForm.buildingTypeId" placeholder="请选择">
        <el-option v-for="item in BUILD_TYPE" v-bind="item" />
      </el-select>
    </el-form-item>
    <el-form-item label="运行系统" required prop="sysClassIds">
      <el-select
        multiple
        v-model="state.detailForm.sysClassIds"
        placeholder="请选择"
      >
        <el-option v-for="item in WORK_SYSTEM" v-bind="item" />
      </el-select>
    </el-form-item>
    <el-form-item label="起始时间" required prop="openTime">
      <el-date-picker
        value-format="YYYY-MM-DD"
        v-model="state.detailForm.openTime"
        type="date"
        placeholder="请选择时间"
      />
    </el-form-item>
    <el-form-item label="项目最大冷负荷（kW）" required prop="maxColdLoad">
      <el-input placeholder="请输入" v-model="state.detailForm.maxColdLoad" />
    </el-form-item>
    <el-form-item label="项目最大热负荷（kW）" required prop="maxHotLoad">
      <el-input placeholder="请输入" v-model="state.detailForm.maxHotLoad" />
    </el-form-item>
    <el-form-item label="项目模式" required prop="mode">
      <el-radio-group v-model="state.detailForm.mode">
        <el-radio-button label="供冷" />
        <el-radio-button label="供暖" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="项目介绍" required prop="description">
      <el-input
        v-model="state.detailForm.description"
        type="textarea"
        placeholder="请输入至少5个字符"
      />
    </el-form-item>
    <el-form-item label="开启远程控制">
      <el-switch
        v-model="state.detailForm.isRemoted"
        inline-prompt
        active-text="开"
        inactive-text="关"
        active-value="1"
        inactive-value="0"
      />
    </el-form-item>
    <div v-if="state.detailForm.isRemoted === '1'" class="sub-form-container">
      <el-form-item label="Mqtt  Topic" required prop="topic">
        <el-input placeholder="请输入" v-model="state.detailForm.topic" />
      </el-form-item>
      <el-form-item label="出水温度设定标识符" required prop="temperatureSettingTag">
        <el-input placeholder="请输入" v-model="state.detailForm.temperatureSettingTag" />
      </el-form-item>
      <el-form-item label="一键启停标识符" required prop="startStopTag">
        <el-input
          placeholder="请输入"
          v-model="state.detailForm.startStopTag"
        />
      </el-form-item>
      <el-form-item label="冬夏切换标识符" required prop="summerWinnerTag">
        <el-input placeholder="请输入" v-model="state.detailForm.summerWinnerTag" />
      </el-form-item>
    </div>
  </el-form>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { BUILD_TYPE, WORK_SYSTEM } from "@/constant";

const init = {
  name: "",
  region: "",
  area: "",
  buildingTypeId: "",
  sysClassIds: [],
  openTime: "",
  maxColdLoad: "",
  maxHotLoad: "",
  mode: "",
  description: "",
  isRemoted: false,
  topic: "",
  temperatureSettingTag: "",
  startStopTag: "",
  summerWinnerTag: "",
};
const rules = {
  name: { required: true, message: "请输入项目名称", trigger: "blur" },
  region: { required: true, message: "请输入所在地区", trigger: "blur" },
  area: { required: true, message: "请输入建筑面积", trigger: "blur" },
  buildingTypeId: { required: true, message: "请选择建筑分类", trigger: "change" },
  sysClassIds: { required: true, message: "请选择运行系统", trigger: "change" },
  openTime: {
    type: "date",
    required: true,
    message: "请选择起始时间",
    trigger: "change",
  },
  maxColdLoad: {
    required: true,
    message: "请输入项目最大冷负荷",
    trigger: "blur",
  },
  maxHotLoad: {
    required: true,
    message: "请输入项目最大热负荷",
    trigger: "blur",
  },
  mode: { required: true, message: "请选择项目模式", trigger: "change" },
  topic: { required: true, message: "请输入Mqtt  Topic", trigger: "blur" },
  temperatureSettingTag: {
    required: true,
    message: "请输入出水温度设定标识符",
    trigger: "blur",
  },
  startStopTag: {
    required: true,
    message: "请输入一键启停标识符",
    trigger: "blur",
  },
  summerWinnerTag: {
    required: true,
    message: "请输入冬夏切换标识符",
    trigger: "blur",
  },
  description: [
    { required: true, message: "请输入项目介绍", trigger: "blur" },
    { min: 5, message: "请输入至少5个字符", trigger: "blur" },
  ],
};
const props = defineProps({
  initData: {
    type: Object,
  },
});

defineExpose({
  validate: () => {
    return formRef.value
      .validate()
      .then(() => {
        if (!state.detailForm.isRemoted) {
          state.detailForm.topic = "";
          state.detailForm.temperatureSettingTag = "";
          state.detailForm.startStopTag = "";
          state.detailForm.summerWinnerTag = "";
        }
        return state.detailForm;
      })
      .catch(() => {
        return false;
      });
  },
});

const formRef = ref();
const state = reactive({ detailForm: init });

onMounted(() => {
  if (props.initData) {
    const formData = { ...init, ...props.initData };
    state.detailForm = formData;
  }
});
</script>
<style lang="scss" scoped>
.custom-form,
.sub-form-container {
  :deep() {
    .el-form-item {
      flex-direction: column !important;
    }
  }
}
.sub-form-container {
  padding: 10px 15px;
  background-color: #f4f7fd;
  border: 1px dashed #e3e3e3;
  border-radius: 3px;
}
</style>
