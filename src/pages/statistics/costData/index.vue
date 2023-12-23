<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-23 14:34:25
 * @Description: 
-->
<template>
  <MainTabContainer :tabData="tabData" :defaultTab="defaultTab" />
</template>

<script setup>
import Compare from "./compare.vue";
import Detail from "./detail.vue";
import MainTabContainer from "@/components/MainTabContainer.vue";

const defaultTab = "compare";
const tabData = [
  {
    label: "费用对比",
    name: "compare",
    component: Compare,
  },
  {
    label: "费用明细",
    name: "detail",
    component: Detail,
  },
];
</script>
