<template>
  <EchartTreeContainer>
    <template #left>
      <Echart :option="chartOption" />
      <ul class="time-type" id="timeType1">
        <li v-for="item in state.tabList" :key="item.id" :class="state.activeTab === item.id ? 'active' : ''"
          @click="handleChangeTab(item.id)">{{ item.label }}</li>
      </ul>
    </template>
    <template #right>
      <el-input v-model="varName" placeholder="请输入内容" :prefix-icon="Search" style="margin-bottom: 10px" />
      <el-tree :data="treeData" show-checkbox node-key="id" ref="treeRef" default-expand-all
        @check="initChart(state.activeTab)" :default-checked-keys="[11, 12, 13]" :filter-node-method="filterNode" />
    </template>
  </EchartTreeContainer>
</template>

<script setup>
import { ref, watch, reactive, onMounted, nextTick } from "vue";
import { Search } from "@element-plus/icons-vue";
import Echart from "@/components/Echart.vue";
import { POWER_ECHART_OPT, POWER_TREE_DATA, UNIT_MAP } from "@/constant/workMonitor";
import EchartTreeContainer from "@/components/EchartTreeContainer.vue";

const varName = ref("");
const treeRef = ref();
const chartOption = ref(POWER_ECHART_OPT);
const treeData = ref(POWER_TREE_DATA);
const state = reactive({
  tabList: [
    { id: 0, label: "时能耗" },
    { id: 1, label: "天能耗" },
    { id: 2, label: "月能耗" },
    { id: 3, label: "年能耗" }
  ],
  activeTab: 0
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
  chartOption.value.xAxis[0].data = new Array(unit.num)
    .fill("")
    .map((v, i) => `${i}${unit.unit}`);
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
}

const handleChangeTab = (tab) => {
  if (state.activeTab !== tab) {
    state.activeTab = tab;
    initChart(tab);
  }
}

onMounted(() => {
  initChart(0);
});
</script>
<style lang="scss" scoped>
.time-type {
  list-style: none;
  padding: 0;
  margin: 0;
}

.time-type li {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  padding: 0 12px;
  cursor: pointer;
}

.time-type li.active {
  color: #2B3EB1;
  position: relative;
}

.time-type li.active::after {
  content: '';
  width: 100%;
  height: 2px;
  background-color: #2B3EB1;
  position: absolute;
  left: 0;
  bottom: 0;
}
</style>
