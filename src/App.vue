<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-19 16:52:42
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-19 19:43:29
 * @Description: 
-->
<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>
<script lang="ts" setup name="App">
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
</script>
