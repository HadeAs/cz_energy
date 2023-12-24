<!--
 * @Author: ymZhang
 * @Date: 2023-12-23 19:10:40
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-23 23:06:12
 * @Description: 
-->
<template>
  <MainTabContainer :tabData="tabData" :defaultTab="defaultTab" />
</template>
<script setup name="WorkMonitor">
import Power from "./components/power.vue";
import Water from "./components/water.vue";
import Anomalous from "./components/anomalous.vue";
import MainTabContainer from "@/components/MainTabContainer.vue";

const defaultTab = "power";
const tabData = [
  {
    label: "配电监测",
    name: "power",
    component: Power,
  },
  {
    label: "用水监测",
    name: "water",
    component: Water,
  },
  {
    label: "用水异常",
    name: "anomalous",
    component: Anomalous,
  },
];
</script>
