<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-16 22:23:18
 * @Description: 
-->
<template>
  <MainTabContainer :tabData="tabData" :defaultTab="defaultTab" />
</template>

<script setup>
import Global from "./global.vue";
import Project from "./project.vue";
import Unit from "./unit.vue";
import Variable from "./variable.vue";
import Build from "./build.vue";
import Energy from "./energy.vue";
import MainTabContainer from "@/components/MainTabContainer.vue";

const defaultTab = "global";
const tabData = [
  {
    label: "全局配置",
    name: "global",
    component: Global,
  },
  {
    label: "项目配置",
    name: "project",
    component: Project,
  },
  {
    label: "单位管理",
    name: "unit",
    component: Unit,
    auth: "platform_unit",
  },
  // {
  //   label: "变量管理",
  //   name: "variable",
  //   component: Variable,
  //   auth: "platform_variable"
  // },
  {
    label: "建筑类型管理",
    name: "build",
    component: Build,
    auth: "platform_build",
  },
  {
    label: "用能系统分类管理",
    name: "energy",
    component: Energy,
    auth: "platform_energy",
  },
];
</script>
