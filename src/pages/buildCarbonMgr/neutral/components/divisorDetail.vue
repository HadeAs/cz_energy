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
    <el-form-item label="碳信用抵消(t)" required prop="carbonCreditAmount">
      <el-input-number placeholder="请输入碳信用抵消" v-model="state.detailForm.carbonCreditAmount" />
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { getConfig } from '@/api/buildCarbon/neutral.js';
import { storeToRefs } from 'pinia';
import appStore from '@/store/index.js';

const { globalState } = storeToRefs(appStore.global);

const init = {
  year: "",
  carbonCreditAmount: "",
};
const rules = {
  year: { required: true, message: "请选择年份", trigger: "change" },
  carbonCreditAmount: { required: true, message: "请输入碳信用抵消", trigger: "change" },
};
const props = defineProps({
  initData: {
    type: Object,
  },
  curYear: {
    type: String,
    default: 2024,
  }
});

defineExpose({
  validate: () => {
    return formRef.value
      .validate()
      .then(() => {
        return {
          ...state.detailForm,
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

const loadData = async () => {
  const res = await getConfig({ projectId: globalState.value.projectId, year: 2024 });
  console.log(`res`, res);
  state.detailForm.carbonCreditAmount = res?.data?.carbonCreditAmount || 0;
}

onMounted(async () => {
  state.detailForm.year = String(props.curYear);
  await loadData();
});

watch(
  () => props.curYear,
   async (year) => {
    state.detailForm.year = String(year);
    await loadData();
  }
);

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
