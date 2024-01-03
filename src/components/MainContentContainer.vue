<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 14:06:08
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2024-01-03 10:22:11
 * @Description: 
-->
<template>
  <div class="main-content-container">
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.main-content-container {
  &:not(.search) {
    padding: var(--el-main-padding);
    height: 100%;
  }
  &.search {
    padding: 15px var(--el-main-padding) 0px;
  }
  background-color: #ffffff;
  border-radius: 5px;
  overflow: auto;
}
</style>
