<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 14:06:08
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-28 12:51:04
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
  // min-height: 220px;
  // margin-bottom: 10px;
}
</style>
