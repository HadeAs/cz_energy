<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-19 16:52:42
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-07 12:15:23
 * @Description: 
-->
<template>
  <el-config-provider :locale="zhCn" v-if="loadSuccess">
    <router-view />
  </el-config-provider>
</template>
<script lang="ts" setup name="App">
import { ref } from "vue";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import appStore from "@/store";

const loadSuccess = ref(false);
const init = async () => {
  // 获取项目列表
  appStore.global.getProList();
  // 获取角色列表
  appStore.global.getRoleList();
  loadSuccess.value = true;
};
init();
</script>
