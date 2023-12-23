<template>
  <div class="cs-box-content content">
    <div class="cs-header-content">
      <img src="@/assets/img/screen/mainB/u5.png">设备能耗列表
    </div>
    <ul class="cs-table-wrap cs-right-table">
      <li class="cs-table-header">
        <span>设备名称</span>
        <span>能源消耗量（kWh）</span>
        <span>是否重点用能</span>
      </li>
      <li class="cs-table-info">
        <span> 螺杆式水源热泵机组1</span>
        <span>502,200</span>
        <span><el-icon class="aidicon-check-circle-outline"><CircleCheck /></el-icon></span>
      </li>
      <li class="cs-table-info">
        <span>空气能热水机组1</span>
        <span>125,475.4</span>
        <span><el-icon class="aidicon-check-circle-outline"><CircleCheck /></el-icon></span>
      </li>
      <li class="cs-table-info">
        <span>空气能热水机组2</span>
        <span>131,284.8</span>
        <span><el-icon class="aidicon-check-circle-outline"><CircleCheck /></el-icon></span>
      </li>
      <li class="cs-table-info">
        <span>空气能热水机组3</span>
        <span>103,731.2</span>
        <span><el-icon class="aidicon-check-circle-outline"><CircleCheck /></el-icon></span>
      </li>
      <li class="cs-table-info">
        <span>曳引驱动乘客电梯1</span>
        <span>114,048</span>
        <span><el-icon class="aidicon-check-circle-outline"><CircleCheck /></el-icon></span>
      </li>
    </ul>
  </div>
</template>
<script setup name="List">
import { CircleCheck } from "@element-plus/icons-vue";
</script>
<style lang="scss" scoped>
.content {
  height: 314px;

  .cs-table-wrap {
    list-style: none;
    padding: 0;
    margin-top: 12px;
  }

  .cs-table-wrap .cs-table-header {
    height: 40px;
    line-height: 38px;
    background-color: #2d2837;
    border-bottom: 1px solid #485468;
    font-weight: bold;
    color: #7A7886;
    display: flex;
  }

  .cs-table-wrap .cs-table-info {
    height: 40px;
    line-height: 38px;
    border-bottom: 1px solid #485468;
    color: #A9C5E7;
    display: flex;
  }

  .cs-table-wrap .cs-table-info:hover {
    background-color: #2d2837;
  }

  .cs-table-wrap .cs-table-info i {
    font-size: 18px;
    position: relative;
    top: 4px;
  }

  .cs-table-wrap .cs-table-info .aidicon-close-circle-outline {
    color: #FF6600;
  }

  .cs-table-wrap .cs-table-info .aidicon-check-circle-outline {
    color: #63FB96;
  }

  .cs-table-wrap span {
    padding: 0 16px;
  }

  .cs-table-wrap span:first-child {
    width: 35%;
  }

  .cs-table-wrap span:nth-child(2) {
    width: 40%;
  }

  .cs-table-wrap span:last-child {
    width: 25%;
  }
}
</style>