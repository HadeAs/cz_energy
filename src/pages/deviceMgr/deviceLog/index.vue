<template>
  <div style="height: 100%">
    <ProSearchContainer
      class="search"
      buttonContent="搜索"
      :form-info="searchFormCfg"
      @button-click="onSearch"
      auth-key="auth-key"
    />
    <MainContentContainer style="height: calc(100vh - 145px)">
      <ProTable
        multiple
        :column="column"
        :pageInfo="pageInfo"
        :default-sort="state.sortInfo"
        :datasource="dataSource"
        v-loading="loading"
        @page-change="pageChange"
        @selection-change="selectionChange"
        @sort-change="sortChange"
      >
        <template #toolbar>
          <el-row align="middle" :gutter="5">
            <el-col :span="4">
              <el-button
                :disabled="!selectRows.length"
                @click="batchExport"
                v-auth="'devicelog_batch_export'"
                >批量导出</el-button
              >
            </el-col>
            <el-col :span="20">
              <el-form
                class="search-form"
                :inline="true"
                :model="state.searchFormData"
              >
                <el-form-item>
                  <el-select
                    v-model="state.searchFormData.projectId"
                    placeholder="选择项目"
                    @change="handleSearchChange"
                  >
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
  </div>
</template>
<script lang="jsx" setup name="DeviceLog">
import { reactive } from "vue";
import { storeToRefs } from "pinia";
import appStore from "@/store";
import useTable from "@/hooks/useTable";
import { exportWithExcel } from "@/utils";
import { getList, exportLog } from "@/api/deviceMgr/deviceLog";

const { globalState } = storeToRefs(appStore.global);
const searchFormCfg = [
  {
    label: "操作时间范围",
    prop: "timeRange",
    type: "datetimerange",
    value: "",
  },
  { label: "关键词搜索", prop: "textQuery", type: "input", value: "" },
];

const state = reactive({
  searchFormData: {
    projectId: globalState.value.projectId,
  },
  sortInfo: { prop: "operationTime", order: "descending" },
});

const column = [
  {
    prop: "userName",
    label: "操作用户",
    width: 110,
  },
  {
    prop: "projectName",
    label: "所属项目",
    width: 180,
  },
  {
    prop: "roleName",
    label: "用户类型",
    width: 140,
    render: (scope) => {
      const level = scope.row.roleName;
      let type = "";
      if (level === globalState.value.roleList[0]?.name) {
        type = "warning";
      } else if (level === globalState.value.roleList[1]?.name) {
        type = "success";
      }
      return <ElTag type={type}>{level}</ElTag>;
    },
  },
  {
    prop: "operationTime",
    label: "操作时间",
    width: 180,
    sortable: "custom",
  },
  {
    prop: "operation",
    label: "操作内容",
    sortable: "custom",
  },
];

const {
  dataSource,
  loading,
  pageInfo,
  selectRows,
  pageChange,
  sortChange,
  searchChange,
  selectionChange,
  getTableList,
} = useTable(getList, state.searchFormData, state.sortInfo, {}, 141);

getTableList();

const handleSearchChange = () => {
  searchChange(state.searchFormData);
};

const batchExport = () => {
  ElMessageBox.confirm("确认导出选中的内容？", "警告", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      const ids = selectRows.value.map((item) => item.id);
      const data = await exportLog(state.searchFormData.projectId, ids);
      if (data && !data.code) {
        exportWithExcel(data, "设备日志");
        ElMessage({
          type: "success",
          message: "导出成功",
        });
      }
    })
    .catch(() => {});
};
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
