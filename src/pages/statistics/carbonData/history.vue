<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-24 09:49:13
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
      :defaultTreeCheckKeys="[8, 9, 10, 11]"
      :treeData="CARBON_CATEGORY_DATA"
      @type-change="handleTypeChange"
      @tree-check-change="initChart"
      style="height: calc(100vh - 198px)"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { COMMON_ECHART_OPTION, CARBON_CATEGORY_DATA } from "@/constant";
import EchartTreeContainer from "@/components/EchartTreeContainer.vue";

const xAxisCnt = ref(12);
const suffix = ref(":00");
const echartTreeRef = ref();
const chartOption = ref(COMMON_ECHART_OPTION);

const randomArr = (count, num) => {
  return new Array(count).fill("").map((v) => (Math.random() * num).toFixed(0));
};

const handleTypeChange = (val) => {
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
  initChart();
};

const initChart = () => {
  const checks = echartTreeRef.value.getCheckedNodes();
  const checkchilds = checks.filter((v) => !v.children);
  // 动态更改图表数据
  const seriesData = [];
  const legendData = [];
  checkchilds.forEach((item) => {
    legendData.push(item.label);
    seriesData.push({
      name: item.label,
      type: "line",
      smooth: true,
      showSymbol: false,
      data: randomArr(xAxisCnt.value, 1000),
    });
  });
  chartOption.value.xAxis[0].data = new Array(xAxisCnt.value)
    .fill("")
    .map(
      (v, i) => `${suffix.value === "年" ? 2001 + i : i + 1}${suffix.value}`
    );
  chartOption.value.legend.data = legendData;
  chartOption.value.series = seriesData;
  chartOption.value = { ...chartOption.value };
};

onMounted(() => {
  initChart();
});
const handleTimeChange = (val) => {};
const handleExport = () => {};
</script>
