<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-22 10:35:38
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-22 10:39:38
 * @Description: 
-->
<template>
  <v-chart class="chart" :option="option" autoresize />
</template>
<script setup>
import { use } from "echarts/core";
import { PieChart, LineChart } from "echarts/charts";
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import { SVGRenderer } from "echarts/renderers";

use([
  ToolboxComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  PieChart,
  LineChart,
  SVGRenderer,
]);

defineProps(["option"]);
</script>
<style lang="scss" scoped>
.chart {
  height: 100vh;
}
</style>
