<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-02-01 09:50:52
 * @Description: 
-->
<template>
  <div>
    <ProSearchContainer
      class="search"
      buttonContent="导出"
      :form-info="searchFormCfg"
      @button-click="handleExport"
      authKey="cost_compare_export"
      @search-change="handleOnSearch"
    />
    <EchartTreeContainer
      ref="echartTreeRef"
      :showSwitch="true"
      :allowAddVar="true"
      :allowDelVar="true"
      :chartOption="chartOption"
      :treeData="state.treeData"
      @type-change="handleTypeChange"
      @tree-check-change="renderChart"
      style="height: calc(100vh - 198px)"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import { COMMON_ECHART_OPTION } from "@/constant";
import EchartTreeContainer from "@/components/EchartTreeContainer.vue";
import { exportWithExcel, handleOpts, renderAxis } from "@/utils";
import { exportCostQsBatch, getCostSta } from "@/api/staMng/statistics.js";
import { storeToRefs } from "pinia";
import appStore from "@/store/index.js";
import { simServiceRequest } from "@/api/backstageMng/utils.js";
import { getEnergyList } from "@/api/common.js";
import { getDefaultDate } from "@/utils";

const { globalState } = storeToRefs(appStore.global);

const defaultKeys = ref([2, 3]);
const searchType = ref("day");
const searchDate = ref({});
const xAxisCnt = ref(12);
const suffix = ref(":00");
const echartTreeRef = ref();
const chartOption = ref(handleOpts(COMMON_ECHART_OPTION));

const state = reactive({
  searchFormData: {
    projectId: globalState.value.projectId,
  },
  treeData: [],
});

const searchFormCfg = ref([
  {
    label: "时间范围",
    prop: "timeRange",
    type: "datetimerange",
    value: "",
  },
]);

const handleOnSearch = () => {
  const [startDate, endDate] = searchFormCfg.value.filter(
    (i) => i?.prop === "timeRange"
  )?.[0]?.value || [undefined, undefined];
  searchDate.value = { startDate, endDate };
  renderChart();
};

const handleExport = async () => {
  const checks = echartTreeRef.value.getCheckedNodes();
  const checkchilds = checks.filter((v) => !v.children);
  ElMessageBox.confirm("确认导出选中数据吗？", "警告", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    const energyStatisticsIds = checkchilds?.length
      ? checkchilds?.map((i) => i?.id)
      : defaultKeys.value;
    const [startDate, endDate] = searchFormCfg.value.filter(
      (i) => i?.prop === "timeRange"
    )?.[0]?.value || [undefined, undefined];
    const exportData = {
      type: searchType.value,
      projectId: state.searchFormData.projectId,
      startDate,
      endDate,
    };
    // const res = await Promise.all(
    //     energyStatisticsIds.map((i) =>
    //         exportCostQsBatch({ ...exportData, energyStatisticsId: i })
    //     )
    // );
    // res.forEach((i, index) => {
    //   exportWithExcel(i, `${new Date().getTime()}-${checks?.[index]?.name}`);
    // });
    const res = await exportCostQsBatch({
      ...exportData,
      energyStatisticsId: energyStatisticsIds?.[0],
    });
    if (res) {
      exportWithExcel(res, "费用数据-费用对比");
      ElMessage({
        type: "success",
        message: "导出成功",
      });
    }
  });
};

const randomArr = (count, num) => {
  return new Array(count).fill("").map((v) => (Math.random() * num).toFixed(0));
};

const handleTypeChange = (val) => {
  searchType.value = val;
  searchDate.value = getDefaultDate(val);
  switch (val) {
    case "hour":
      xAxisCnt.value = 12;
      suffix.value = ":00";
      break;
    case "day":
      xAxisCnt.value = 31;
      suffix.value = "日";
      break;
    case "month":
      xAxisCnt.value = 12;
      suffix.value = "月";
      break;
    case "year":
      xAxisCnt.value = 10;
      suffix.value = "年";
      break;
    default:
      break;
  }
  renderChart();
};

const initChart = (res) => {
  const checks = echartTreeRef.value.getCheckedNodes();
  const checkchilds = checks.filter((v) => !v.children);
  // 动态更改图表数据
  const seriesData = [];
  const legendData = [];
  checkchilds.forEach((item, index) => {
    legendData.push(item.label);
    seriesData.push({
      name: item.label,
      type: "line",
      smooth: false,
      showSymbol: false,
      data: (res?.[index] || []).map((i) => i?.data),
    });
  });
  chartOption.value.xAxis[0].data = res?.[0]?.map((i) =>
    renderAxis(searchType.value, i?.createTime)
  );
  chartOption.value.yAxis[0].name = "单位：元";
  chartOption.value.legend.data = legendData;
  chartOption.value.series = seriesData;
  chartOption.value = { ...chartOption.value };
};

const renderChart = async () => {
  const checks = echartTreeRef.value.getCheckedNodes();
  const checkchilds = checks.filter((v) => !v.children);
  const energyStatisticsIds = checkchilds?.length
    ? checkchilds?.map((i) => i?.id)
    : defaultKeys.value;
  const res = await simServiceRequest(
    getCostSta,
    energyStatisticsIds,
    {
      type: searchType.value,
      projectId: state.searchFormData.projectId,
      ...searchDate.value,
    },
    "energyStatisticsId"
  );
  initChart(res);
};

const initData = async () => {
  const res = await getEnergyList();
  state.treeData = [
    {
      id: "faId",
      label: "总费用",
      children: res?.data?.data?.map((i) => ({ ...i, label: i?.name })),
    },
  ];
  defaultKeys.value = state.treeData?.[0]?.children.map((i) => i?.id);
  echartTreeRef.value.setCheckedKeys(defaultKeys.value);
  renderChart();
};

onMounted(async () => {
  initData();
});

watch(
  () => globalState.value.projectId,
  (id) => {
    state.searchFormData.projectId = id;
    initData();
  }
);
</script>
<style lang="scss" scoped>
.search {
  margin-bottom: 10px;
  :deep() {
    .el-form {
      .el-form-item:last-child {
        float: right;
        text-align: right;
        margin-right: 0;
      }
    }
  }
}
</style>
