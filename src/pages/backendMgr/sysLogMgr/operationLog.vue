<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2024-01-05 18:49:19
 * @Description: 
-->
<template>
  <div>
    <ProSearchContainer
      class="search"
      buttonContent="搜索"
      :form-info="searchFormCfg"
      @button-click="onSearch"
      authKey="systemlog_operation_search"
    />
    <MainContentContainer>
      <ProTable
        :column="column"
        :pageInfo="pageInfo"
        :datasource="dataSource"
        v-loading="loading"
        @sort-change="sortChange"
        @page-change="pageChange"
      />
    </MainContentContainer>
  </div>
</template>

<script setup lang="jsx">
import { reactive } from "vue";
import ProTable from "@/components/ProTable.vue";
import ProSearchContainer from "@/components/ProSearchContainer.vue";
import MainContentContainer from "@/components/MainContentContainer.vue";
import useTable from '@/hooks/useTable.js';
import { getOperationLog } from '@/api/backstageMng/sysLog.js';

const searchFormCfg = [
  {
    label: "操作时间范围",
    prop: "timeRange",
    type: "datetimerange",
    value: "",
  },
  { label: "操作用户", prop: "textQuery", type: "input", value: "" },
];

const state = reactive({
  searchFormData: {
    textQuery: "",
  },
  sortInfo: { prop: "operationTime", order: "descending" },
});

const {
  dataSource,
  loading,
  pageInfo,
  pageChange,
  sortChange,
  searchChange,
  getTableList,
} = useTable(getOperationLog, state.searchFormData, state.sortInfo);

getTableList();

const onSearch = (data) => {
  const param = {};
  data.forEach((item) => {
    if (item.prop === "timeRange") {
      param.startDate = item.value?.[0];
      param.endDate = item.value?.[1];
    } else {
      param[item.prop] = item.value;
    }
  });
  state.searchFormData = { ...state.searchFormData, ...param };
  searchChange({ ...state.searchFormData });
};

const column = [
  {
    prop: "userName",
    label: "操作用户",
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.userName}>
          <span className="table-first-col">{scope.row.userName}</span>
        </div>
      );
    },
  },
  {
    prop: "roleName",
    label: "用户角色",
  },
  {
    prop: "operationTime",
    label: "操作时间",
    sortable: "custom",
  },
  {
    prop: "operation",
    label: "操作内容",
    width: 500,
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.operation}>
          <span>{scope.row.operation}</span>
        </div>
      );
    },
  },
];

</script>
<style lang="scss" scoped>
.search {
  margin-bottom: 10px;
}
</style>
