<!--
 * @Author: ymZhang
 * @Date: 2023-12-21 18:17:35
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-06 18:38:10
 * @Description: 
-->
<template>
  <MainTabContainer
    :tabData="tabData"
    :defaultTab="defaultTab"
    @change="handleChange"
  >
    <template #extra>
      <el-button
        v-show="defaultTab === 'run'"
        class="recycle-btn"
        @click="gotoRecycleBin"
        v-auth="'group_recycle'"
        >回收站</el-button
      >
    </template>
  </MainTabContainer>
</template>
<script setup name="DeviceGroupMgr">
import { ref } from "vue";
import { useRouter } from "vue-router";
import MainTabContainer from "@/components/MainTabContainer.vue";
import Group from "./components/group/index.vue";
import Run from "./components/run/index.vue";

const defaultTab = ref("group");
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

const handleChange = (name) => {
  defaultTab.value = name;
};
</script>
<style lang="scss" scoped>
.recycle-btn {
  position: absolute;
  right: 24px;
  top: 3px;
}
</style>
