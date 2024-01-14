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
    <el-form-item v-for="item in state.baseData" :label="`项目${item?.energyStatisticsName}费用（元）`" required :prop="String(item?.energyStatisticsId)">
      <el-input-number placeholder="请输入" v-model="state.priceForm[item?.energyStatisticsId]" />
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { fetchOneProject, queryProjectCost } from '@/api/backstageMng/pmMng.js';

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
        return Object.keys(state.priceForm).map(i => ({ energyStatisticsId: typeof i === 'string' ? Number(i) : i, cost: state.priceForm?.[i] }));
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
const state = reactive({ priceForm: {}, baseData: [] });

onMounted(async () => {
  const res = await queryProjectCost(props.initData);
  state.baseData = res;
  state.priceForm = res.reduce((last, next) => {
    return Object.assign(last, {
      [next.energyStatisticsId]: next.cost,
    });
  }, {})
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
