<!--
 * @Author: ymZhang
 * @Date: 2024-01-12 14:17:53
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-14 19:57:02
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
      :conflict="false"
      :chartOption="chartOption"
      :defaultTreeCheckKeys="[11, 12, 13, 14, 21, 22, 23]"
      :treeData="CARBON_NETURAL_CALCULATE_TREE_DATA"
      @tree-check-change="initChart"
      @type-change="handleChangeTab"
      style="height: calc(100vh - 203px)"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { UNIT_MAP, TYPES_MAP, POWER_ECHART_OPT } from "@/constant/workMonitor";
import {
  CARBON_NETURAL_CALCULATE_TREE_DATA,
  COMMON_SERIES_DATA,
} from "@/constant/carbton";
import EchartTreeContainer from "@/components/EchartTreeContainer.vue";
import ProSearchContainer from "@/components/ProSearchContainer.vue";

const echartTreeRef = ref();
const chartOption = ref(POWER_ECHART_OPT);

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
  {
    label: "",
    prop: "select",
    type: "select",
    value: "",
    options: [
      { value: 0, label: "国家推荐值" },
      { value: 1, label: "地方推荐值" },
    ],
  },
];

const onSearch = (data) => {
  console.log(data);
};

const randomArr = (times, num) => {
  const item = COMMON_SERIES_DATA[0].data;
  const arr = new Array(times).fill("").map((v, index) => {
    if (index === 0) return item[index];
    const diff = num - item[index];
    return Math.ceil(Math.random() * (diff - 1)) + 1;
  });
  return arr;
};

const totalMap = {
  id: 0,
  color: "rgba(197, 206, 223, 1)",
  label: "碳排基准",
};

const initChart = () => {
  const checks = echartTreeRef.value.getCheckedNodes();
  const checkchilds = [totalMap, ...checks.filter((v) => !v.children)];
  const seriesData = [...COMMON_SERIES_DATA];
  const legendData = [];
  if (!checkchilds.length) return;
  const unit = UNIT_MAP[state.activeTab];
  const endData = randomArr(checkchilds.length, 1000);
  seriesData[1].data = endData.map((item) => Number(Number(item) + unit.num));
  seriesData[1].data[0] = 1000;
  seriesData[1].itemStyle = {
    color: ({ dataIndex }) => {
      return checkchilds[dataIndex].color;
    },
  };
  checkchilds.forEach((item) => {
    legendData.push(item.label);
  });
  // chartOption.value.tooltip.formatter = (params) => {

  // }
  chartOption.value.legend = { show: false };
  chartOption.value.yAxis[0].name = "单位：万t";
  chartOption.value.xAxis[0].axisLabel = { show: false };
  chartOption.value.xAxis[0].data = legendData;
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
