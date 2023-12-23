<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-22 10:35:38
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-23 16:36:36
 * @Description: 
-->
<template>
  <v-chart ref="chartRef" class="chart" :option="option" autoresize />
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
<style lang="scss" scoped>
.chart {
  // height: 100%;
}
</style>
