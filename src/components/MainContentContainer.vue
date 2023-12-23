<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 14:06:08
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-23 16:50:19
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
    padding: 15px var(--el-main-padding) 0px;
  }
  background-color: #ffffff;
  border-radius: 5px;
  // min-height: 220px;
  // margin-bottom: 10px;
}
</style>
