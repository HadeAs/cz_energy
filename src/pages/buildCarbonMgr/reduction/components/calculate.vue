<!--
 * @Author: ymZhang
 * @Date: 2024-01-11 19:46:28
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-19 13:30:06
 * @Description: 
-->
<template>
  <div>
    <div style="background-color: white;padding: 6px 12px">
      <el-form :inline="true" :model="state.searchFormData" class="demo-form-inline">
        <el-form-item label="数据类型" style="margin-bottom: 0">
          <el-date-picker
              v-model="state.searchFormData.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
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
      :chartOption="chartOption"
      :treeData="state.treeData"
      @tree-check-change="loadData"
      @type-change="handleTypeChange"
      style="height: calc(100vh - 203px)"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import { POWER_ECHART_OPT } from "@/constant/workMonitor";
import { CARBTON_CALCULATE_TREE_DATA } from "@/constant/carbton";
import EchartTreeContainer from "@/components/EchartTreeContainer.vue";
import { getSearchNode, getUnit, handleOpts, renderAxis, renderTreeData, timeRender } from "@/utils";
import { useRoute } from "vue-router";
import { getCarbonBase, getCrBath, getSideBar } from '@/api/buildCarbon/calculate.js';
import { storeToRefs } from 'pinia';
import appStore from '@/store/index.js';
import dayjs from 'dayjs';
import { getCarbonStandardList } from '@/api/common.js';

const { globalState } = storeToRefs(appStore.global);
const route = useRoute();
const { query } = route;

const echartTreeRef = ref();
const defaultKeys = ref();
const chartOption = ref(handleOpts(POWER_ECHART_OPT));
const staList = ref([]);

const state = reactive({
  treeData: [],
  searchFormData: {
    projectId: globalState.value.projectId,
    type: "day",
    standardId: 1,
    dataType: "",
    date: [dayjs().subtract(7, "day").format(timeRender.common), dayjs().format(timeRender.common)],
  },
  activeTab: 0,
  defaultCheck: query.id ? query.id.split(",") : [11, 12, 13],
});

const handleChange = (value, type) => {
  if (type === 'standardId') {
    state.searchFormData.standardId = value;
  }
  if (type === 'date') {
    state.searchFormData.date = value;
  }
  loadData();
}

const handleTypeChange = (val) => {
  state.searchFormData.type = val;
  // switch (val) {
  //   case "day":
  //     state.searchFormData.date = [dayjs().subtract(7, "day").format(timeRender.common), dayjs().format(timeRender.common)];
  //     break;
  //   case "month":
  //     state.searchFormData.date = [dayjs().subtract(12, "month").format(timeRender.common), dayjs().format(timeRender.common)];
  //     break;
  //   case "year":
  //     state.searchFormData.date = [dayjs().subtract(10, "year").format(timeRender.common), dayjs().format(timeRender.common)];
  //     break;
  //   default:
  //     break;
  // }
  loadData();
};

const initChart = (list) => {
  const checks = echartTreeRef.value.getCheckedNodes().filter((v) => !v.children);
  const seriesData = [];
  const legendData = [];
  // const unit = getUnit(state.searchFormData.dataType);
  checks.forEach((item, index) => {
    const legendLabel = CARBTON_CALCULATE_TREE_DATA?.[0]?.children?.[index].label;
    legendData.push(legendLabel);
    seriesData.push({
      name: legendLabel,
      type: "line",
      smooth: false,
      showSymbol: false,
      data: (list?.[index] || []).map((i) => i?.data),
      areaStyle: {
        color: item.color,
      },
      lineStyle: {
        color: item.borderColor,
        type: index % 3 === 0 ? "dashed" : "solid",
      },
    });
  });
  chartOption.value.xAxis[0].data = list?.[0]?.map((i) =>
      renderAxis(state.searchFormData.type, i?.createTime)
  );
  chartOption.value.yAxis[0].name = `单位：tCO₂`;
  chartOption.value.legend.data = legendData;
  chartOption.value.series = seriesData;
  chartOption.value = { ...chartOption.value };
};

const loadSideBar = async () => {
  const res = await getSideBar({ projectId: globalState.value.projectId });
  if (res && res?.code === 200) {
    state.treeData = renderTreeData(
      res?.data?.data,
      ["carbonStatisticsGroupName", "name"],
      "carbonStatisticsId"
    );
    defaultKeys.value = state.treeData?.[0]?.children;
    echartTreeRef.value.setCheckedKeys(defaultKeys.value.map(i => i?.id));
  }
}

const loadData = async () => {
  const [startDate, endDate] = state.searchFormData.date.map(i => dayjs(i).format(timeRender.common))
  const res = await getCarbonBase({ ...state.searchFormData, startDate, endDate });
  const checks = echartTreeRef.value
      .getCheckedNodes()
      ?.filter((v) => !v.children);
  const data = getSearchNode(checks?.length ? checks : defaultKeys.value);
  const bathRes = await getCrBath(data.childIds, { ...state.searchFormData, startDate, endDate });
  const sjData = res?.data?.data?.map((item, index) => {
    return { ...item, data: (item?.data || 0) - (bathRes?.[index]?.data || 0) }
  });
  getCarbonStandardList().then(staRes => staList.value = staRes?.data?.data || [])
  initChart([res?.data?.data, bathRes, sjData]);
}

onMounted(async () => {
  await loadSideBar();
  await loadData();
});

watch(
  () => globalState.value.projectId,
  async (id) => {
    state.searchFormData.projectId = id;
    console.log(`1111`);
    await loadSideBar();
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
