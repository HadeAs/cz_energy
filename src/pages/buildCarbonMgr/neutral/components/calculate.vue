<!--
 * @Author: ymZhang
 * @Date: 2024-01-12 14:17:53
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-19 13:27:48
 * @Description: 
-->
<template>
  <div>
    <div style="background-color: white;padding: 6px 12px">
      <el-form :inline="true" :model="state.searchFormData" class="demo-form-inline">
        <el-form-item label="数据类型" style="margin-bottom: 0">
          <el-date-picker
            type="year"
            v-model="state.searchFormData.date"
            @change="e => handleChange(e, 'date')"
          />
        </el-form-item>
        <el-form-item label="排放标准" style="margin-bottom: 0">
          <el-select v-model="state.searchFormData.standardId" @change="e => handleChange(e, 'standardId')" placeholder="选择排放标准">
            <el-option v-for="item in staList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <EchartTreeContainer
      ref="echartTreeRef"
      :showSwitch="true"
      :conflict="false"
      allowParent
      :chartOption="chartOption"
      :defaultTreeCheckKeys="[11, 12, 13, 14, 21, 22, 23]"
      :treeData="CARBON_NETURAL_CALCULATE_TREE_DATA"
      @tree-check-change="initChart"
      @type-change="handleChangeTab"
      @click-chart="handleClick"
      style="height: calc(100vh - 203px)"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import cloneDeep from "lodash/cloneDeep";
import { TYPES_MAP, POWER_ECHART_OPT } from "@/constant/workMonitor";
import {
  CARBON_NETURAL_CALCULATE_TREE_DATA,
  COMMON_SERIES_DATA,
} from "@/constant/carbton";
import EchartTreeContainer from "@/components/EchartTreeContainer.vue";
// import ProSearchContainer from "@/components/ProSearchContainer.vue";
import { handleOpts, timeRender } from "@/utils";
import { useRouter } from "vue-router";
import { getList } from '@/api/buildCarbon/neutral.js';
import dayjs from 'dayjs';
import { getCarbonStandardList } from '@/api/common.js';
import { storeToRefs } from 'pinia';
import appStore from '@/store/index.js';

const router = useRouter();
const echartTreeRef = ref();
const staList = ref([]);
const chartOption = ref(handleOpts(POWER_ECHART_OPT));

const { globalState } = storeToRefs(appStore.global);

// const

const state = reactive({
  treeData: [],
  searchFormData: {
    projectId: globalState.value.projectId,
    type: "day",
    standardId: 1,
    date: dayjs().format(timeRender.year),
  },
  activeTab: 0,
});

const basicTop = [
  [850.3, 100, 100, 100, 150, 400.3, 100, 100, 200.3],
  [956.3, 150, 150, 150, 506.3, 100, 100, 100, 206.3],
  [1200, 200, 200, 250, 550, 100, 100, 350, 200],
  [2000, 350, 350, 250, 1050, 500, 200, 350, 200],
];
const basicBottom = [
  [0, 750.3, 650.3, 550.3, 400.3, 0, 300.3, 200.3, 0],
  [0, 806.3, 656.3, 506.3, 0, 406.3, 306.3, 206.3, 0],
  [0, 1000, 800, 550, 0, 450, 350, 0, 150],
  [0, 1650, 1300, 1050, 0, 550, 350, 0, 150],
];

const initChart = (list) => {
  const checks = echartTreeRef.value.getCheckedNodes();
  // const checkchilds = [totalMap, ...checks.filter((v) => !v.children)];
  const seriesData = cloneDeep(COMMON_SERIES_DATA);
  const legendData = [];
  const lineData = [];
  // if (!checks.length) return;
  const num = state.activeTab % 4;
  console.log(`num`, num);
  const basicTop_copy = [...basicTop[num]];
  const basicBottom_copy = [...basicBottom[num]];
  console.log(`list`, list);
  console.log(`list`, basicTop_copy, basicBottom_copy);
  checks.forEach((item, index) => {
    legendData.push(item.label);
    seriesData[0].data.push(basicBottom_copy[index]);
    seriesData[1].data.push({
      value: basicTop_copy[index],
      itemStyle: {
        color: item.color,
      },
    });
    const prefix = new Array(index).fill().map((item) => "-");
    const max = Math.max(basicBottom_copy[index], basicTop_copy[index]);
    lineData.push({
      name: `test${index}`,
      type: "line",
      lineStyle: {
        color: "#b5bcc7",
      },
      showSymbol: false,
      tooltip: {
        show: false,
      },
      data: [...prefix, max, max],
    });
  });
  seriesData[1].label.formatter = (data) => {
    return legendData[data.dataIndex];
  };
  chartOption.value.legend = { show: false };
  chartOption.value.yAxis[0] = {
    ...chartOption.value.yAxis[0],
    name: "单位：万t",
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: "#fff",
    },
  };
  chartOption.value.tooltip = {
    ...chartOption.value.tooltip,
    axisPointer: {
      type: "shadow",
    },
  };
  chartOption.value.xAxis[0].axisLabel = { show: false };
  chartOption.value.xAxis[0].data = legendData;
  chartOption.value.series = [...seriesData, ...lineData];
  chartOption.value = { ...chartOption.value };
};

const handleChangeTab = (tab) => {
  state.activeTab = TYPES_MAP[tab];
  initChart();
};

const handleClick = (param) => {
  const params = {};
  switch (param.name) {
    case "能源使用减少":
      params.check = [24];
      break;
    case "绿色能源":
      params.check = [21, 22, 23];
      break;
    case "碳汇(植树等）":
      params.check = [25];
      break;
    default:
      break;
  }
  if (params.check) {
    router.push({
      name: "carbonReduction",
      query: { id: params.check.join(",") },
    });
  }
};

onMounted(async () => {
  await getCarbonStandardList().then(staRes => {
    staList.value = staRes?.data?.data || [];
    state.searchFormData.standardId = staRes?.data?.data?.[0]?.id;
  })
  const { standardId, date, projectId } = state.searchFormData;
  const res = await getList({ standardId, year: date, projectId });
  console.log(`res?.data?.data`, res?.data);
  initChart(res?.data);
});
const handleSearchChange = (type) => {
  initChart();
};
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
