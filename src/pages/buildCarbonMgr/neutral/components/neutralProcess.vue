<!--
 * @Author: ymZhang
 * @Date: 2024-01-13 12:17:07
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-13 18:48:11
 * @Description: 
-->
<template>
  <div class="process-container">
    <StepContainer :data="TEST_STEP_DATA" :default-active="2" />
    <CenterContainer v-bind="centerConfig" />
    <el-row class="bottom-container" :gutter="10">
      <el-col :span="18">
        <ProcessChart />
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

const TEST_STEP_DATA = [
  { title: "2023", content: "里程碑意义" },
  { title: "2030", content: "碳达峰" },
  { title: "2035", content: "净碳排低于10%" },
  { title: "2040", content: "" },
  { title: "2045", content: "净碳排低于10%" },
  { title: "2050", content: "" },
  { title: "2055", content: "净排放低于10%" },
  { title: "2060", content: "实现碳中和" },
];
const centerConfig = {
  countdownTitle: "碳中和",
  countdownValue: 2816,
  params: [
    {
      children: [
        { title: "碳中和考核时间", value: 2026, unit: "年", image: u16559 },
        { title: "实际碳中和时间预测", value: 2030, unit: "年", image: u16557 },
      ],
    },
  ],
  process: 33,
};
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
