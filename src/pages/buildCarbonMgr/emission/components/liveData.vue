<!--
 * @Author: ymZhang
 * @Date: 2024-01-11 15:51:57
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-19 11:46:48
 * @Description: 
-->
<template>
  <div style="background-color: white;padding: 6px 12px">
    <el-form :inline="true" :model="state.searchFormData" class="demo-form-inline">
      <el-form-item label="数据类型" style="margin-bottom: 0">
        <el-select v-model="state.searchFormData.dataType" @change="e => handleChange(e, 'dataType')" placeholder="选择数据类型">
          <el-option v-for="item in DATA_TYPE" :key="item.key" :label="item.name" :value="item.key" />
        </el-select>
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
    :chartOption="chartOption"
    :treeData="state.carbonTpyList"
    @tree-check-change="loadData"
    style="height: calc(100vh - 203px)"
  />
</template>

<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import { POWER_ECHART_OPT } from "@/constant/workMonitor";
import { DATA_TYPE } from "@/constant/carbton";
import EchartTreeContainer from "@/components/EchartTreeContainer.vue";
import { handleOpts, renderAxis, timeRender } from "@/utils";
import { getCarbonStandardList, getCarbonTpyList } from '@/api/common.js';
import { storeToRefs } from 'pinia';
import appStore from '@/store/index.js';
import { getActualData } from '@/api/buildCarbon/emission.js';
import dayjs from 'dayjs';
import { simServiceRequest } from '@/api/backstageMng/utils.js';

const { globalState } = storeToRefs(appStore.global);

const staList = ref([]);
const defaultKeys = ref();
const state = reactive({
  searchFormData: {
    projectId: globalState.value.projectId,
    dataType: 'summary',
    standardId: '',
    type: "hour",
    startDate: dayjs().subtract(1, "day").format(timeRender.common),
    endDate: dayjs().format(timeRender.common),
  },
  carbonTpyList: [],
});

const echartTreeRef = ref();
const chartOption = ref(handleOpts(POWER_ECHART_OPT));

const getUnit = (type) => {
  switch (type) {
    case 'summary':
      return 'tCO₂';
    case 'perPerson':
      return 'kgCO₂';
    case 'intensity':
      return 'kgCO₂/（m·a）';
    default: return 'tCO₂';
  }
}

const initChart = (list) => {
  const checks = echartTreeRef.value.getCheckedNodes();
  const checkchilds = checks.filter((v) => !v.children);
  const seriesData = [];
  const legendData = [];
  const unit = getUnit(state.searchFormData.dataType);
  checkchilds.forEach((item, index) => {
    legendData.push(item.label);
    seriesData.push({
      name: item.label,
      type: "line",
      smooth: false,
      showSymbol: false,
      data: (list?.[index] || []).map((i) => i?.data),
    });
  });
  chartOption.value.xAxis[0].data = list?.[0]?.map((i) =>
      renderAxis("hour", i?.createTime)
  );
  chartOption.value.legend.data = legendData;
  chartOption.value.series = seriesData;
  chartOption.value.yAxis[0].name = `单位：${unit}`;
  chartOption.value = { ...chartOption.value };
};

const handleChange = (value, type) => {
  if (type === 'dataType') {
    state.searchFormData.dataType = value;
  }
  if (type === 'standardId') {
    state.searchFormData.standardId = value;
  }
  loadData();
}

const loadData = async () => {
  const checks = echartTreeRef.value
      .getCheckedNodes()
      ?.filter((v) => !v.children);
  const data = checks?.length ? checks.map(i => i?.id) : defaultKeys.value;
  const res = await simServiceRequest(getActualData, data, { ...state.searchFormData }, 'carbonStatisticsId');
  initChart(res);
}

onMounted(async () => {
  const [tpyRes, staRes] = await Promise.all([getCarbonTpyList(), getCarbonStandardList()]);
  if (tpyRes?.data?.data) {
    state.carbonTpyList = [{
      id: 1,
      label: '碳排放量类别',
      children: tpyRes?.data?.data.map(({ id, name }) => ({ id, label: name })) || [],
    }];
    defaultKeys.value = state.carbonTpyList?.[0]?.children.map((i) => i?.id);
    echartTreeRef.value.setCheckedKeys(defaultKeys.value);
  }
  if (staRes?.data?.data) {
    state.searchFormData.standardId = staRes?.data?.data?.[0]?.id;
    staList.value = staRes?.data?.data || [];
  }
  await loadData();
});

watch(
  () => globalState.value.projectId,
  (id) => {
    state.searchFormData.projectId = id;
    loadData();
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
