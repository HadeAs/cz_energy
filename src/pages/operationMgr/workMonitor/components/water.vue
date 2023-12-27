<!--
 * @Author: ymZhang
 * @Date: 2023-12-23 17:49:20
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-27 13:45:30
 * @Description: 
-->

<template>
  <div>
    <ProSearchContainer
      class="search"
      buttonContent="导出"
      :form-info="searchFormCfg"
      @button-click="onSearch"
      authKey="monitor_water_export"
    />
    <EchartTreeContainer
      ref="echartTreeRef"
      :showSwitch="true"
      :chartOption="chartOption"
      :defaultTreeCheckKeys="[11, 12, 13]"
      :treeData="WATER_TREE_DATA"
      @type-change="handleChangeTab"
      @tree-check-change="initChart"
      style="height: calc(100vh - 203px)"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import ProSearchContainer from "@/components/ProSearchContainer.vue";
import {
  WATER_ECHART_OPT,
  WATER_TREE_DATA,
  UNIT_MAP,
  TYPES_MAP,
  WATER_X_MAP,
} from "@/constant/workMonitor";
import EchartTreeContainer from "@/components/EchartTreeContainer.vue";

const echartTreeRef = ref();
const chartOption = ref(WATER_ECHART_OPT);
const state = reactive({
  activeTab: 0,
});

const searchFormCfg = [
  {
    label: "时间范围",
    prop: "timeRange",
    type: "datetimerange",
    value: "",
  },
];

const onSearch = (data) => {
  console.log(data);
};

const randomArr = (times, num) => {
  return new Array(times).fill("").map((v) => (Math.random() * num).toFixed(0));
};

const initChart = () => {
  const seriesData = [];
  const unit = UNIT_MAP[state.activeTab];
  new Array(3).fill("").forEach((item, index) => {
    seriesData.push({
      name: WATER_X_MAP[index],
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
  chartOption.value.series = seriesData;
  chartOption.value = { ...chartOption.value };
};

const handleChangeTab = (tab) => {
  state.activeTab = TYPES_MAP[tab];
  initChart(TYPES_MAP[tab]);
};

onMounted(() => {
  initChart(0);
});
</script>
<style lang="scss" scoped>
.search {
  margin-bottom: 10px;
  :deep() {
    .el-form {
      .el-form-item:last-child {
        float: right;
        text-align: right;
        margin-right: 0;
      }
    }
  }
}
</style>
