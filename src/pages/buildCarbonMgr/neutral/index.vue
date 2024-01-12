<!--
 * @Author: ymZhang
 * @Date: 2024-01-11 15:22:11
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-12 14:19:21
 * @Description: 
-->
<template>
  <MainTabContainer :tabData="tabData" :defaultTab="defaultTab" />
</template>
<script setup name="BuildCarbonMgr">
import Calculate from "./components/calculate.vue";
// import Rate from "./components/rate.vue";
import MainTabContainer from "@/components/MainTabContainer.vue";

const defaultTab = "calculate";
const tabData = [
  {
    label: "碳中和计算",
    name: "calculate",
    component: Calculate,
  },
  // {
  //   label: "碳达峰进程",
  //   name: "rate",
  //   component: Rate,
  // },
  // {
  //   label: "碳中和进程",
  //   name: "neutralProgress",
  //   component: Rate,
  // },
];
</script>
