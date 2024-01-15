<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-21 11:50:22
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-06 13:52:53
 * @Description: 
-->
<template>
  <div class="pro-table-container">
    <div class="tool-bar">
      <slot name="toolbar"></slot>
    </div>
    <el-table
      stripe
      row-key="id"
      :data="datasource"
      style="width: 100%"
      v-bind="$attrs"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="!!multiple" type="selection" width="35" />
      <el-table-column
        v-for="(item, index) in column"
        :key="index"
        show-overflow-tooltip
        v-bind="item"
        v-slot="scope"
      >
        <!-- 自定义render -->
        <component
          :is="item.render"
          :row="scope.row"
          v-if="item.render"
        ></component>
      </el-table-column>
      <el-table-column
        v-if="$slots.operation"
        fixed="right"
        label="操作"
        width="250"
        v-bind="$attrs"
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
        v-if="props.hasPagination"
      class="pagination"
      background
      :total="state.pageConfig.total"
      :page-sizes="state.pageConfig.pageSizes"
      layout="total, sizes, prev, pager, next"
      v-model:current-page="state.pageConfig.currentPage"
      v-model:page-size="state.pageConfig.pageSize"
      @change="handlePageChange"
    />
  </div>
</template>
<script setup>
import { ref, reactive, watch } from "vue";

const props = defineProps({
  hasPagination: { type: Boolean, default: true },
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

const state = reactive({
  pageConfig: { ...props.pageInfo },
});

const handleSelectionChange = (selection) => {
  emits("selection-change", selection);
};

const handlePageChange = (currentPage, pageSize) => {
  emits("page-change", currentPage, pageSize);
};

watch(
  () => props.pageInfo,
  (val) => {
    state.pageConfig = { ...val };
  }
);
</script>
<style lang="scss" scoped>
.pro-table-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .tool-bar {
    margin-bottom: 15px;
  }
  :deep() {
    .el-table--fit {
      flex: 1;
    }
    .el-pagination {
      margin-top: 20px;
      justify-content: space-between;
      .el-pagination__sizes {
        flex: auto;
      }
      > *.is-first {
        padding-right: 28px;
        position: relative;
        &:after {
          content: "记录";
          position: absolute;
          top: 0;
          right: 0;
          color: var(--el-text-color-regular);
        }
      }
    }
  }
}
</style>
