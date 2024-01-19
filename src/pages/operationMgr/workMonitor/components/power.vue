<!--
 * @Author: ymZhang
 * @Date: 2023-12-23 17:47:00
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-17 12:21:14
 * @Description: 
-->
<template>
  <div>
    <ProSearchContainer
      class="search"
      buttonContent="导出"
      :form-info="searchFormCfg"
      @button-click="handleExport"
      @search-change="searchChange"
      authKey="monitor_electric_export"
    />
    <EchartTreeContainer
      :props="treeProps"
      :showSwitch="true"
      :conflict="false"
      :chartOption="chartOption"
      :defaultTreeCheckKeys="checkKeys"
      :treeData="treeData"
      @type-change="tabChange"
      @tree-check-change="checkChange"
      style="height: calc(100vh - 203px)"
    />
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { POWER_ECHART_OPT } from "@/constant/workMonitor";
import EchartTreeContainer from "@/components/EchartTreeContainer.vue";
import ProSearchContainer from "@/components/ProSearchContainer.vue";
import { handleOpts, formatXAxis } from "@/utils";
import useChart from "@/hooks/useChart";
import { storeToRefs } from "pinia";
import appStore from "@/store";
import {
  getTreeList,
  queryTrend,
  queryData,
  deleteDataInfo,
} from "@/api/operationMgr/workMonitor";
import { ElMessage } from "element-plus";

const treeProps = {
  label: "name",
  children: "children",
};
const { globalState } = storeToRefs(appStore.global);
const chartOption = ref(handleOpts(POWER_ECHART_OPT));
const state = reactive({
  searchParam: {
    projectId: globalState.value.projectId,
  },
  treeParam: {
    projectId: globalState.value.projectId,
    type: 1,
  },
});

const searchFormCfg = [
  {
    label: "时间范围",
    prop: "timeRange",
    type: "datetimerange",
    value: "",
  },
];

// 数据获取后更新echart视图
const updateChart = (datas, checkDatas, currentType) => {
  const seriesData = [];
  let unitLabel = "";
  checkDatas.forEach((item, index) => {
    const data = datas[index] || [];
    seriesData.push({
      name: item.name,
      type: "line",
      smooth: false,
      showSymbol: false,
      data: data.map((item) => item.data),
    });
    if (item.tag) {
      unitLabel = item.tag;
    }
  });
  chartOption.value.xAxis[0].data = (datas[0] || []).map((item) =>
    formatXAxis(item.createTime, currentType)
  );
  chartOption.value.legend.data = checkDatas.map((item) => item.name);
  if (unitLabel) {
    chartOption.value.yAxis[0].name = `单位：${unitLabel}`;
  } else {
    chartOption.value.yAxis[0].name = "";
  }
  chartOption.value.series = seriesData;
  chartOption.value = { ...chartOption.value };
};

// 预处理查询参数
const handleParam = (item) => {
  return { dataConfigId: item.id };
};

const queryDatas = async () => {
  const { data } = await queryData({ projectId: state.searchParam.projectId });
};
queryDatas();

const { treeData, checkKeys, tabChange, checkChange, searchChange, queryTree } =
  useChart(
    {
      api: queryTrend,
      param: state.searchParam,
      handleParam,
      updateChart,
    },
    {
      api: getTreeList,
      param: state.treeParam,
    }
  );

// const deleteNode = async ({ id }) => {
//   const { code } = await deleteDataInfo(state.searchParam.projectId, { id });
//   if (code === 200) {
//     queryTree();
//     ElMessage.success("删除成功");
//   }
// };

watch(
  () => globalState.value.projectId,
  (val) => {
    searchChange({ projectId: val });
  }
);

const handleExport = () => {};
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
