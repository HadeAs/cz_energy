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
import { handleOpts, renderAxis } from "@/utils";
import { getClassSideBar, getEnergyActual } from '@/api/staMng/energyData.js';
import { storeToRefs } from 'pinia';
import appStore from '@/store/index.js';
import { simServiceRequest } from '@/api/backstageMng/utils.js';
import dayjs from 'dayjs';

const { globalState } = storeToRefs(appStore.global);

const echartTreeRef = ref();
const defaultKeys = ref([2, 3]);
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
      smooth: true,
      showSymbol: false,
      data: (res?.[index] || []).map(i => i?.data),
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
  chartOption.value.xAxis[0].data = res?.[0].map(i => renderAxis(searchType.value, i?.createTime));
  chartOption.value.legend.data = legendData;
  chartOption.value.series = seriesData;
  chartOption.value = { ...chartOption.value };
};

const renderChart = async () => {
  const checks = echartTreeRef.value.getCheckedNodes();
  const checkchilds = checks.filter((v) => !v.children);
  const energyStatisticsIds = checkchilds?.length ? checkchilds?.map(i => i?.id) : defaultKeys.value;
  const res = await simServiceRequest(getEnergyActual, energyStatisticsIds, {
    projectId: state.searchFormData.projectId,
    type: 'hour',
    sysClassId: 1,
    startDate: dayjs().format('YYYY-MM-DD 00:00:00'),
    endDate: dayjs().format('YYYY-MM-DD 23:59:59'),
  });
  initChart(res);
};

onMounted(async () => {
  const res = await getClassSideBar({ projectId: state.searchFormData.projectId });
  state.treeData = res.map(i => ({
    ...i,
    id: i?.energyStatisticsId,
    label: i?.energyStatisticsName,
    children: i?.children.map(child=> ({
      ...child,
      label: child?.name,
    }))}
  ));
  defaultKeys.value = state.treeData?.[0]?.children.map(i => i?.id);
  echartTreeRef.value.setCheckedKeys(defaultKeys.value);
  renderChart();
});

watch(
    () => globalState.value.projectId,
    () => {
      renderChart();
    }
);

</script>
<style lang="scss" scoped></style>
