<!--
 * @Author: ymZhang
 * @Date: 2023-12-23 17:47:00
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-15 03:49:39
 * @Description: 
-->
<template>
  <div>
    <ProSearchContainer
      class="search"
      buttonContent="导出"
      :form-info="searchFormCfg"
      @button-click="onSearch"
      @search-change="handleSearchChange"
      authKey="monitor_electric_export"
    />
    <EchartTreeContainer
      ref="echartTreeRef"
      :showSwitch="true"
      :chartOption="chartOption"
      :defaultTreeCheckKeys="[11, 12, 13]"
      :treeData="POWER_TREE_DATA"
      @type-change="handleChangeTab"
      @tree-check-change="initChart"
      style="height: calc(100vh - 203px)"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import {
  POWER_ECHART_OPT,
  POWER_TREE_DATA,
  UNIT_MAP,
  TYPES_MAP,
} from "@/constant/workMonitor";
import EchartTreeContainer from "@/components/EchartTreeContainer.vue";
import ProSearchContainer from "@/components/ProSearchContainer.vue";
import { handleOpts } from "@/utils";

const echartTreeRef = ref();
const chartOption = ref(handleOpts(POWER_ECHART_OPT));
const state = reactive({
  activeTab: 0,
});

const searchFormCfg = ref([
  {
    label: "时间范围",
    prop: "timeRange",
    type: "datetimerange",
    value: "",
  },
]);

const onSearch = (data) => {
  console.log(data);
};

const randomArr = (times, num) => {
  return new Array(times).fill("").map((v) => (Math.random() * num).toFixed(0));
};

const initChart = () => {
  const checks = echartTreeRef.value.getCheckedNodes();
  const checkchilds = checks.filter((v) => !v.children);
  const seriesData = [];
  const legendData = [];
  const unit = UNIT_MAP[state.activeTab];
  let unitLabel = "";
  checkchilds.forEach((item) => {
    legendData.push(item.label);
    seriesData.push({
      name: item.label,
      type: "line",
      smooth: true,
      showSymbol: false,
      data: randomArr(unit.num, 1000),
    });
    if (item.unit) {
      unitLabel = item.unit;
    }
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
  chartOption.value.legend.data = legendData;
  if (unitLabel) {
    chartOption.value.yAxis[0].name = `单位：${unitLabel}`;
  } else {
    chartOption.value.yAxis[0].name = "";
  }
  chartOption.value.series = seriesData;
  chartOption.value = { ...chartOption.value };
};

const handleSearchChange = (type) => {
  initChart();
};

const handleChangeTab = (tab) => {
  state.activeTab = TYPES_MAP[tab];
  initChart();
};

onMounted(() => {
  initChart();
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
