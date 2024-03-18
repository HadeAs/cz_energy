<template>
  <div class="cs-box-content content">
    <div class="cs-header-content">
      <img src="@/assets/img/screen/mainB/u4.png" />用能趋势分析
      <div class="pull-right">
        <span class="cs-title-unit margin-right-base"
          >单位：{{ state.tag }}</span
        >
        <el-date-picker
          v-model="state.year"
          type="year"
          :clearable="false"
          value-format="YYYY"
          @change="(val) => handleChange(val, 'month')"
        />
      </div>
    </div>
    <div class="cs-sub-header">
      <span class="cs-sub-header-text">用电趋势（逐月）</span>
    </div>
    <Echart id="chart3" class="cs-center-wrap1" :option="option1" />
    <div class="cs-sub-header">
      <span class="cs-sub-header-text">用电趋势（逐日）</span>
      <div class="cs-sub-right">
        <el-date-picker
          v-model="state.month"
          type="month"
          :clearable="false"
          value-format="YYYY-MM"
          @change="(val) => handleChange(val, 'day')"
        />
      </div>
    </div>
    <Echart id="chart4" class="cs-center-wrap2" :option="option2" />
    <div class="cs-sub-header">
      <span class="cs-sub-header-text">用电趋势（逐时）</span>
      <div class="cs-sub-right">
        <el-date-picker
          v-model="state.date"
          type="date"
          :clearable="false"
          :value-format="COMMON_DATE_FORMAT"
          @change="(val) => handleChange(val, 'hour')"
        />
      </div>
    </div>
    <Echart id="chart5" class="cs-center-wrap3" :option="option3" />
  </div>
</template>
<script setup name="Trend">
import { reactive, ref, watch } from "vue";
import { TREND_OPT1, TREND_OPT2, TREND_OPT3 } from "./constant";
import Echart from "@/components/Echart.vue";
import { queryPowerTrend } from "@/api/screen/mainb";
import { COMMON_DATE_FORMAT } from "@/constant";
import dayjs from "dayjs";
import { judgeIfMock, formatXAxis } from "@/utils";

const props = defineProps({
  projectId: { type: Number },
});

const option1 = ref(TREND_OPT1);
const option2 = ref(TREND_OPT2);
const option3 = ref(TREND_OPT3);

const getCurrentDay = () => {
  const now = dayjs();
  const year = now.format("YYYY");
  const month = now.format("YYYY-MM");
  const date = now.format(COMMON_DATE_FORMAT);
  return [year, month, date];
};

const result = getCurrentDay();
const state = reactive({
  tag: "kWh",
  year: result[0],
  month: result[1],
  date: result[2],
});

const getDateRange = (type) => {
  let startDate = "";
  let endDate = "";
  if (type === "month") {
    startDate = `${state.year}-01-01 00:00:00`;
    endDate = `${state.year}-12-31 23:59:59`;
  } else if (type === "hour") {
    startDate = `${state.date} 00:00:00`;
    endDate = `${state.date} 23:59:59`;
  } else {
    startDate =
      dayjs(state.month).startOf("month").format(COMMON_DATE_FORMAT) +
      " 00:00:00";
    endDate =
      dayjs(state.month).endOf("month").format(COMMON_DATE_FORMAT) +
      " 23:59:59";
  }
  return { startDate, endDate };
};

const queryData = async (type) => {
  const param = getDateRange(type);
  const { data } = await queryPowerTrend({
    projectId: props.projectId,
    type,
    ...param,
  });
  if (data?.list && !judgeIfMock()) {
    const legendData = data.list.map((item) => item.sysClassName);
    const xData = (data.list[0]?.dataList || []).map((item) =>
      formatXAxis(item.createTime, type)
    );
    const seriesData = data.list.map((item) => {
      return {
        name: item.sysClassName,
        type: "bar",
        stack: "用电",
        barMaxWidth: 16,
        data: item.dataList.map((v) => v.data),
      };
    });
    if (type === "month") {
      option1.value.legend.data = legendData;
      option1.value.xAxis[0].data = xData;
      option1.value.series = seriesData;
      option1.value = { ...option1.value };
    } else if (type === "day") {
      option2.value.legend.data = legendData;
      option2.value.xAxis[0].data = xData;
      option2.value.series = seriesData;
      option2.value = { ...option2.value };
    } else {
      option3.value.legend.data = legendData;
      option3.value.xAxis[0].data = xData;
      option3.value.series = seriesData;
      option3.value = { ...option3.value };
    }
  }
};

const init = () => {
  queryData("month");
  queryData("day");
  queryData("hour");
};
init();

const handleChange = (val, type) => {
  queryData(type);
};

watch(
  () => props.projectId,
  () => {
    init();
  }
);
</script>
<style lang="scss" scoped>
.content {
  height: 976px;

  .cs-center-wrap1,
  .cs-center-wrap2,
  .cs-center-wrap3 {
    width: 100%;
    height: 270px;
  }
  :deep() {
    .el-date-editor.el-input {
      width: 100px;
      height: 28px;
      color: #fff;
      .el-input__prefix-inner {
        display: none;
      }
      .el-input__wrapper {
        background: transparent;
        box-shadow: 0 0 0 1px rgba(110, 215, 254, 0.4) inset;
      }
      .el-input__inner {
        color: #fff;
      }
    }
  }
}
</style>
