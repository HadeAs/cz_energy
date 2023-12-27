<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-24 20:16:45
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-27 19:46:57
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
    <el-form-item label="变量类型" required prop="varType">
      <el-select v-model="state.detailForm.varType" placeholder="请选择">
        <el-option v-for="item in VARIABLE_TYPE" v-bind="item" />
      </el-select>
    </el-form-item>
    <el-form-item label="一级变量名称" required prop="classOneName">
      <el-input placeholder="请输入" v-model="state.detailForm.classOneName" />
    </el-form-item>
    <el-form-item label="二级变量名称" prop="classTwoName">
      <el-input placeholder="请输入" v-model="state.detailForm.classTwoName" />
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { VARIABLE_TYPE } from "@/constant";

const init = {
  classTwoName: "",
  varType: "",
  classOneName: "",
};
const props = defineProps({
  initData: {
    type: Object,
  },
});
const rules = {
  varType: { required: true, message: "请选择变量类型", trigger: "change" },
  classOneName: {
    required: true,
    message: "请输入一级变量名称",
    trigger: "blur",
  },
  classTwoName: {
    required: true,
    message: "请输入二级变量名称",
    trigger: "blur",
  },
};
defineExpose({
  validate: () => {
    return formRef.value
      .validate()
      .then(() => {
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
</style>
