<!--
 * @Author: ymZhang
 * @Date: 2024-01-11 15:51:57
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-12 14:07:57
 * @Description: 
-->
<template>
  <EchartTreeContainer
    ref="echartTreeRef"
    :chartOption="chartOption"
    :defaultTreeCheckKeys="[13]"
    :treeData="CARBTON_TREE_DATA"
    @tree-check-change="initChart"
    style="height: calc(100vh - 123px)"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  CARBTON_LIVE_ECHART_OPT,
  UNIT_MAP,
  CARBTON_TREE_DATA,
} from "@/constant/carbton";
import EchartTreeContainer from "@/components/EchartTreeContainer.vue";

const echartTreeRef = ref();
const chartOption = ref(CARBTON_LIVE_ECHART_OPT);

const randomArr = (times, num) => {
  return new Array(times).fill("").map((v) => (Math.random() * num).toFixed(0));
};

const initChart = () => {
  const checks = echartTreeRef.value.getCheckedNodes();
  const checkchilds = checks.filter((v) => !v.children);
  const seriesData = [];
  const legendData = [];
  if (!checkchilds.length) return;
  const unit = UNIT_MAP[checkchilds[0].parentId || checkchilds[0].id];
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
    return `${i}:00`;
  });
  chartOption.value.legend.data = legendData;
  chartOption.value.series = seriesData;
  chartOption.value.yAxis[0].name = `单位：${unit.unit}`;
  chartOption.value = { ...chartOption.value };
};

onMounted(() => {
  initChart();
});
</script>
