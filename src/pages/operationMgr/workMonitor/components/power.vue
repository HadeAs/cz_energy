<!--
 * @Author: ymZhang
 * @Date: 2023-12-23 17:47:00
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-24 14:36:15
 * @Description: 
-->
<template>
  <div>
    <TimeRangeSearch
      @time-change="handleTimeChange"
      @export-click="handleExport"
    />
    <EchartTreeContainer
      ref="echartTreeRef"
      :showSwitch="true"
      :chartOption="chartOption"
      :defaultTreeCheckKeys="[11, 12, 13]"
      :treeData="POWER_TREE_DATA"
      @type-change="handleChangeTab"
      @tree-check-change="initChart"
      style="height: calc(100vh - 203px)"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import TimeRangeSearch from "@/components/TimeRangeSearch.vue";
import {
  POWER_ECHART_OPT,
  POWER_TREE_DATA,
  UNIT_MAP,
  TYPES_MAP,
} from "@/constant/workMonitor";
import EchartTreeContainer from "@/components/EchartTreeContainer.vue";

const echartTreeRef = ref();
const chartOption = ref(POWER_ECHART_OPT);
const state = reactive({
  activeTab: 0,
});

const randomArr = (times, num) => {
  return new Array(times).fill("").map((v) => (Math.random() * num).toFixed(0));
};

const initChart = () => {
  const checks = echartTreeRef.value.getCheckedNodes();
  const checkchilds = checks.filter((v) => !v.children);
  const seriesData = [];
  const legendData = [];
  const unit = UNIT_MAP[state.activeTab];
  checkchilds.forEach((item) => {
    legendData.push(item.label);
    seriesData.push({
      name: item.label,
      type: "line",
      smooth: true,
      showSymbol: false,
      data: randomArr(unit.num, 1000),
    });
  });
  chartOption.value.xAxis[0].data = new Array(unit.num).fill("").map((v, i) => {
    if (state.activeTab === 0) {
      return `${i}${unit.unit}`;
    }
    if ([1, 2].includes(state.activeTab)) {
      return `${i + 1}${unit.unit}`;
    }
    return `${i + 2010}${unit.unit}`;
  });
  chartOption.value.legend.data = legendData;
  chartOption.value.series = seriesData;
  chartOption.value = { ...chartOption.value };
};

const handleChangeTab = (tab) => {
  state.activeTab = TYPES_MAP[tab];
  initChart();
};

onMounted(() => {
  initChart();
});

const handleTimeChange = (val) => {};
const handleExport = () => {};
</script>
