<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-22 10:35:38
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-15 01:34:26
 * @Description: 
-->
<template>
  <v-chart
    v-if="option.series?.length"
    ref="chartRef"
    class="chart"
    :option="option"
    autoresize
  />
  <el-empty v-else description="暂无数据" />
</template>
<script setup>
import { ref } from "vue";
import { use } from "echarts/core";
import {
  PieChart,
  LineChart,
  MapChart,
  ScatterChart,
  BarChart,
} from "echarts/charts";
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  VisualMapComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import { SVGRenderer } from "echarts/renderers";

const chartRef = ref();
use([
  ToolboxComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  PieChart,
  LineChart,
  MapChart,
  ScatterChart,
  BarChart,
  SVGRenderer,
  VisualMapComponent,
]);

defineProps(["option"]);

const resize = () => {
  if (chartRef.value) {
    chartRef.value.resize();
  }
};

const clear = () => {
  if (chartRef.value) {
    chartRef.value.clear();
  }
};

const dispose = () => {
  if (chartRef.value) {
    chartRef.value.dispose();
  }
};

defineExpose({ resize, clear, dispose });
</script>
