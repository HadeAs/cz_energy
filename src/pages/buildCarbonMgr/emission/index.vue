<!--
 * @Author: ymZhang
 * @Date: 2024-01-11 15:20:07
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-11 19:41:38
 * @Description: 
-->
<template>
  <MainTabContainer :tabData="tabData" :defaultTab="defaultTab" />
</template>
<script setup name="BuildCarbonMgr">
import LiveData from "./components/liveData.vue";
import History from "./components/history.vue";
import SubSystem from "./components/subSystem.vue";
import MainTabContainer from "@/components/MainTabContainer.vue";
import FactorManage from "./components/factorManage.vue";

const defaultTab = "liveData";
const tabData = [
  {
    label: "实时数据",
    name: "liveData",
    component: LiveData,
  },
  {
    label: "历史数据",
    name: "history",
    component: History,
  },
  {
    label: "分系统数据",
    name: "subSystem",
    component: SubSystem,
  },
  {
    label: "碳排放因子管理",
    name: "factorManage",
    component: FactorManage,
  },
];
</script>
