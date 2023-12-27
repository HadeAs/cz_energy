<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-27 11:26:24
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

const echartTreeRef = ref();
const chartOption = ref(COMMON_ECHART_OPTION);

const randomArr = (num) => {
  return new Array(13).fill("").map((v) => (Math.random() * num).toFixed(0));
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
      data: randomArr(1000),
    });
  });
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
