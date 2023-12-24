<!--
 * @Author: ymZhang
 * @Date: 2023-12-23 17:47:00
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-23 20:51:21
 * @Description: 
-->
<template>
  <TimeRangeSearch
    @time-change="handleTimeChange"
    @export-click="handleExport"
  />
  <EchartTreeContainer
    style="height: calc(100vh - 203px)"
    :showSwitch="true"
    @type-change="handleChangeTab"
  >
    <template #left>
      <Echart :option="chartOption" />
    </template>
    <template #right>
      <el-input
        v-model="varName"
        placeholder="请输入内容"
        :prefix-icon="Search"
        style="margin-bottom: 10px"
      />
      <el-tree
        :data="treeData"
        show-checkbox
        node-key="id"
        ref="treeRef"
        default-expand-all
        @check="initChart(state.activeTab)"
        :default-checked-keys="[11, 12, 13]"
        :filter-node-method="filterNode"
      />
    </template>
  </EchartTreeContainer>
</template>

<script setup>
import { ref, watch, reactive, onMounted, nextTick } from "vue";
import { Search } from "@element-plus/icons-vue";
import Echart from "@/components/Echart.vue";
import TimeRangeSearch from "@/components/TimeRangeSearch.vue";
import {
  POWER_ECHART_OPT,
  POWER_TREE_DATA,
  UNIT_MAP,
  TYPES_MAP
} from "@/constant/workMonitor";
import EchartTreeContainer from "@/components/EchartTreeContainer.vue";

const varName = ref("");
const treeRef = ref();
const chartOption = ref(POWER_ECHART_OPT);
const treeData = ref(POWER_TREE_DATA);
const state = reactive({
  activeTab: 0,
});

const randomArr = (times, num) => {
  return new Array(times).fill("").map((v) => (Math.random() * num).toFixed(0));
};

watch(varName, (val) => {
  treeRef.value && treeRef.value.filter(val);
});

const filterNode = (value, data) => {
  if (!value) return true;
  return data.label.includes(value);
};

const initChart = (type) => {
  const checks = treeRef.value.getCheckedNodes();
  const checkchilds = checks.filter((v) => !v.children);
  const seriesData = [];
  const legendData = [];
  const unit = UNIT_MAP[type];
  checkchilds.forEach((item) => {
    legendData.push(item.label);
    seriesData.push({
      name: item.label,
      type: "line",
      smooth: true,
      showSymbol: false,
      data: randomArr(unit.num, 1000),
    });
  });
  chartOption.value.xAxis[0].data = new Array(unit.num).fill("").map((v, i) => {
    if (type === 0) {
      return `${i}${unit.unit}`;
    }
    if ([1, 2].includes(type)) {
      return `${i + 1}${unit.unit}`;
    }
    return `${i + 2010}${unit.unit}`;
  });
  chartOption.value.legend.data = legendData;
  chartOption.value.series = seriesData;
  chartOption.value = { ...chartOption.value };

  //跨父节点节点禁止点击
  if (checkchilds.length) {
    const node = checkchilds[0];
    treeData.value.forEach((v) => {
      if (!v.children.find((item) => item.id === node.id)) {
        v.disabled = true;
        v.children.forEach((j) => {
          j.disabled = true;
        });
      }
    });
  } else {
    treeData.value.forEach((v) => {
      v.disabled = false;
      v.children.forEach((j) => {
        j.disabled = false;
      });
    });
  }
  treeData.value = [...treeData.value];
  nextTick(() => {
    treeRef.value.setCheckedNodes(checks);
  });
};

const handleChangeTab = (tab) => {
  state.activeTab = TYPES_MAP[tab];
  initChart(TYPES_MAP[tab]);
};

onMounted(() => {
  initChart(0);
});

const handleTimeChange = (val) => {};
const handleExport = () => {};
</script>
