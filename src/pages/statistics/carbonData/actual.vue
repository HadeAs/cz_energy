<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-22 10:41:43
 * @Description: 
-->
<template>
  <MainContentContainer>
    <Echart :option="option" />
  </MainContentContainer>
</template>

<script setup>
import { ref } from "vue";
import Echart from "@/components/Echart.vue";
import MainContentContainer from "@/components/MainContentContainer.vue";

const xArr = [];
const yArr1 = [];
const yArr2 = [];
const yArr3 = [];
const yArr4 = [];
const minValue = 10;
const colorArr = ["#55c5f7", "#95d2f6", "#f9bf00", "#fa5555", "#6666ff"];

for (let i = 0; i <= 12; i++) {
  xArr.push(`${i}:00`);
  yArr1.push((Math.random() * 1000).toFixed(0));
  yArr2.push((Math.random() * 800).toFixed(0));
  yArr3.push((Math.random() * 600).toFixed(0));
  yArr4.push((Math.random() * 700).toFixed(0));
}

const option = ref({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },
  legend: {
    data: ["空调系统", "动力系统", "照明插座", "特殊用电"],
    top: 12,
    right: 24,
  },
  grid: {
    left: "24",
    right: "24",
    bottom: "24",
    top: "40",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: xArr,
      axisLine: {
        lineStyle: {
          color: "#cad3e2",
        },
      },
      axisLabel: {
        color: "#2D2F33",
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      name: "单位：kWh",
      nameTextStyle: {
        color: "#2D2F33",
        fontSize: 14,
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#cad3e2",
        },
      },
      axisLabel: {
        color: "#2D2F33",
      },
      splitLine: {
        show: false,
      },
      min: minValue,
    },
  ],
  series: [
    {
      name: "空调系统",
      type: "line",
      smooth: true,
      data: yArr1,
    },
    {
      name: "动力系统",
      type: "line",
      smooth: true,
      data: yArr2,
    },
    {
      name: "照明插座",
      type: "line",
      smooth: true,
      data: yArr3,
    },
    {
      name: "特殊用电",
      type: "line",
      smooth: true,
      data: yArr4,
    },
  ],
  color: colorArr,
});
</script>
<style lang="scss" scoped></style>
