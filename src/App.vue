<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-19 16:52:42
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-08 15:19:03
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
