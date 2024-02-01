<!--
 * @Author: ymZhang
 * @Date: 2024-01-13 12:17:07
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-13 18:32:46
 * @Description: 
-->
<template>
  <div class="process-container">
    <StepContainer :data="state.lcbList" :default-active="1" :type="0" @reload="loadMil" />
    <CenterContainer v-bind="state.centerConfig" @reload="loadData" />
    <el-row class="bottom-container" :gutter="10">
      <el-col :span="18">
        <ProcessChart :chartData="state.chartData" @reload="loadData" />
      </el-col>
      <el-col :span="6">
        <Alarm :alarms="state.alarms" />
        <Suggestion :suggestions="suggestions" />
      </el-col>
    </el-row>
  </div>
</template>
<script setup name="PeakProcess">
import { onMounted, reactive, watch } from 'vue';
import StepContainer from "./stepContainer.vue";
import CenterContainer from "./centerContainer.vue";
import ProcessChart from "./processChart.vue";
import Alarm from "./alarm.vue";
import Suggestion from "./suggestion.vue";
import u16559 from "@/assets/img/carbon/u16559.png";
import u16557 from "@/assets/img/carbon/u16557.png";
import u17509 from "@/assets/img/carbon/u17509.png";
import u17513 from "@/assets/img/carbon/u17513.png";
import { getMainData, getMilestone } from '@/api/buildCarbon/neutral.js';
import { storeToRefs } from 'pinia';
import appStore from '@/store/index.js';
import { toFixedNum } from '@/utils';

const { globalState } = storeToRefs(appStore.global);

// "targetCarbonTopTarget": 50, //碳达峰考核目标（t）
//     "progressRate": 0.30442963910944576, //碳达峰/中和完成进度
//     "realCarbonTopYear": 2051, //碳达峰年份预测值
//     "currentNetCarbonSummary": 35.08101907999992, //CO2净排放总量（t）
//     "targetCarbonNtYearDiff": 13120, //碳中和倒计时

const getCenterConfig = (data, projectId) => ({
  countdownTitle: "碳达峰",
  countdownValue: data?.targetCarbonTopYearDiff || 0,
  params: [
    {
      children: [
        {
          title: "碳达峰考核时间",
          value: data?.targetCarbonTopYear || 0,
          unit: "年",
          image: u16559,
        },
        {
          title: "实际碳达峰时间预测",
          value: projectId === 3 ? 2029 : data?.realCarbonTopYear || 0,
          unit: "年",
          image: u16557,
        },
      ],
    },
    {
      children: [
        {
          title: "CO₂排放总量",
          value: projectId === 3 ? 260 : toFixedNum(data?.currentNetCarbonSummary || 0, 4),
          unit: "t",
          image: u17509,
        },
        {
          title: "碳达峰考核目标",
          value: projectId === 3 ? 1560 : data?.targetCarbonTopTarget || 0,
          unit: "t",
          image: u17513,
        },
      ],
    },
  ],
  process: projectId === 3 ? 62 : Number(toFixedNum((data?.progressRate || 0) * 100, 1)),
});

const suggestions = [
  "分析各系统设备用能情况，检索异常用能设备。",
  // "XXXXXXXXXXXXXXXXXXXXXXX，检索异常用能设备。",
];

const state = reactive({
  searchFormData: {
    projectId: globalState.value.projectId,
  },
  lcbList: [],
  centerConfig: {},
  alarms: [],
});

const loadMil = async () => {
  const lcbRes = await getMilestone({ type: 0, projectId: state.searchFormData.projectId });
  state.lcbList = lcbRes;
}

const getMockData = () => {
  return {
    targetNetCarbonList: [
      { createTime: '2023', data: 156 },
      { createTime: '2024', data: 168 },
      { createTime: '2025', data: 179 },
      { createTime: '2026', data: 177 },
      { createTime: '2027', data: 188 },
      { createTime: '2028', data: 190 },
      { createTime: '2029', data: 193 },
      { createTime: '2030', data: 195 },
    ],
    realNetCarbonList: [
      { createTime: '2023', data: 147 },
      { createTime: '2024', data: 150 },
      { createTime: '2025', data: 170 },
      { createTime: '2026', data: 169 },
      { createTime: '2027', data: 175 },
      { createTime: '2028', data: 195 },
      { createTime: '2029', data: 190 },
      { createTime: '2030', data: 199 },
    ],
  };
}

const loadData = async () => {
  await loadMil();
  const tdfRes = await getMainData({ projectId: state.searchFormData.projectId });
  state.centerConfig = getCenterConfig(tdfRes?.data, state.searchFormData.projectId);
  state.alarms = state.searchFormData.projectId === 3
      ? [{ id: 1, real: 147, target: 156, year: 2023 }]
      : tdfRes?.data?.targetAlarmList.map(i => ({ id: i, ...i })) || [];
  state.chartData = state.searchFormData.projectId === 3
      ? getMockData()
      : { targetNetCarbonList: tdfRes?.data?.targetNetCarbonList, realNetCarbonList: tdfRes?.data?.realNetCarbonList };
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
