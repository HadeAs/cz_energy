<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-20 16:31:48
 * @Description: 
-->
<template>
  <MainContentContainer class="search">
    <el-form :inline="true" :model="formData">
      <el-form-item label="报警时间范围">
        <el-date-picker
          v-model="formData.timeRange"
          type="datetimerange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="YYYY-MM-DD hh:mm:ss"
        />
      </el-form-item>
      <el-form-item label="设备名称">
        <el-input v-model="formData.device" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
      </el-form-item>
    </el-form>
  </MainContentContainer>
  <MainContentContainer>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </MainContentContainer>
</template>

<script setup>
import { reactive } from "vue";
import MainContentContainer from "@/components/MainContentContainer.vue";

const formData = reactive({
  device: "",
  timeRange: "",
});

const onSearch = () => {
  console.log(formData);
};

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
