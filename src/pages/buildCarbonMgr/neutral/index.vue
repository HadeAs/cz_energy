<!--
 * @Author: ymZhang
 * @Date: 2024-01-11 15:22:11
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-13 18:39:19
 * @Description: 
-->
<template>
  <MainTabContainer :tabData="tabData" :defaultTab="defaultTab" />
</template>
<script setup name="BuildCarbonMgr">
import Calculate from "./components/calculate.vue";
import PeakProcess from "./components/peakProcess.vue";
import NeutralProcess from "./components/neutralProcess.vue";
import MainTabContainer from "@/components/MainTabContainer.vue";

const defaultTab = "calculate";
const tabData = [
  {
    label: "碳中和计算",
    name: "calculate",
    component: Calculate,
  },
  {
    label: "碳达峰进程",
    name: "peakProcess",
    component: PeakProcess,
  },
  {
    label: "碳中和进程",
    name: "neutralProgress",
    component: NeutralProcess,
  },
];
</script>
