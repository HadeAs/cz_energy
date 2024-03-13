<!--
 * @Author: ymZhang
 * @Date: 2023-12-23 17:47:00
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-03-13 22:32:00
 * @Description: 
-->
<template>
  <div>
    <ProSearchContainer
      class="search"
      buttonContent="导出"
      :buttonConfig="buttonConfig()"
      :form-info="searchFormCfg"
      @button-click="handleExport"
      @search-change="searchChange"
      authKey="monitor_electric_export"
    />
    <EchartTreeContainer
      ref="treeRef"
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
  exportData,
} from "@/api/operationMgr/workMonitor";
import { ElMessage } from "element-plus";
import { exportWithExcel } from "@/utils";

const treeProps = {
  label: "name",
  children: "children",
};
const treeRef = ref();
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

const {
  searchParam,
  treeData,
  checkKeys,
  queryTree,
  tabChange,
  checkChange,
  searchChange,
  changeParam
} = useChart(
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

const buttonConfig = () => {
  return { disabled: checkKeys.value.length !== 1 };
};

watch(
  () => globalState.value.projectId,
  (val) => {
    changeParam({ prop: "projectId", value: val });
    queryTree(true, { projectId: val });
  }
);

const handleExport = async () => {
  ElMessageBox.confirm("确认导出选中数据吗？", "警告", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      const data = await exportData(globalState.value.projectId, {
        dataConfigId: checkKeys.value[0],
        ...searchParam.value,
      });
      if (data && !data.code) {
        exportWithExcel(data, "配电监测");
        ElMessage({
          type: "success",
          message: "导出成功",
        });
      }
    })
    .catch(() => {});
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
