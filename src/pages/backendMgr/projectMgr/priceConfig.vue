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
    <el-form-item label="项目电费单价（元）" required prop="electric">
      <el-input placeholder="请输入" v-model="state.priceForm.electric" />
    </el-form-item>
    <el-form-item label="项目水费单价（元）" required prop="water">
      <el-input placeholder="请输入" v-model="state.priceForm.water" />
    </el-form-item>
    <el-form-item label="项目燃气费单价（元）" required prop="gas">
      <el-input placeholder="请输入" v-model="state.priceForm.gas" />
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, reactive } from "vue";

const init = {
  electric: "",
  water: "",
  gas: "",
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
