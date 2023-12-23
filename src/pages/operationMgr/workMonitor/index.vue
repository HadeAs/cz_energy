<template>
  <MainTabContainer :tabData="tabData" :defaultTab="defaultTab" />
</template>
<script setup name="WorkMonitor">
import Power from "./components/power.vue";
// import Water from "./components/water.vue";
// import Anomalous from "./components/anomalous.vue";
import MainTabContainer from "@/components/MainTabContainer.vue";

const defaultTab = "power";
const tabData = [
  {
    label: "配电监测",
    name: "power",
    component: Power,
  },
  // {
  //   label: "用水监测",
  //   name: "water",
  //   component: Water,
  // },
  // {
  //   label: "用水异常",
  //   name: "anomalous",
  //   component: Anomalous,
  // },
];
</script>
