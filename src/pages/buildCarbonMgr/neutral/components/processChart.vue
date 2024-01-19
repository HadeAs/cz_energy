<template>
  <MainContentContainer class="process-container">
    <el-row class="title-container" align="middle" :gutter="5">
      <el-col :span="18">
        <span class="title">净碳排放量趋势</span>
      </el-col>
      <el-col :span="6">
        <el-date-picker
          v-model="state.timeRange"
          type="datetimerange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :value-format="COMMON_DATE_TIME_FORMAT"
        />
      </el-col>
    </el-row>
    <div class="content">
      <el-tabs v-model="state.activeTab" @tab-change="initChart">
        <el-tab-pane
          v-for="item in tabs"
          :key="item.id"
          :label="item.title"
          :name="item.id"
        />
      </el-tabs>
      <Echart :option="chartOption" />
    </div>
  </MainContentContainer>
</template>
<script setup name="ProcessContainer">
import { ref, reactive, onMounted } from "vue";
import Echart from "@/components/Echart.vue";
import { POWER_ECHART_OPT } from "@/constant/workMonitor";
import { handleOpts } from "@/utils";
import { COMMON_DATE_TIME_FORMAT } from "@/constant";

const tabs = [
  {
    id: 0,
    title: "年能耗",
    value: [
      "2022",
      "2023",
      "2024",
      "2025",
      "2026",
      "2027",
      "2028",
      "2029",
      "2030",
    ],
  },
  {
    id: 1,
    title: "月能耗",
    value: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ],
  },
];
const dataMaps = [
  {
    name: "目标趋势预测",
    value: "target",
    lineColor: "#191b1a",
    lineType: "dashed",
    bgColor: "#fff",
  },
  {
    name: "目标趋势",
    value: "targetTrend",
    lineColor: "#fed135",
    lineType: "solid",
    bgColor: "#fff5d7",
  },
  {
    name: "实际趋势",
    value: "actualTrend",
    lineColor: "#916aff",
    lineType: "solid",
    bgColor: "#e1d7ff",
  },
];
const chartOption = ref(handleOpts(POWER_ECHART_OPT));
const state = reactive({
  timeRange: [],
  activeTab: 0,
});

const randomArr = (times, num) => {
  const arr = new Array(times)
    .fill("")
    .map((v) => (Math.random() * num).toFixed(0));
  return arr.sort();
};

const initChart = () => {
  const targetTab = tabs.find((v) => v.id === state.activeTab);
  const seriesData = [];
  const legendData = [];
  dataMaps.forEach((item, index) => {
    legendData.push(item.name);
    seriesData.push({
      name: item.name,
      type: "line",
      smooth: false,
      showSymbol: false,
      data: randomArr(targetTab.value.length, 1000),
      areaStyle: {
        color: item.bgColor,
      },
      lineStyle: {
        color: item.lineColor,
        type: index === 0 ? "dashed" : "solid",
      },
    });
  });
  chartOption.value.yAxis[0].name = "单位：tCO₂";
  chartOption.value.xAxis[0].data = targetTab.value;
  chartOption.value.legend = {
    data: legendData,
  };
  chartOption.value.series = seriesData;
  chartOption.value = { ...chartOption.value };
};
onMounted(() => {
  initChart();
});
</script>
<style lang="scss" scoped>
.process-container {
  display: flex;
  flex-direction: column;
  padding: 10px 0 0 0 !important;
  .title-container {
    padding: 0 16px;
    .title {
      font-size: 16px;
      font-weight: 700;
    }
  }
  .content {
    flex: 1;
    margin-top: 15px;
    position: relative;
    :deep() {
      .el-tabs {
        position: absolute;
        right: 0;
        top: -10px;
        .el-tabs__item {
          height: 35px;
          line-height: 40px !important;
          font-size: 14px !important;
        }
      }
      .el-tabs__nav-wrap::after {
        display: none;
      }
    }
  }
}
</style>
