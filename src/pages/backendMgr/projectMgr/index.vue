<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-20 20:06:25
 * @Description: 
-->
<template>
  <MainContentContainer>
    <div class="tool-bar">
      <el-button type="primary">新增</el-button>
      <el-button>批量删除</el-button>
      <el-input
        clearable
        v-model="projName"
        placeholder="项目名称"
        :suffix-icon="Search"
      />
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </MainContentContainer>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import MainContentContainer from "@/components/MainContentContainer.vue";

const projName = ref("");
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
</script>
<style lang="scss" scoped>
.tool-bar {
  margin-bottom: 15px;
  :deep() {
    .el-input {
      width: 250px;
      float: right;
    }
  }
}
</style>
