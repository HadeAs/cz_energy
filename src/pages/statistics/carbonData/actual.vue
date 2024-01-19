<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-15 01:13:17
 * @Description: 
-->
<template>
  <EchartTreeContainer
    ref="echartTreeRef"
    :chartOption="chartOption"
    :treeData="state.treeData"
    @tree-check-change="renderChart"
    style="height: calc(100vh - 123px)"
  >
  </EchartTreeContainer>
</template>

<script setup>
import { ref, onMounted, watch, reactive } from "vue";
import { COMMON_ECHART_OPTION } from "@/constant";
import EchartTreeContainer from "@/components/EchartTreeContainer.vue";
import { getSearchNode, handleOpts, renderAxis, renderTreeData } from "@/utils";
import { getClassSideBar, getEnergyActual } from "@/api/staMng/energyData.js";
import { storeToRefs } from "pinia";
import appStore from "@/store/index.js";
import { simServiceRequest } from "@/api/backstageMng/utils.js";
import dayjs from "dayjs";

const { globalState } = storeToRefs(appStore.global);

const echartTreeRef = ref();
const defaultKeys = ref([]);
const chartOption = ref(handleOpts(COMMON_ECHART_OPTION));

const state = reactive({
  searchFormData: {
    projectId: globalState.value.projectId,
  },
  treeData: [],
});

const randomArr = (num) => {
  return new Array(13).fill("").map((v) => (Math.random() * num).toFixed(0));
};

const initChart = (res) => {
  const checks = echartTreeRef.value.getCheckedNodes();
  const checkchilds = checks.filter((v) => !v.children);
  // 动态更改图表数据
  const seriesData = [];
  const legendData = [];
  let unitLabel = "";
  checkchilds.forEach((item, index) => {
    legendData.push(item.label);
    seriesData.push({
      name: item.label,
      type: "line",
      smooth: false,
      showSymbol: false,
      data: (res?.[index] || []).map((i) => i?.data),
    });
    if (item.unit) {
      unitLabel = item.unit;
    }
  });
  if (unitLabel) {
    chartOption.value.yAxis[0].name = `单位：${unitLabel}`;
  } else {
    chartOption.value.yAxis[0].name = "";
  }
  chartOption.value.xAxis[0].data = res?.[0]?.map((i) =>
    renderAxis("hour", i?.createTime)
  );
  chartOption.value.legend.data = legendData;
  chartOption.value.series = seriesData;
  chartOption.value = { ...chartOption.value };
};

const renderChart = async () => {
  const checks = echartTreeRef.value
    .getCheckedNodes()
    ?.filter((v) => !v.children);
  const data = getSearchNode(checks?.length ? checks : defaultKeys.value);
  const res = await simServiceRequest(getEnergyActual, data?.childIds, {
    projectId: state.searchFormData.projectId,
    type: "hour",
    energyStatisticsId: data?.faId,
    startDate: dayjs().subtract(1, "day").format("YYYY-MM-DD HH:mm:ss"),
    endDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  });
  initChart(res);
};

const initData = async () => {
  const res = await getClassSideBar({
    projectId: state.searchFormData.projectId,
  });
  state.treeData = renderTreeData(
    res,
    ["energyStatisticsName", "name"],
    "energyStatisticsId"
  );
  defaultKeys.value = state.treeData?.[0]?.children;
  echartTreeRef.value.setCheckedKeys(defaultKeys.value.map((i) => i?.id));
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
<style lang="scss" scoped></style>
