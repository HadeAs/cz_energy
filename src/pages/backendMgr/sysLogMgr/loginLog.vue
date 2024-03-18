<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-16 23:47:22
 * @Description: 
-->
<template>
  <div>
    <ProSearchContainer
      class="search"
      buttonContent="搜索"
      :form-info="searchFormCfg"
      @button-click="onSearch"
      authKey="systemlog_login_search"
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
import useTable from "@/hooks/useTable.js";
import { getLoginLog } from "@/api/backstageMng/sysLog.js";

const searchFormCfg = [
  {
    label: "登录时间范围",
    prop: "timeRange",
    type: "datetimerange",
    value: "",
  },
  { label: "登录用户", prop: "textQuery", type: "input", value: "" },
];

const state = reactive({
  searchFormData: {
    textQuery: "",
  },
  sortInfo: { prop: "loginTime", order: "descending" },
});

const {
  dataSource,
  loading,
  pageInfo,
  pageChange,
  sortChange,
  searchChange,
  getTableList,
} = useTable(getLoginLog, state.searchFormData, state.sortInfo, {}, 231);

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
    prop: "loginTime",
    label: "登录时间",
    sortable: "custom",
  },
  {
    prop: "logoutTime",
    label: "退出时间",
    sortable: "custom",
  },
];
</script>
<style lang="scss" scoped>
.search {
  margin-bottom: 10px;
}
</style>
