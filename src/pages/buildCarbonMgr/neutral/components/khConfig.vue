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
    <el-form-item label="碳中和年份" required prop="carbonTopYear">
      <el-date-picker type="year" placeholder="请选择碳中和年份" v-model="state.detailForm.carbonTopYear" />
    </el-form-item>
    <el-form-item label="碳达峰目标(t)" required prop="carbonTopTarget">
      <el-input-number placeholder="请输入碳达峰目标" v-model="state.detailForm.carbonTopTarget" />
    </el-form-item>
    <el-form-item label="碳达峰年份" required prop="carbonNtYear">
      <el-date-picker type="year" placeholder="请选择碳达峰年份" v-model="state.detailForm.carbonNtYear" />
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { getTarget } from '@/api/buildCarbon/neutral.js';
import { storeToRefs } from 'pinia';
import appStore from '@/store/index.js';
import { renderAxis } from '@/utils/index.js';

const { globalState } = storeToRefs(appStore.global);

const init = {
  carbonTopYear: "",
  carbonTopTarget: "",
  carbonNtYear: "",
};
const rules = {
  carbonTopYear: { required: true, message: "请选择碳中和年份", trigger: "change" },
  carbonTopTarget: { required: true, message: "请输入碳达峰目标", trigger: "blur" },
  carbonNtYear: { required: true, message: "请选择碳达峰年份", trigger: "change" },
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
          carbonTopYear: Number(renderAxis('year', state.detailForm.carbonTopYear)),
          carbonNtYear: Number(renderAxis('year', state.detailForm.carbonNtYear)),
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

onMounted(async () => {
  const res = await getTarget({ projectId: globalState.value.projectId });
  state.detailForm = {
    ...res?.data?.data || {},
    carbonTopYear: String(res?.data?.data?.carbonTopYear),
    carbonNtYear: String(res?.data?.data?.carbonNtYear),
  };
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
