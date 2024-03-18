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
    <el-form-item label="年份" required prop="year">
      <el-date-picker type="year" placeholder="请选择年份" v-model="state.detailForm.year" />
    </el-form-item>
    <el-form-item label="目标碳排放值" required prop="value">
      <el-input-number placeholder="请输入目标碳排放值" v-model="state.detailForm.value" />
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { storeToRefs } from 'pinia';
import appStore from '@/store/index.js';
import { renderAxis } from '@/utils/index.js';

const { globalState } = storeToRefs(appStore.global);

const init = {
  year: "",
  value: "",
};
const rules = {
  year: { required: true, message: "请选择年份", trigger: "change" },
  value: { required: true, message: "请输入目标碳排放值", trigger: "blur" },
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
        return {
          ...state.detailForm,
          year: Number(renderAxis('year', state.detailForm.year)),
        };
      })
      .catch(() => {
        return false;
      });
  },
});

const formRef = ref();
const state = reactive({
  detailForm: init,
});

onMounted(async () => {});

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
