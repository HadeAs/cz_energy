<!--
 * @Author: ymZhang
 * @Date: 2023-12-24 18:06:45
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-24 21:06:09
 * @Description: 
-->
<template>
  <BoxContainer title="该型号设备列表（15）">
    <ProTable
      :column="column"
      :pageInfo="state.pageInfo"
      :datasource="state.dataSource"
      @page-change="pageChange"
    >
      <template #operation="scope">
        <a class="table-operator-btn handle" @click="viewDetail(scope.row)"
          >详情</a
        >
        <span class="table-operator-btn handle" @click="editRow(scope.row)"
          >设备保养</span
        >
      </template>
    </ProTable>
  </BoxContainer>
</template>
<script setup name="List1">
import { reactive } from "vue";

const state = reactive({
  pageInfo: {
    total: 30,
    currentPage: 1,
    pageSize: 5,
    pageSizes: [5, 10, 15, 30, 50],
  },
  dataSource: [],
});

const column = [
  {
    prop: "project",
    label: "设备组名称",
    width: 110,
  },
];

const pageChange = (currentPage, pageSize) => {
  console.log(currentPage, pageSize);
};
</script>
