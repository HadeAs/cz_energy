<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-21 11:50:22
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-21 21:00:52
 * @Description: 
-->
<template>
  <div class="pro-table-container">
    <div class="tool-bar">
      <slot name="toolbar"></slot>
    </div>
    <el-table
      :data="datasource"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="!!multiple" type="selection" width="55" />
      <el-table-column v-for="item in column" v-bind="item" />
      <el-table-column
        v-if="$slots.operation"
        fixed="right"
        label="操作"
        width="250"
      >
        <template #default="scope">
          <slot name="operation" v-bind="scope"></slot>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty />
      </template>
    </el-table>
    <el-pagination
      background
      :total="pageInfo.total"
      :page-sizes="pageInfo.pageSizes"
      layout="total, sizes, prev, pager, next"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      @change="handlePageChange"
      @prev-click="handlePrevClick"
      @next-click="handleNextClick"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";

const props = defineProps({
  column: { type: Array, default: [] },
  datasource: { type: Array, default: [] },
  multiple: { type: Boolean, default: false },
  pageInfo: {
    type: Object,
    default: {
      total: 0,
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 15, 20, 50],
    },
  },
});

const emits = defineEmits([
  "selection-change",
  "page-change",
  "page-prev-click",
  "page-next-click",
]);

const pageSize = ref(props.pageInfo.pageSize);
const currentPage = ref(props.pageInfo.currentPage);

const handleSelectionChange = (selection) => {
  emits("selection-change", selection);
};

const handlePageChange = (currentPage, pageSize) => {
  emits("page-change", currentPage, pageSize);
};
const handlePrevClick = (val) => {
  emits("page-prev-click", val);
};
const handleNextClick = (val) => {
  emits("page-next-click", val);
};
</script>
<style lang="scss" scoped>
.pro-table-container {
  .tool-bar {
    margin-bottom: 15px;
    :deep() {
      .el-input {
        width: 250px;
        float: right;
      }
    }
  }
  :deep() {
    .el-pagination {
      margin-top: 20px;
      justify-content: flex-end;
    }
  }
}
</style>
