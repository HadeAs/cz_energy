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
    :defaultTreeCheckKeys="[8, 9, 10, 11]"
    :treeData="CARBON_CATEGORY_DATA"
    @tree-check-change="initChart"
    style="height: calc(100vh - 123px)"
  >
  </EchartTreeContainer>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { COMMON_ECHART_OPTION, CARBON_CATEGORY_DATA } from "@/constant";
import EchartTreeContainer from "@/components/EchartTreeContainer.vue";
import { handleOpts } from "@/utils";

const echartTreeRef = ref();
const chartOption = ref(handleOpts(COMMON_ECHART_OPTION));

const randomArr = (num) => {
  return new Array(13).fill("").map((v) => (Math.random() * num).toFixed(0));
};

const initChart = () => {
  const checks = echartTreeRef.value.getCheckedNodes();
  const checkchilds = checks.filter((v) => !v.children);
  // 动态更改图表数据
  const seriesData = [];
  const legendData = [];
  let unitLabel = "";
  checkchilds.forEach((item) => {
    legendData.push(item.label);
    seriesData.push({
      name: item.label,
      type: "line",
      smooth: true,
      showSymbol: false,
      data: randomArr(1000),
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
  chartOption.value.xAxis[0].data = new Array(13)
    .fill("")
    .map((v, i) => `${i}:00`);
  chartOption.value.legend.data = legendData;
  chartOption.value.series = seriesData;
  chartOption.value = { ...chartOption.value };
};

onMounted(() => {
  initChart();
});
</script>
<style lang="scss" scoped></style>
