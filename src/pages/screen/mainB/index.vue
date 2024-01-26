<!--
 * @Author: ymZhang
 * @Date: 2023-12-23 19:10:40
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-26 12:57:05
 * @Description: 
-->
<template>
  <div class="cs-left-wrapper">
    <Back @search="handleSearch" />
    <Summary :project-id="state.projectId" />
    <Measure :project-id="state.projectId" />
    <Analyse :project-id="state.projectId" />
  </div>
  <div class="cs-center-wrapper">
    <Trend :project-id="state.projectId" />
  </div>
  <div class="cs-right-wrapper">
    <Warning :project-id="state.projectId" />
    <List :project-id="state.projectId" />
    <Manage :project-id="state.projectId" />
  </div>
</template>
<script setup name="MainB">
import { reactive } from "vue";
import { storeToRefs } from "pinia";
import appStore from "@/store";
import {
  Back,
  Summary,
  Measure,
  Analyse,
  Trend,
  Warning,
  List,
  Manage,
} from "./components";

const emits = defineEmits(["refresh"]);
const { globalState } = storeToRefs(appStore.global);
const state = reactive({
  projectId: globalState.value.projectId,
});
const handleSearch = (projectId) => {
  state.projectId = projectId;
  appStore.global.changeName(projectId);
  emits("refresh", projectId);
};
// emits("refresh", state.projectId);
</script>
<style lang="scss">
.cs-right-tab {
  list-style: none;
  padding: 0;
  display: flex;
}

.cs-right-tab li {
  height: 28px;
  line-height: 26px;
  border-bottom: 2px solid transparent;
  color: #7a7886;
  text-align: center;
  cursor: pointer;
}

.cs-right-tab li.active {
  border-color: #2985f7;
  color: #fff;
  font-weight: bold;
}

.cs-right-tab li:first-child {
  width: 22%;
}

.cs-right-tab li:nth-child(2) {
  width: 28%;
}

.cs-right-tab li:nth-child(3) {
  width: 28%;
}

.cs-right-tab li:nth-child(4) {
  width: 22%;
}
</style>
<style lang="scss" scoped>
.cs-left-wrapper {
  width: 542px;
  flex-shrink: 0;
}
.cs-center-wrapper {
  flex: 1;
  margin: 0 20px;
}
.cs-right-wrapper {
  width: 526px;
  flex-shrink: 0;
}
</style>
