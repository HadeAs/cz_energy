<!--
 * @Author: ymZhang
 * @Date: 2023-12-21 18:17:35
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-27 14:06:21
 * @Description: 
-->
<template>
  <MainTabContainer :tabData="tabData" :defaultTab="defaultTab">
    <template #extra>
      <el-button
        class="recycle-btn"
        @click="gotoRecycleBin"
        v-auth="'group_recycle'"
        >回收站</el-button
      >
    </template>
  </MainTabContainer>
</template>
<script setup name="DeviceGroupMgr">
import { useRouter } from "vue-router";
import MainTabContainer from "@/components/MainTabContainer.vue";
import Group from "./components/group/index.vue";
import Run from "./components/run/index.vue";

const defaultTab = "group";
const router = useRouter();
const tabData = [
  {
    label: "设备组管理",
    name: "group",
    component: Group,
  },
  {
    label: "设备运行",
    name: "run",
    component: Run,
  },
];
const gotoRecycleBin = () => {
  const path = router.resolve({
    name: "recycleBin",
  }).href;
  window.open(path, "_blank");
};
</script>
<style lang="scss" scoped>
.recycle-btn {
  position: absolute;
  right: 24px;
  top: 3px;
}
</style>
