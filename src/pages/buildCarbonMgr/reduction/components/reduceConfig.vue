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
    <el-form-item label="投资单价（万元）" required prop="investCost">
      <el-input-number placeholder="请输入" v-model="state.priceForm.investCost" />
    </el-form-item>
    <el-form-item label="投资数量（项目从起始时间至今的总投资数量）" required prop="investAmount">
      <el-input-number placeholder="请输入" v-model="state.priceForm.investAmount" />
    </el-form-item>
    <el-form-item label="碳单价(万元/t)" required prop="carbonCost">
      <el-input-number placeholder="请输入" v-model="state.priceForm.carbonCost" />
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { fetchOneProject, queryProjectCost } from '@/api/backstageMng/pmMng.js';

const init = {
  investCost: 0,
  investAmount: 0,
  carbonCost: 0,
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
const props = defineProps({
  initData: {
    type: Object,
  },
});
const formRef = ref();
const state = reactive({ priceForm: {} });

onMounted(async () => {
  const { id, investCost, investAmount, carbonCost } = props.initData;
  state.priceForm = { carbonReduceStatisticsId: id, investCost, investAmount, carbonCost };
});

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
