<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-25 10:33:49
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-25 13:10:10
 * @Description: 
-->
<template>
  <el-form
    ref="formRef"
    label-position="left"
    :model="state.priceForm"
    label-width="180px"
    class="custom-form"
  >
    <el-form-item label="项目电费单价（元）" required prop="powerCost">
      <el-input-number placeholder="请输入" v-model="state.priceForm.powerCost" />
    </el-form-item>
    <el-form-item label="项目水费单价（元）" required prop="waterCost">
      <el-input-number placeholder="请输入" v-model="state.priceForm.waterCost" />
    </el-form-item>
    <el-form-item label="项目燃气费单价（元）" required prop="gasCost">
      <el-input-number placeholder="请输入" v-model="state.priceForm.gasCost" />
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, reactive } from "vue";

const init = {
  powerCost: 0,
  waterCost: 0,
  gasCost: 0,
};

defineExpose({
  validate: () => {
    return formRef.value
      .validate()
      .then(() => {
        return state.priceForm;
      })
      .catch(() => {
        return false;
      });
  },
});

const formRef = ref();
const state = reactive({ priceForm: init });
</script>
<style lang="scss" scoped>
.custom-form {
  :deep() {
    .el-form-item {
      flex-direction: column !important;
    }
  }
}
</style>
