<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-20 15:36:16
 * @Description: 
-->
<template>
  <div class="main-tab-container">
    <el-tabs v-model="activeName">
      <el-tab-pane
        v-for="item in tabData"
        :label="item.label"
        :name="item.name"
      >
        <component :is="item.component"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["tabData", "defaultTab"]);
const activeName = ref(props.defaultTab);
</script>
<style lang="scss" scoped>
.main-tab-container {
  :deep() {
    .el-tabs__header {
      background-color: #ffffff;
      padding: 0px 20px 10px;
      border-radius: 5px 5px 0px 0px;
      .el-tabs__nav-wrap {
        margin-bottom: -12px;
        .el-tabs__active-bar {
          background-color: rgb(43, 62, 177);
          height: 3px;
        }
        .el-tabs__item {
          font-style: normal;
          font-size: 16px;
          line-height: 56px;
          font-weight: 400;
          &.is-active {
            color: #2b3eb1;
          }
        }
      }
    }
  }
}
</style>
