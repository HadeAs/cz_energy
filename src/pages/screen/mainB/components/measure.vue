<!--
 * @Author: ymZhang
 * @Date: 2023-12-23 12:10:31
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-22 14:35:00
 * @Description: 
-->
<template>
  <div class="cs-box-content content">
    <div class="cs-header-content">
      <img src="@/assets/img/screen/mainB/u8.png" />分项计量
      <div class="pull-right">
        <span class="cs-title-unit margin-right-small-1"
          >单位：{{ state.tag }}</span
        >
        <YearTabs @change="tabChange" />
      </div>
    </div>
    <Echart id="chart1" class="cs-left-wrap4" :option="option" />
  </div>
</template>
<script setup name="Measure">
import { ref, reactive, watch } from "vue";
import { MEASURE_OPT } from "./constant";
import Echart from "@/components/Echart.vue";
import YearTabs from "./yearTabs.vue";
import { powerAnalysis } from "@/api/screen/mainb";
import { judgeIfMock } from "@/utils";

const props = defineProps({
  projectId: { type: Number },
});
const state = reactive({
  activeTab: "year",
  tag: "kWh",
  chartData: [
    { value: 30, name: "空调", rate: "30%" },
    { value: 20, name: "动力", rate: "20%" },
    { value: 28, name: "照明插座", rate: "28%" },
    { value: 22, name: "特殊", rate: "22%" },
  ],
});

const option = ref(MEASURE_OPT(state.chartData));

const query = async () => {
  const { data } = await powerAnalysis({
    projectId: props.projectId,
    type: state.activeTab,
  });
  if (data?.list && !judgeIfMock()) {
    state.tag = data.tag;
    state.chartData = data.list.map((item) => ({
      ...item,
      name: item.sysClassName,
      value: item.totalAmount,
      rate: `${item.ratio}%`,
    }));
    option.value = MEASURE_OPT(state.chartData);
  }
};
query();

const tabChange = (tab) => {
  state.activeTab = tab;
  query();
};
watch(
  () => props.projectId,
  () => {
    query();
  }
);
</script>
<style lang="scss" scoped>
.content {
  height: 277px;

  .cs-left-wrap4 {
    width: 100%;
    height: 220px;
  }
}
</style>
