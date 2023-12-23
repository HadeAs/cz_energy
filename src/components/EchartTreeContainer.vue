<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-22 11:27:16
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-23 16:39:07
 * @Description: 
-->
<template>
  <div class="echart-tree-container">
    <div class="left">
      <div class="left-title">
        <span>数据对比</span>
        <el-tabs
          :style="{ visibility: showSwitch ? 'initial' : 'hidden' }"
          v-model="activeTab"
          @tab-change="handleTabChange"
        >
          <el-tab-pane label="时能耗" name="hour"></el-tab-pane>
          <el-tab-pane label="天能耗" name="day"></el-tab-pane>
          <el-tab-pane label="月能耗" name="month"></el-tab-pane>
          <el-tab-pane label="年能耗" name="year"></el-tab-pane>
        </el-tabs>
      </div>
      <slot name="left"></slot>
    </div>
    <div class="right">
      <div class="right-title">选择变量</div>
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

defineProps({
  showSwitch: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["type-change"]);

const activeTab = ref("hour");

const handleTabChange = (val) => {
  emits("type-change", val);
};
</script>
<style lang="scss" scoped>
.echart-tree-container {
  background-color: #ffffff;
  border-radius: 5px;
  // margin-bottom: 10px;
  display: flex;
  .left-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px 15px;
    span {
      font-size: 16px;
      font-weight: 700;
      color: #000;
    }
  }
  .right-title {
    padding: 10px;
    font-size: 16px;
    font-weight: 700;
    color: #000;
  }
  .left {
    width: 80%;
    border-right: 1px solid #dfe4ed;
    padding: 0px 10px;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .right {
    width: 20%;
    padding: 0px 10px;
    height: 100%;
    overflow: auto;
  }
}
</style>
