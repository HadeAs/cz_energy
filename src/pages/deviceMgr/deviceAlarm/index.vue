<!--
 * @Author: ymZhang
 * @Date: 2023-12-21 18:17:35
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-26 16:05:55
 * @Description: 
-->
<template>
  <MainTabContainer :tabData="tabData" :defaultTab="defaultTab" />
</template>
<script setup name="DeviceAlarm">
import Live from "./components/live/index.vue";
import Run from "./components/run/index.vue";

const defaultTab = "live";
const tabData = [
  {
    label: "实时报警",
    name: "live",
    component: Live,
  },
  {
    label: "运行报警",
    name: "run",
    component: Run,
  },
];
</script>
