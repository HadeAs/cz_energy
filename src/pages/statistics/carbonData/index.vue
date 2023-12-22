<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-21 21:12:13
 * @Description: 
-->
<template>
  <MainTabContainer :tabData="tabData" :defaultTab="defaultTab" />
</template>

<script setup>
import Actual from "./actual.vue";
import History from "./history.vue";
import Device from "./device.vue";
import MainTabContainer from "@/components/MainTabContainer.vue";

const defaultTab = "actual";
const tabData = [
  {
    label: "实时数据",
    name: "actual",
    component: Actual,
  },
  {
    label: "历史数据",
    name: "history",
    component: History,
  },
  {
    label: "单类设备数据",
    name: "device",
    component: Device,
  },
];
</script>
