<template>
  <div>
    <ProSearchContainer
      class="search"
      buttonContent="搜索"
      :form-info="searchFormCfg"
      @button-click="onSearch"
      authKey="alarm_work_search"
    />
    <MainContentContainer>
      <ProTable
        :column="column"
        :default-sort="state.sortInfo"
        :pageInfo="pageInfo"
        :datasource="dataSource"
        v-loading="loading"
        @page-change="pageChange"
        @sort-change="sortChange"
      >
        <template #toolbar>
          <el-row align="middle" :gutter="5">
            <el-col :span="6">
              <!-- <el-button
                type="primary"
                @click="addRow"
                v-auth="'alarm_work_add'"
                >数据补录</el-button
              > -->
            </el-col>
            <el-col :span="18">
              <el-form
                class="search-form"
                :inline="true"
                :model="state.searchFormData"
              >
                <el-form-item>
                  <el-select v-model="state.searchFormData.projectId">
                    <el-option
                      v-for="item in globalState.projects"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </template>
      </ProTable>
    </MainContentContainer>
    <AddDetail ref="addRef" @submit="addSubmit" />
  </div>
</template>
<script lang="jsx" setup name="Run">
import { reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import AddDetail from "./addDetail.vue";
import appStore from "@/store";
import useTable from "@/hooks/useTable";
import { getRunList } from "@/api/deviceMgr/deviceAlarm";

const { globalState } = storeToRefs(appStore.global);
const searchFormCfg = [
  {
    label: "报警时间范围",
    prop: "timeRange",
    type: "datetimerange",
    value: "",
  },
  { label: "关键词搜索", prop: "textQuery", type: "input", value: "" },
];

const addRef = ref();
const state = reactive({
  searchFormData: {
    projectId: globalState.value.projectId,
    startDate: "",
    endDate: "",
    textQuery: "",
  },
  sortInfo: { prop: "status", order: "descending" },
  currentData: {},
});

const column = [
  {
    prop: "name",
    label: "监测点位名称",
    width: 200,
    fixed: true,
    sortable: "custom",
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.name}>
          <span className="table-first-col">{scope.row.name}</span>
        </div>
      );
    },
  },
  {
    prop: "projectName",
    label: "所属项目",
    width: 180,
  },
  {
    prop: "monitorTime",
    label: "监控时间",
    width: 180,
  },
  {
    prop: "data",
    label: "实时数据",
  },
  {
    prop: "maxThreshold",
    label: "最大阈值",
    width: 100,
  },
  {
    prop: "minThreshold",
    label: "最小阈值",
    width: 100,
  },
  {
    prop: "status",
    label: "报警状态",
    width: 120,
    sortable: "custom",
    render: (scope) => {
      const status = scope.row.status;
      let type = "";
      if (status === "正常") {
        type = "success";
      } else if (status === "异常") {
        type = "danger";
      } else if (status === "无数据") {
        type = "warning";
      } else {
        type = "info";
      }
      return (
        <ElTag effect="dark" type={type}>
          {status}
        </ElTag>
      );
    },
  },
  {
    prop: "description",
    label: "操作记录",
    // width: 220,
  },
];

const {
  dataSource,
  loading,
  pageInfo,
  pageChange,
  sortChange,
  searchChange,
  getTableList,
} = useTable(getRunList, state.searchFormData, state.sortInfo);

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
  searchChange(state.searchFormData);
};

const addRow = () => {
  addRef.value.open();
};
const addSubmit = (data) => {};
</script>
<style lang="scss" scoped>
.search {
  margin-bottom: 10px;
}
.search-form {
  text-align: right;
  :deep() {
    .el-form-item {
      margin-right: 15px;
      margin-bottom: 0;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
