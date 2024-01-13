<!--
 * @Author: ymZhang
 * @Date: 2024-01-13 12:17:07
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-13 18:32:46
 * @Description: 
-->
<template>
  <div class="process-container">
    <StepContainer :data="TEST_STEP_DATA" :default-active="1" />
    <CenterContainer v-bind="centerConfig" />
    <el-row class="bottom-container" :gutter="10">
      <el-col :span="18">
        <ProcessChart />
      </el-col>
      <el-col :span="6">
        <Alarm :alarms="alarms" />
        <Suggestion :suggestions="suggestions" />
      </el-col>
    </el-row>
  </div>
</template>
<script setup name="PeakProcess">
import StepContainer from "./stepContainer.vue";
import CenterContainer from "./centerContainer.vue";
import ProcessChart from "./processChart.vue";
import Alarm from "./alarm.vue";
import Suggestion from "./suggestion.vue";
import u16559 from "@/assets/img/carbon/u16559.png";
import u16557 from "@/assets/img/carbon/u16557.png";
import u17509 from "@/assets/img/carbon/u17509.png";
import u17513 from "@/assets/img/carbon/u17513.png";

const TEST_STEP_DATA = [
  { title: "2023", content: "里程碑意义" },
  { title: "2025", content: "净碳排量增长率低于10%" },
  { title: "2027", content: "低于10%" },
  { title: "2029", content: "2029" },
  { title: "2030", content: "实现碳达峰" },
];
const centerConfig = {
  countdownTitle: "碳达峰",
  countdownValue: 1542,
  params: [
    {
      children: [
        { title: "碳达峰考核时间", value: 2026, unit: "年", image: u16559 },
        { title: "实际碳达峰时间预测", value: 2030, unit: "年", image: u16557 },
      ],
    },
    {
      children: [
        { title: "CO₂排放总量", value: 134.6, unit: "万t", image: u17509 },
        { title: "碳达峰考核目标", value: 200, unit: "万t", image: u17513 },
      ],
    },
  ],
  process: 68,
};
const alarms = [
  {
    id: 0,
    date: "2023/8",
    target: 30,
    actual: 100,
  },
  {
    id: 1,
    date: "2023/3",
    target: 20,
    actual: 60,
  },
];

const suggestions = [
  "分析各系统设备用能情况，检索异常用能设备。",
  // "XXXXXXXXXXXXXXXXXXXXXXX，检索异常用能设备。",
];
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
