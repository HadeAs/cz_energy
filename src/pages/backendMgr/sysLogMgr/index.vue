<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-20 15:31:46
 * @Description: 
-->
<template>
  <MainTabContainer :tabData="tabData" :defaultTab="defaultTab" />
</template>

<script setup>
import LoginLog from "./loginLog.vue";
import AlarmLog from "./alarmLog.vue";
import OperationLog from "./operationLog.vue";
import MainTabContainer from "@/components/MainTabContainer.vue";

const defaultTab = "login";
const tabData = [
  {
    label: "登陆日志",
    name: "login",
    component: LoginLog,
  },
  {
    label: "用户操作日志",
    name: "operation",
    component: OperationLog,
  },
  {
    label: "报警信息日志",
    name: "alarm",
    component: AlarmLog,
  },
];
</script>
