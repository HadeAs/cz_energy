<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-16 22:21:18
 * @Description: 
-->
<template>
  <div class="main-tab-container">
    <el-tabs v-model="activeName" @tab-change="handleChange">
      <el-tab-pane
        v-for="item in tabData"
        :label="item.label"
        :name="item.name"
        v-auth="item.auth"
      >
        <el-scrollbar style="height: calc(100vh - 123px)">
          <component
            class="tab-content-container"
            v-if="activeName === item.name"
            :is="item.component"
          ></component>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
    <slot name="extra"></slot>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emits = defineEmits(["change"]);
const props = defineProps(["tabData", "defaultTab"]);
const activeName = ref(props.defaultTab);
const handleChange = (name) => {
  emits("change", name);
};
</script>
<style lang="scss" scoped>
.main-tab-container {
  position: relative;
  .tab-content-container {
    overflow: auto;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
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
