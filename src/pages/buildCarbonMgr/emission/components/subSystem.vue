<template>
  <div>
    <ProSearchContainer
      class="search"
      buttonContent="导出"
      :form-info="searchFormCfg"
      @button-click="onSearch"
      authKey="monitor_electric_export"
    />
    <EchartTreeContainer
      ref="echartTreeRef"
      :showSwitch="true"
      :chartOption="chartOption"
      :defaultTreeCheckKeys="[15, 16]"
      :treeData="SUB_SYSTEM_TREE_DATA"
      @tree-check-change="initChart"
      @type-change="handleChangeTab"
      style="height: calc(100vh - 203px)"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { UNIT_MAP, TYPES_MAP, POWER_ECHART_OPT } from "@/constant/workMonitor";
import { SUB_SYSTEM_TREE_DATA } from "@/constant/carbton";
import EchartTreeContainer from "@/components/EchartTreeContainer.vue";
import ProSearchContainer from "@/components/ProSearchContainer.vue";
import { handleOpts } from "@/utils";

const echartTreeRef = ref();
const chartOption = ref(handleOpts(POWER_ECHART_OPT));

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
  const checks = echartTreeRef.value.getCheckedNodes();
  const checkchilds = checks.filter((v) => !v.children);
  const seriesData = [];
  const legendData = [];
  // if (!checkchilds.length) return;
  const unit = UNIT_MAP[state.activeTab];
  checkchilds.forEach((item) => {
    legendData.push(item.label);
    seriesData.push({
      name: item.label,
      type: "line",
      smooth: false,
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
  chartOption.value.legend.data = legendData;
  chartOption.value.series = seriesData;
  chartOption.value.yAxis[0].name = `单位：tCO₂`;
  chartOption.value = { ...chartOption.value };
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
