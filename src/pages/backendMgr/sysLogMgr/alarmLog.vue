<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-16 23:49:03
 * @Description: 
-->
<template>
  <div>
    <ProSearchContainer
      class="search"
      buttonContent="搜索"
      :form-info="searchFormCfg"
      @button-click="onSearch"
      authKey="systemlog_alarm_search"
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
import { getAlarmLog } from "@/api/backstageMng/sysLog.js";

const searchFormCfg = [
  {
    label: "报警时间范围",
    prop: "timeRange",
    type: "datetimerange",
    value: "",
  },
  { label: "设备名称", prop: "textQuery", type: "input", value: "" },
];

const state = reactive({
  searchFormData: {
    textQuery: "",
  },
  sortInfo: { prop: "createTime", order: "descending" },
});

const {
  dataSource,
  loading,
  pageInfo,
  pageChange,
  sortChange,
  searchChange,
  getTableList,
} = useTable(getAlarmLog, state.searchFormData, state.sortInfo, {}, 233);

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
    prop: "content",
    label: "报警内容",
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.content}>
          <span className="table-first-col">{scope.row.content}</span>
        </div>
      );
    },
  },
  {
    prop: "createTime",
    label: "操作时间",
    sortable: "custom",
  },
  {
    prop: "sysName",
    label: "所属系统",
  },
  {
    prop: "projectName",
    label: "所属项目",
  },
];
</script>
<style lang="scss" scoped>
.search {
  margin-bottom: 10px;
}
</style>
