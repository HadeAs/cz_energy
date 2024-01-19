<!--
 * @Author: ymZhang
 * @Date: 2024-01-11 19:46:28
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-19 13:30:06
 * @Description: 
-->
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
      :defaultTreeCheckKeys="state.defaultCheck"
      :treeData="CARBTON_CALCULATE_TREE_DATA"
      @tree-check-change="initChart"
      @type-change="handleChangeTab"
      style="height: calc(100vh - 203px)"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { UNIT_MAP, TYPES_MAP, POWER_ECHART_OPT } from "@/constant/workMonitor";
import { CARBTON_CALCULATE_TREE_DATA } from "@/constant/carbton";
import EchartTreeContainer from "@/components/EchartTreeContainer.vue";
import ProSearchContainer from "@/components/ProSearchContainer.vue";
import { handleOpts } from "@/utils";
import { useRoute } from "vue-router";

const route = useRoute();
const { query } = route;
const echartTreeRef = ref();
const chartOption = ref(handleOpts(POWER_ECHART_OPT));

const state = reactive({
  activeTab: 0,
  defaultCheck: query.id ? query.id.split(",") : [11, 12, 13],
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
  const arr = new Array(times)
    .fill("")
    .map((v) => (Math.random() * num).toFixed(0));
  return arr.sort();
};

const initChart = () => {
  const checks = echartTreeRef.value.getCheckedNodes();
  const checkchilds = checks.filter((v) => !v.children);
  const seriesData = [];
  const legendData = [];
  // if (!checkchilds.length) return;
  const unit = UNIT_MAP[state.activeTab];
  checkchilds.forEach((item, index) => {
    legendData.push(item.label);
    seriesData.push({
      name: item.label,
      type: "line",
      smooth: false,
      showSymbol: false,
      data: randomArr(unit.num, 1000),
      areaStyle: {
        color: item.color,
      },
      lineStyle: {
        color: item.borderColor,
        type: index % 3 === 0 ? "dashed" : "solid",
      },
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
  chartOption.value.yAxis[0].name = `单位：tCO₂`;
  chartOption.value.legend.data = legendData;
  chartOption.value.series = seriesData;
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
