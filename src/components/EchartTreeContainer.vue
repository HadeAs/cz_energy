<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-22 11:27:16
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-22 13:28:53
 * @Description: 
-->
<template>
  <div class="echart-tree-container">
    <div class="left">
      <div class="title">数据对比</div>
      <slot name="left"></slot>
    </div>
    <div class="right">
      <div class="title">选择变量</div>
      <slot name="right"></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.echart-tree-container {
  background-color: #ffffff;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  .title {
    padding: 15px 20px;
    font-size: 16px;
    font-weight: 700;
  }
  .left {
    width: 80%;
    border-right: 1px solid #dfe4ed;
    padding: 0px 10px;
  }
  .right {
    width: 20%;
    padding: 0px 10px;
  }
}
</style>
