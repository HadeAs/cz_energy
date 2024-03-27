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
        <el-form-item label="年份" style="margin-bottom: 0">
          <el-date-picker
            type="year"
            v-model="state.searchFormData.year"
            @change="e => handleChange(e, 'year')"
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
      :showSwitch="false"
      :conflict="false"
      allowParent
      :chartOption="chartOption"
      :defaultTreeCheckKeys="baseData.map(i => i?.key)"
      :treeData="CARBON_NETURAL_CALCULATE_TREE_DATA"
      @tree-check-change="initChart"
      @type-change="handleChangeTab"
      @click-chart="handleClick"
      style="height: calc(100vh - 203px)"
    />
  </div>
  <ProDrawer title="配置碳信用抵消" ref="diDrawerRef" @confirm="confirmXdx">
    <DivisorDetail ref="diConfigRef" :curYear="detailYear" />
  </ProDrawer>
  <ProDrawer title="配置绿色家电购买抵消" ref="jdDrawerRef" @confirm="confirmJdx">
    <GreenPowerDetail ref="jdConfigRef" :curYear="detailYear" />
  </ProDrawer>
</template>

<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import cloneDeep from "lodash/cloneDeep";
import { POWER_ECHART_OPT } from "@/constant/workMonitor";
import {
  CARBON_NETURAL_CALCULATE_TREE_DATA,
  COMMON_SERIES_DATA,
} from "@/constant/carbton";
import EchartTreeContainer from "@/components/EchartTreeContainer.vue";
// import ProSearchContainer from "@/components/ProSearchContainer.vue";
import { handleOpts, renderAxis, timeRender } from "@/utils";
import { useRouter } from "vue-router";
import { getCarbonFactor, getList, postCredit, postGreenPower } from '@/api/buildCarbon/neutral.js';
import dayjs from 'dayjs';
import DivisorDetail from './divisorDetail.vue';
import GreenPowerDetail from './greenPowerDetail.vue';
import { getCarbonStandardList } from '@/api/common.js';
import { storeToRefs } from 'pinia';
import appStore from '@/store/index.js';

const router = useRouter();

const diDrawerRef = ref();
const diConfigRef = ref();
const jdDrawerRef = ref();
const jdConfigRef = ref();
const detailYear = ref(2024);
const echartTreeRef = ref();
const staList = ref([]);
const chartOption = ref(handleOpts(POWER_ECHART_OPT));

const emits = defineEmits([
  "reload",
]);

const { globalState } = storeToRefs(appStore.global);

const baseData = [
  { key: 'carbonBase', label: '碳排基准' },
  { key: 'energyReduce', label: '能源使用减少' },
  { key: 'greenEnergy', label: '绿色能源' },
  { key: 'carbonSink', label: '碳汇(植树等)' },
  { key: 'powerCarbonReduce', label: '电网碳排放因子降低' },
  { key: 'carbonSummary', label: '碳排放' },
  { key: 'carbonCreditAmount', label: '碳信用抵消(碳交易)' },
  { key: 'greenPowerAmount', label: '绿电购买抵消' },
  { key: 'netCarbonSummary', label: '净排放' },
];

const state = reactive({
  treeData: [],
  searchFormData: {
    projectId: globalState.value.projectId,
    type: "day",
    standardId: 1,
    year: dayjs().format(timeRender.year),
  },
  activeTab: 0,
});

const handleChange = (value, type) => {
  if (type === 'standardId') {
    state.searchFormData.standardId = value;
    detailYear.value = value;
  }
  if (type === 'year') {
    state.searchFormData.year = dayjs(value).format(timeRender.year);
    detailYear.value = dayjs(value).format(timeRender.year);
  }
  loadData();
}

const mockData = [850.3, 100, 100, 100, 150, 400.3, 100, 100, 200.3];

const getTopData = (record) => {
  return baseData.map((item, index) => {
    return {
      value: record?.[item?.key],
      // value: mockData?.[index],
      itemStyle: {
        color: {
          repeat: "repeat",
        },
      },
    }
  });
}

const getBottomData = (topArr) => {
  const bottomArr = [];
  topArr.forEach((item, index) => {
    if (index === 0) {
      bottomArr.push(0);
    } else {
      const topPrefix = topArr[index - 1].value;
      const bottomPrefix = bottomArr[index - 1];
      const max = Math.max(topPrefix, bottomPrefix);
      const diff = max - item.value;
      bottomArr.push(diff < 0 ? 0 : diff);
    }
  });
  return bottomArr;
}

const initChart = (record) => {
  const checks = echartTreeRef.value.getCheckedNodes();
  const seriesData = cloneDeep(COMMON_SERIES_DATA);
  const legendData = [];
  const lineData = [];
  const topData = getTopData(record);
  const btmData = getBottomData(topData);
  checks.forEach((item, index) => {
    legendData.push(item.label);
    seriesData[0].data.push(btmData[index]);
    seriesData[1].data.push({
      value: topData[index]?.value,
      itemStyle: {
        color: item.color,
      },
    });
    const prefix = new Array(index).fill().map((item) => "-");
    const max = Math.max(btmData[index], topData[index]?.value);
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
    name: "单位：t",
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

const handleChangeTab = async (tab) => {
  state.searchFormData.type = tab;
  // await loadData();
};

const handleClick = async (param) => {
  if (param.name === '绿电购买抵消') {
    jdDrawerRef.value.open();
  }
  const { standardId, year, projectId } = state.searchFormData;
  if (param.name === '电网碳排因子降低') {
    const res = await getCarbonFactor({ standardId, year, projectId });
    ElMessageBox.confirm(`变化前：${res.data?.prevYear || 0}，变换后：${res.data?.thisYear || 0}`, "碳排因子变化前后", {
      confirmButtonText: '关闭',
      type: "info",
      showCancelButton: false,
    })
  }
  if (param.name === '碳信用抵消(碳交易)') {
    diDrawerRef.value.open();
  }
};

const confirmXdx = async () => {
  const res = await diConfigRef.value.validate();
  if (res) {
    const postRes = await postCredit({
      ...res,
      year: Number(renderAxis('year', res.year)),
      projectId: globalState.value.projectId,
    })
    if (postRes && postRes?.code === 200) {
      loadData();
      diDrawerRef.value.close();
    }
  }
}

const confirmJdx = async () => {
  const res = await jdConfigRef.value.validate();
  if (res) {
    const postRes = await postGreenPower({
      ...res,
      year: Number(renderAxis('year', res.year)),
      projectId: globalState.value.projectId,
    })
    if (postRes && postRes?.code === 200) {
      loadData();
      jdDrawerRef.value.close();
    }
  }
}

const loadData = async () => {
  const { standardId, year, projectId } = state.searchFormData;
  const res = await getList({ standardId, year, projectId });
  initChart(res?.data);
};

onMounted(async () => {
  await getCarbonStandardList().then(staRes => {
    staList.value = staRes?.data?.data || [];
    state.searchFormData.standardId = staRes?.data?.data?.[0]?.id;
  })
  await loadData();
});
const handleSearchChange = (type) => {
  initChart();
};

watch(
  () => globalState.value.projectId,
  async (id) => {
    state.searchFormData.projectId = id;
    await loadData();
  }
);

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
