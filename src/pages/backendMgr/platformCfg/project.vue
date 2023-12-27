<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-27 10:55:37
 * @Description: 
-->
<template>
  <div class="project-cfg-container">
    <div class="left">
      <el-scrollbar>
        <div class="title">项目目录</div>
        <el-menu>
          <el-menu-item
            v-for="v in projects"
            :index="v.value"
            @click="handleMenuClick(v)"
            >{{ v.label }}</el-menu-item
          >
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="right">
      <el-scrollbar>
        <div></div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup>
const projects = [
  { label: "项目001", value: "项目001" },
  { label: "项目002", value: "项目002" },
  { label: "项目003", value: "项目003" },
  { label: "项目004", value: "项目004" },
  { label: "项目005", value: "项目005" },
  { label: "项目006", value: "项目006" },
  { label: "项目007", value: "项目007" },
  { label: "项目008", value: "项目008" },
];

const handleMenuClick = (data) => {
  console.log(data);
};
</script>
<style lang="scss" scoped>
.project-cfg-container {
  display: flex;
  background-color: #ffffff;
  border-radius: 5px;
  .left {
    width: 20%;
    height: 100%;
    overflow: auto;
    border-right: 1px solid #dfe4ed;
    .title {
      font-size: 16px;
      font-weight: bold;
      padding: 10px 20px;
    }
  }
  .right {
    width: 80%;
    height: 100%;
    padding: 0px 10px;
    overflow: auto;
  }
  :deep() {
    .el-menu {
      border-right: none;
      .el-menu-item {
        height: 42px;
        line-height: 42px;
        &.is-active {
          color: #000000;
          background-color: rgba(233, 243, 254, 1);
        }
      }
    }
  }
}
</style>
