<!--
 * @Author: ymZhang
 * @Date: 2024-01-13 12:17:07
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-13 18:48:11
 * @Description: 
-->
<template>
  <div class="process-container">
    <StepContainer :data="state.lcbList" :default-active="2" :type="1" @reload="loadMil" />
    <CenterContainer v-bind="state.centerConfig" @reload="loadData" />
    <el-row class="bottom-container" :gutter="10">
      <el-col :span="18">
        <ProcessChart :chartData="state.chartData" @reload="loadData" />
      </el-col>
      <el-col :span="6">
        <SnapShot />
      </el-col>
    </el-row>
  </div>
</template>
<script setup name="PeakProcess">
import StepContainer from "./stepContainer.vue";
import CenterContainer from "./centerContainer.vue";
import ProcessChart from "./processChart.vue";
import SnapShot from "./frame.vue";
import u16559 from "@/assets/img/carbon/u16559.png";
import u16557 from "@/assets/img/carbon/u16557.png";
import { onMounted, reactive, watch } from 'vue';
import { getMainData, getMilestone } from '@/api/buildCarbon/neutral.js';
import { storeToRefs } from 'pinia';
import appStore from '@/store/index.js';
import { toFixedNum } from '@/utils/index.js';

const { globalState } = storeToRefs(appStore.global);

const defaultData = {
  targetCarbonNtYearDiff: 0,
}

const getCenterConfig = (data = defaultData) => ({
  countdownTitle: "碳中和",
  countdownValue: data?.targetCarbonNtYearDiff,
  params: [
    {
      children: [
        { title: "碳中和考核时间", value: data?.targetCarbonNtYear, unit: "年", image: u16559 },
        { title: "实际碳中和时间预测", value: data?.realCarbonNtYear, unit: "年", image: u16557 },
      ],
    },
  ],
  process: Number(toFixedNum((data?.progressRate || 0) * 100, 1)),
});

const state = reactive({
  searchFormData: {
    projectId: globalState.value.projectId,
  },
  lcbList: [],
  centerConfig: {},
});

const loadMil = async () => {
  const lcbRes = await getMilestone({ type: 1, projectId: state.searchFormData.projectId });
  state.lcbList = lcbRes;
}

const loadData = async () => {
  await loadMil();
  const tdfRes = await getMainData({ projectId: state.searchFormData.projectId });
  state.centerConfig = getCenterConfig(tdfRes?.data);
  state.chartData = { targetNetCarbonList: tdfRes?.data?.targetNetCarbonList, realNetCarbonList: tdfRes?.data?.realNetCarbonList };
}

onMounted(async () => {
  await loadData();
})

watch(
    () => globalState.value.projectId,
    async (id) => {
      state.searchFormData.projectId = id;
      await loadData();
    }
);
</script>
<style lang="scss" scoped>
.bottom-container {
  flex: 1;
  margin-top: 10px;
  min-height: 300px;
  :deep() {
    .el-col:last-child {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
