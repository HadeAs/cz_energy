<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-26 22:08:58
 * @Description: 
-->
<template>
  <div>
    <ProSearchContainer
      class="search"
      buttonContent="导出"
      :form-info="searchFormCfg"
      @button-click="onSearch"
      @search-change="handleOnSearch"
      authKey="carbon_device_export"
    />
    <EchartTreeContainer
      ref="echartTreeRef"
      :showSwitch="true"
      :chartOption="chartOption"
      :defaultTreeCheckKeys="[6, 7, 8, 9]"
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
import ProSearchContainer from "@/components/ProSearchContainer.vue";
import { exportWithExcel, handleOpts, renderAxis } from "@/utils";
import { storeToRefs } from 'pinia';
import appStore from '@/store/index.js';
import { simServiceRequest } from '@/api/backstageMng/utils.js';
import { exportCostQsBatch } from '@/api/staMng/statistics.js';
import { exportEquipmentQsBatch, getEqQsData, getEquipmentSideBar } from '@/api/staMng/energyData.js';

const { globalState } = storeToRefs(appStore.global);

const defaultKeys = ref([2, 3]);
const searchType = ref('hour');
const searchDate = ref({})
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
  const [startDate, endDate] = searchFormCfg.value.filter(i => i?.prop === 'timeRange')?.[0]?.value || [undefined, undefined];
  searchDate.value = { startDate, endDate };
  renderChart();
}

const onSearch = async () => {
  const checks = echartTreeRef.value.getCheckedNodes();
  const checkchilds = checks.filter((v) => !v.children);
  const energyStatisticsIds = checkchilds?.length ? checkchilds?.map(i => i?.id) : defaultKeys;
  const [startDate, endDate] = searchFormCfg.value.filter(i => i?.prop === 'timeRange')?.[0]?.value || [undefined, undefined];
  const res = await exportEquipmentQsBatch({
    type: searchType.value,
    projectId: state.searchFormData.projectId,
    startDate,
    endDate,
    equipmentTypeId: 12, // todo: 临时
    // 直接单个数字
    energyStatisticsId: energyStatisticsIds?.[0],
  });
  exportWithExcel(res, new Date().getTime());
};

const randomArr = (count, num) => {
  return new Array(count).fill("").map((v) => (Math.random() * num).toFixed(0));
};

const handleTypeChange = (val) => {
  searchType.value = val;
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
      smooth: true,
      showSymbol: false,
      data: (res?.[index] || []).map(i => i?.data),
    });
  });
  chartOption.value.xAxis[0].data = res?.[0].map(i => renderAxis(searchType.value, i?.createTime));
  chartOption.value.legend.data = legendData;
  chartOption.value.series = seriesData;
  chartOption.value = { ...chartOption.value };
};

const renderChart = async () => {
  const checks = echartTreeRef.value.getCheckedNodes();
  const checkchilds = checks.filter((v) => !v.children);
  const energyStatisticsIds = checkchilds?.length ? checkchilds?.map(i => i?.id) : defaultKeys.value;
  const res = await simServiceRequest(getEqQsData, energyStatisticsIds, {
    type: searchType.value,
    projectId: state.searchFormData.projectId,
    equipmentTypeId: 12, // todo: 临时
    ...searchDate.value,
  });
  initChart(res);
};

onMounted(async () => {
  const res = await getEquipmentSideBar({ projectId: state.searchFormData.projectId });
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
