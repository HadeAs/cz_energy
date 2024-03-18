<!--
 * @Author: ymZhang
 * @Date: 2024-01-11 15:20:47
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-11 22:02:28
 * @Description: 
-->
<template>
  <MainTabContainer :tabData="tabData" :defaultTab="defaultTab" />
</template>
<script setup name="BuildCarbonMgr">
import Calculate from "./components/calculate.vue";
import Income from "./components/income.vue";
import MainTabContainer from "@/components/MainTabContainer.vue";

const defaultTab = "calculate";
const tabData = [
  {
    label: "碳减排计算",
    name: "calculate",
    component: Calculate,
  },
  {
    label: "碳减排效益分析",
    name: "rate",
    component: Income,
  },
];
</script>
