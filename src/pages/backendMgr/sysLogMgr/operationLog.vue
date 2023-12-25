<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-25 14:30:27
 * @Description: 
-->
<template>
  <div>
    <ProSearchContainer
      class="search"
      buttonContent="搜索"
      :form-info="searchFormCfg"
      @button-click="onSearch"
    />
    <MainContentContainer>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </MainContentContainer>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import ProSearchContainer from "@/components/ProSearchContainer.vue";
import MainContentContainer from "@/components/MainContentContainer.vue";

const searchFormCfg = [
  {
    label: "操作时间范围",
    prop: "timeRange",
    type: "datetimerange",
    value: "",
  },
  { label: "操作用户", prop: "userName", type: "input", value: "" },
];
const onSearch = (data) => {
  console.log(data);
};

const tableData = [
  {
    date: "2016-05-03",
    name: "Tom11",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom22",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom33",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom44",
    address: "No. 189, Grove St, Los Angeles",
  },
];
</script>
<style lang="scss" scoped>
.search {
  margin-bottom: 10px;
}
</style>
