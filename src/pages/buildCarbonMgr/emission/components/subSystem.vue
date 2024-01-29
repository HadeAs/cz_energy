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
import { DATA_TYPE } from "@/constant/carbton";
import { TYPES_MAP, POWER_ECHART_OPT } from "@/constant/workMonitor";
import EchartTreeContainer from "@/components/EchartTreeContainer.vue";
import { getSearchNode, getUnit, handleOpts, renderAxis, renderTreeData, timeRender } from "@/utils";
import { getCarbonClassSide, getQsDataByClass } from '@/api/buildCarbon/emission.js';
import { storeToRefs } from 'pinia';
import appStore from '@/store/index.js';
import dayjs from 'dayjs';
import { getCarbonStandardList } from '@/api/common.js';
import { simServiceRequest } from '@/api/backstageMng/utils.js';

const { globalState } = storeToRefs(appStore.global);

const echartTreeRef = ref();
const chartOption = ref(handleOpts(POWER_ECHART_OPT));

const staList = ref([]);
const defaultKeys = ref([]);
const state = reactive({
  searchFormData: {
    projectId: globalState.value.projectId,
    dataType: 'summary',
    standardId: '',
    type: "day",
    date: [dayjs().subtract(7, "day").format(timeRender.common), dayjs().format(timeRender.common)],
  },
  treeData: [],
});

const handleChange = (value, type) => {
  if (type === 'dataType') {
    state.searchFormData.dataType = value;
  }
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

const initChart = (res) => {
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
      data: (res?.[index] || []).map((i) => i?.data),
    });
  });
  chartOption.value.xAxis[0].data = res?.[0]?.map((i) =>
      renderAxis(state.searchFormData.type, i?.createTime)
  );
  chartOption.value.legend.data = legendData;
  chartOption.value.series = seriesData;
  chartOption.value.yAxis[0].name = `单位：${unit}`;
  chartOption.value = { ...chartOption.value };
};

const loadData = async () => {
  const checks = echartTreeRef.value
      .getCheckedNodes()
      ?.filter((v) => !v.children);
  const data = getSearchNode(checks?.length ? checks : defaultKeys.value);
  const searchDate = state.searchFormData.date.map(i => dayjs(i).format(timeRender.common))
  const res = await simServiceRequest(getQsDataByClass, data?.childIds, {
    ...state.searchFormData,
    carbonStatisticsId: data?.faId,
    startDate: searchDate?.[0],
    endDate: searchDate?.[1],
    date: undefined,
  }, 'sysClassId');
  initChart(res);
}

onMounted(async () => {
  const [sideRes, staRes] = await Promise.all([
    getCarbonClassSide({ projectId: globalState.value.projectId }),
    getCarbonStandardList(),
  ]);
  if (sideRes) {
    state.treeData = renderTreeData(
      sideRes,
      ["carbonStatisticsName", "name"],
      "carbonStatisticsId"
    );
    defaultKeys.value = state.treeData?.[0]?.children;
    echartTreeRef.value.setCheckedKeys(defaultKeys.value.map(i => i?.id));
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
