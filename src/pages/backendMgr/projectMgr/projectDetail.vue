<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-24 20:16:45
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-25 16:00:17
 * @Description: 
-->
<template>
  <el-form
    ref="formRef"
    label-position="left"
    :model="state.detailForm"
    label-width="180px"
    class="custom-form"
  >
    <el-form-item label="项目名称" required prop="projectName">
      <el-input placeholder="请输入" v-model="state.detailForm.projectName" />
    </el-form-item>
    <el-form-item label="所在地区" required prop="district">
      <el-input placeholder="请输入" v-model="state.detailForm.district" />
    </el-form-item>
    <el-form-item label="建筑面积(㎡)" required prop="area">
      <el-input placeholder="请输入" v-model="state.detailForm.area" />
    </el-form-item>
    <el-form-item label="建筑分类" required prop="buildType">
      <el-select v-model="state.detailForm.buildType" placeholder="请选择">
        <el-option v-for="item in BUILD_TYPE" v-bind="item" />
      </el-select>
    </el-form-item>
    <el-form-item label="运行系统" required prop="system">
      <el-select
        multiple
        v-model="state.detailForm.system"
        placeholder="请选择"
      >
        <el-option v-for="item in WORK_SYSTEM" v-bind="item" />
      </el-select>
    </el-form-item>
    <el-form-item label="起始时间" required prop="startTime">
      <el-date-picker
        value-format="YYYY-MM-DD"
        v-model="state.detailForm.startTime"
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
    <el-form-item label="项目介绍" required prop="desc">
      <el-input
        v-model="state.detailForm.desc"
        type="textarea"
        placeholder="请输入至少5个字符"
      />
    </el-form-item>
    <el-form-item label="开启远程控制">
      <el-switch
        v-model="state.detailForm.ifRemote"
        inline-prompt
        active-text="开"
        inactive-text="关"
      />
    </el-form-item>
    <div v-if="state.detailForm.ifRemote" class="sub-form-container">
      <el-form-item label="Mqtt  Topic" required prop="mqtt">
        <el-input placeholder="请输入" v-model="state.detailForm.mqtt" />
      </el-form-item>
      <el-form-item label="出水温度设定标识符" required prop="tempSetTag">
        <el-input placeholder="请输入" v-model="state.detailForm.tempSetTag" />
      </el-form-item>
      <el-form-item label="一键启停标识符" required prop="startStopTag">
        <el-input
          placeholder="请输入"
          v-model="state.detailForm.startStopTag"
        />
      </el-form-item>
      <el-form-item label="冬夏切换标识符" required prop="switchTag">
        <el-input placeholder="请输入" v-model="state.detailForm.switchTag" />
      </el-form-item>
    </div>
  </el-form>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { BUILD_TYPE, WORK_SYSTEM } from "@/constant";

const init = {
  projectName: "",
  district: "",
  area: "",
  buildType: "",
  system: [],
  startTime: "",
  maxColdLoad: "",
  maxHotLoad: "",
  mode: "",
  desc: "",
  ifRemote: false,
  mqtt: "",
  tempSetTag: "",
  startStopTag: "",
  switchTag: "",
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
        if (!state.detailForm.ifRemote) {
          state.detailForm.mqtt = "";
          state.detailForm.tempSetTag = "";
          state.detailForm.startStopTag = "";
          state.detailForm.switchTag = "";
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
