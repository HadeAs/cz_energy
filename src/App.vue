<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-19 16:52:42
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-05 23:31:03
 * @Description: 
-->
<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>
<script lang="ts" setup name="App">
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import { checkToken, logout } from "@/api/login";
// logout();
// checkToken();
</script>
