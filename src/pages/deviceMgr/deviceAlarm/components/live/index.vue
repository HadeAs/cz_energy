<!--
 * @Author: ymZhang
 * @Date: 2023-12-26 14:56:02
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-14 22:10:46
 * @Description: 
-->
<template>
  <div>
    <ProSearchContainer
      class="search"
      buttonContent="搜索"
      :form-info="searchFormCfg"
      authKey="alarm_actual_search"
      @button-click="onSearch"
    />
    <MainContentContainer>
      <ProTable
        multiple
        :column="column"
        :default-sort="state.sortInfo"
        :pageInfo="pageInfo"
        :datasource="dataSource"
        v-loading="loading"
        @page-change="pageChange"
        @selection-change="selectionChange"
        @sort-change="sortChange"
      >
        <template #toolbar>
          <el-row align="middle" :gutter="5">
            <el-col :span="6">
              <el-button
                type="primary"
                @click="addRow"
                v-auth="'alarm_actual_add'"
                >新增</el-button
              >
              <el-button
                :disabled="!selectRows.length"
                @click="batchExport"
                v-auth="'alarm_actual_batch_export'"
                >批量导出</el-button
              >
            </el-col>
            <el-col :span="18">
              <el-form
                class="search-form"
                :inline="true"
                :model="state.searchFormData"
              >
                <el-form-item>
                  <el-select
                    v-model="state.searchFormData.level"
                    placeholder="选择报警等级"
                    clearable
                    @change="handleSearchChange"
                  >
                    <el-option
                      v-for="item in ALARM_LEVELS"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
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
        <template #operation="scope">
          <a
            class="table-operator-btn"
            :class="scope.row.status === '未处理' ? '' : 'disabled'"
            @click="handleRow(scope.row)"
            v-auth="'alarm_actual_deal'"
            >{{ scope.row.status === "未处理" ? "立即处理" : "已处理成功" }}</a
          >
        </template>
      </ProTable>
    </MainContentContainer>
    <AddDetail
      ref="addRef"
      :project-id="state.searchFormData.projectId"
      @submit="addSubmit"
    />
    <Handle ref="handleRef" :data="state.currentData" @submit="handleSubmit" />
  </div>
</template>
<script lang="jsx" setup name="Live">
import { reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import AddDetail from "./addDetail.vue";
import Handle from "./handle.vue";
import appStore from "@/store";
import useTable from "@/hooks/useTable";
import {
  getLiveList,
  addLive,
  handleLive,
  exportLive,
} from "@/api/deviceMgr/deviceAlarm";
import { ElMessage } from "element-plus";
import { ALARM_LEVELS } from "@/constant";
import { exportWithExcel } from "@/utils";

const searchFormCfg = [
  {
    label: "报警时间范围",
    prop: "timeRange",
    type: "datetimerange",
    value: "",
  },
  { label: "关键词搜索", prop: "textQuery", type: "input", value: "" },
];

const { globalState } = storeToRefs(appStore.global);
const addRef = ref();
const handleRef = ref();
const state = reactive({
  searchFormData: {
    projectId: globalState.value.projectId,
    level: "",
    startDate: "",
    endDate: "",
    textQuery: "",
  },
  sortInfo: { prop: "addressTime", order: "descending" },
  currentData: {},
});

const column = [
  {
    prop: "equipmentName",
    label: "报警设备名称",
    width: 160,
    sortable: "custom",
    fixed: true,
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.equipmentName}>
          <span className="table-first-col">{scope.row.equipmentName}</span>
        </div>
      );
    },
  },
  {
    prop: "createTime",
    label: "报警时间",
    width: 180,
    sortable: "custom",
  },
  {
    prop: "riskLevel",
    label: "报警等级",
    // width: 100,
    render: (scope) => {
      const riskLevel = scope.row.riskLevel;
      let type = "success";
      if (riskLevel === "一级") {
        type = "danger";
      } else if (riskLevel === "二级") {
        type = "warning";
      }
      return (
        <ElTag effect="dark" type={type}>
          {riskLevel}
        </ElTag>
      );
    },
  },
  {
    prop: "userName",
    label: "处理人",
    width: 80,
  },
  {
    prop: "addressTime",
    label: "处理时间",
    width: 180,
    sortable: "custom",
  },
  {
    prop: "status",
    label: "处理过程",
    width: 100,
    render: (scope) => {
      const status = scope.row.status;
      const type = status === "未处理" ? "danger" : "success";
      return <ElTag type={type}>{status}</ElTag>;
    },
  },
  {
    prop: "result",
    label: "操作记录",
    width: 180,
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
} = useTable(getLiveList, state.searchFormData, state.sortInfo);

getTableList();

const batchExport = () => {
  ElMessageBox.confirm("确认导出选中的内容？", "警告", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      const ids = selectRows.value.map((item) => item.id);
      const data = await exportLive(state.searchFormData.projectId, ids);
      if (data && !data.code) {
        exportWithExcel(data, "设备实时报警");
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

const handleSearchChange = () => {
  searchChange(state.searchFormData);
};

const addRow = () => {
  addRef.value.open();
};
const handleRow = (row) => {
  if (row.status !== "已处理") {
    state.currentData = { ...row };
    handleRef.value.open();
  }
};
const addSubmit = async (param) => {
  const { code } = await addLive(state.searchFormData.projectId, param);
  if (code === 200) {
    addRef.value.close();
    ElMessage.success("新增成功!");
    getTableList();
  }
};
const handleSubmit = async (param) => {
  const { code } = await handleLive(state.searchFormData.projectId, {
    alarmId: param.id,
    userName: param.userName,
    result: param.result,
  });
  if (code === 200) {
    handleRef.value.close();
    ElMessage.success("处理成功!");
    getTableList();
  }
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
