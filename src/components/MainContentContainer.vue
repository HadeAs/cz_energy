<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 14:06:08
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-20 15:59:35
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
  }
  &.search {
    padding: var(--el-main-padding) var(--el-main-padding) 0px;
  }
  background-color: #ffffff;
  border-radius: 5px;
  // min-height: 220px;
  margin-bottom: 10px;
}
</style>
