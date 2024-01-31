<template>
  <MainContentContainer class="process-container">
    <el-row class="title-container" align="middle" :gutter="5">
      <el-col :span="20">
        <span class="title">净碳排放量趋势</span>
      </el-col>
      <el-col :span="4">
        <el-button @click="handleConfigTarget">配置碳排放目标</el-button>
      </el-col>
    </el-row>
    <div class="content">
      <Echart :option="chartOption" />
    </div>
  </MainContentContainer>
  <ProDrawer title="配置碳达峰、中和目标" ref="targetDrawerRef" @confirm="confirmTarget">
    <TargetConfig ref="targetConfigRef" />
  </ProDrawer>
</template>
<script setup name="ProcessContainer">
import { ref, reactive, watch } from "vue";
import Echart from "@/components/Echart.vue";
import { POWER_ECHART_OPT } from "@/constant/workMonitor";
import { handleOpts, renderAxis, timeRender } from "@/utils";
import dayjs from 'dayjs';
import TargetConfig from './targetConfig.vue';
import { postTarget } from '@/api/buildCarbon/neutral.js';
import { storeToRefs } from 'pinia';
import appStore from '@/store/index.js';

const { globalState } = storeToRefs(appStore.global);

const targetDrawerRef = ref();
const targetConfigRef = ref();

const emits = defineEmits([
  "reload",
]);

const dataMaps = [
  {
    name: "目标趋势预测",
    value: "target",
    lineColor: "#191b1a",
    lineType: "dashed",
    bgColor: "#fff",
  },
  {
    name: "目标趋势",
    value: "targetTrend",
    lineColor: "#fed135",
    lineType: "solid",
    bgColor: "#fff5d7",
  },
  {
    name: "实际趋势",
    value: "actualTrend",
    lineColor: "#916aff",
    lineType: "solid",
    bgColor: "#e1d7ff",
  },
];
const chartOption = ref(handleOpts(POWER_ECHART_OPT));
const state = reactive({
  timeRange: [],
  activeTab: 0,
});

const props = defineProps({
  chartData: {
    type: Object,
    default: {},
  },
})

const getDashData = (targetNetCarbonList) => {
  return targetNetCarbonList.map(i => {
    if (Number(dayjs(i?.createTime).format(timeRender.year)) >= Number(dayjs().format(timeRender.year))) {
      return i;
    } else {
      return { ...i, data: '-' };
    }
  });
}

const handleConfigTarget = () => {
  targetDrawerRef.value.open();
};

const confirmTarget = async () => {
  const res = await targetConfigRef.value.validate();
  if (res) {
    const postRes = await postTarget({ ...res, projectId: globalState.value.projectId, })
    if (postRes && postRes?.code === 200) {
      emits("reload", {});
      targetDrawerRef.value.close();
    }
  }
}

const initChart = ({ targetNetCarbonList, realNetCarbonList }) => {
  const dashData = getDashData(targetNetCarbonList);
  const chartData = [dashData, targetNetCarbonList, realNetCarbonList];
  const seriesData = [];
  const legendData = [];
  dataMaps.forEach((item, index) => {
    legendData.push(item.name);
    seriesData.push({
      name: item.name,
      type: "line",
      smooth: false,
      showSymbol: false,
      data: chartData?.[index]?.map(i => i?.data),
      areaStyle: {
        color: item.bgColor,
      },
      lineStyle: {
        color: item.lineColor,
        type: index === 0 ? "dashed" : "solid",
      },
    });
  });
  chartOption.value.yAxis[0].name = "单位：tCO₂";
  chartOption.value.xAxis[0].data = targetNetCarbonList.map(i => renderAxis('year', i?.createTime));
  chartOption.value.legend = {
    data: legendData,
  };
  chartOption.value.series = seriesData;
  chartOption.value = { ...chartOption.value };
};

watch(
  () => props.chartData,
  (val) => {
    initChart(val);
  }
);

</script>
<style lang="scss" scoped>
.process-container {
  display: flex;
  flex-direction: column;
  padding: 10px 0 0 0 !important;
  .title-container {
    padding: 0 16px;
    .title {
      font-size: 16px;
      font-weight: 700;
    }
  }
  .content {
    flex: 1;
    margin-top: 15px;
    position: relative;
    :deep() {
      .el-tabs {
        position: absolute;
        right: 0;
        top: -10px;
        .el-tabs__item {
          height: 35px;
          line-height: 40px !important;
          font-size: 14px !important;
        }
      }
      .el-tabs__nav-wrap::after {
        display: none;
      }
    }
  }
}
</style>
