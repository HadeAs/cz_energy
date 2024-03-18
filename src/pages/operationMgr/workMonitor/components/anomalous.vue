<!--
 * @Author: ymZhang
 * @Date: 2023-12-23 17:52:10
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-02-01 21:50:48
 * @Description: 
-->
<template>
  <div style="height: 100%">
    <ProSearchContainer
      class="search"
      buttonContent="搜索"
      :form-info="searchFormCfg"
      @button-click="onSearch"
      authKey="monitor_exception_search"
    />
    <MainContentContainer style="flex: 1">
      <ProTable
        :column="column"
        :default-sort="state.sortInfo"
        :pageInfo="pageInfo"
        :datasource="dataSource"
        v-loading="loading"
        @page-change="pageChange"
        @selection-change="selectionChange"
      >
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
    <Handle ref="handleRef" :data="state.currentData" @submit="handleSubmit" />
  </div>
</template>

<script setup lang="jsx">
import { reactive, ref, watch } from "vue";
import MainContentContainer from "@/components/MainContentContainer.vue";
import useTable from "@/hooks/useTable";
import { storeToRefs } from "pinia";
import appStore from "@/store";
import { queryList } from "@/api/operationMgr/workMonitor";
import { handleLive } from "@/api/deviceMgr/deviceAlarm";
import Handle from "@/pages/deviceMgr/deviceAlarm/components/live/handle.vue";
import { getDeviceAlarmProve } from "@/api/common";
import { exportWithExcel } from "@/utils";

const { globalState } = storeToRefs(appStore.global);
const searchFormCfg = [
  {
    label: "时间范围",
    prop: "timeRange",
    type: "datetimerange",
    value: "",
  },
  { label: "报警设备", prop: "textQuery", type: "input", value: "" },
];

const handleRef = ref();
const state = reactive({
  searchFormData: {
    projectId: globalState.value.projectId,
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
    prop: "content",
    label: "报警信息",
    width: 180,
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
    prop: "createTime",
    label: "报警时间",
    sortable: "custom",
    width: 170,
  },
  {
    prop: "userName",
    label: "处理人",
    width: 80,
  },
  {
    prop: "addressTime",
    label: "处理时间",
    sortable: "custom",
    width: 170,
  },
  {
    prop: "status",
    label: "设备状态",
    width: 140,
    showOverflowTooltip: false,
    render: (scope) => {
      const status = scope.row.status;
      const appendix = scope.row.appendix;
      const type = status === "未处理" ? "danger" : "success";
      if (!appendix) {
        return <ElTag type={type}>{status}</ElTag>;
      }
      return (
        <div class="handle-process">
          <ElTag type={type}>{status}</ElTag>
          <ElButton
            link
            type="primary"
            onClick={() => {
              download(appendix);
            }}
          >
            下载凭证
          </ElButton>
        </div>
      );
    },
  },
];

const {
  dataSource,
  loading,
  pageInfo,
  pageChange,
  searchChange,
  selectionChange,
  getTableList,
} = useTable(queryList, state.searchFormData, state.sortInfo);

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

const download = async (name) => {
  const data = getDeviceAlarmProve(name);
  if (data && !data.code) {
    const [n, type] = name.split(".");
    exportWithExcel(data, "报警处理凭证", type);
    // ElMessage({
    //   type: "success",
    //   message: "下载成功",
    // });
  }
};

const handleRow = (row) => {
  if (row.status !== "已处理") {
    state.currentData = { ...row };
    handleRef.value.open();
  }
};
const handleSubmit = async (param) => {
  const params = {
    alarmId: param.id,
    result: param.result,
  };
  if (param.file) params.file = param.file;
  const { code } = await handleLive(state.searchFormData.projectId, params);
  if (code === 200) {
    handleRef.value.close();
    // ElMessage.success("处理成功!");
    getTableList();
  }
};
watch(
  () => globalState.value.projectId,
  (val) => {
    state.searchFormData.projectId = val;
    searchChange(state.searchFormData);
  }
);
</script>
<style lang="scss" scoped>
.search {
  margin-bottom: 10px;
}
</style>
<style lang="scss">
.handle-process {
  display: flex;
}
</style>
