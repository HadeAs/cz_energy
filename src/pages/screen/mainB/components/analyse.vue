<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-23 19:54:13
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-22 15:23:25
 * @Description: 
-->
<template>
  <div class="cs-box-content content">
    <div class="cs-header-content">
      <img src="@/assets/img/screen/mainB/u3.png" />用气趋势分析
      <div class="pull-right">
        <span class="cs-title-unit margin-right-small-2"
          >单位：{{ state.tag }}</span
        >
        <YearTabs :default-tab="state.activeTab" @change="tabChange" />
        <UnitSelect :default-value="state.activeYear" @change="changeYear" />
      </div>
    </div>
    <Echart id="chart2" class="cs-left-wrap5" :option="option" />
  </div>
</template>
<script setup name="Analysis">
import { ref, reactive, watch } from "vue";
import { ANALYSE_OPT } from "./constant";
import Echart from "@/components/Echart.vue";
import UnitSelect from "../../mainA/components/unitSelect.vue";
import { queryAasTrend } from "@/api/screen/mainb";
import { formatXAxis } from "@/utils";
import dayjs from "dayjs";
import YearTabs from "./yearTabs.vue";
import { COMMON_DATE_TIME_FORMAT } from "@/constant";

const props = defineProps({
  projectId: { type: Number },
});
const option = ref(ANALYSE_OPT);
const state = reactive({
  tag: "m³",
  activeTab: "month",
  activeYear: "2023",
});

const query = async () => {
  const currentYear = dayjs().format("YYYY");
  const param = {
    startDate: `${state.activeYear}-01-01 00:00:00`,
    endDate:
      state.activeYear < currentYear
        ? `${state.activeYear}-12-31 23:59:59`
        : dayjs().format(COMMON_DATE_TIME_FORMAT),
  };
  const { data } = await queryAasTrend({
    projectId: props.projectId,
    type: state.activeTab,
    ...param,
  });
  if (data?.list) {
    option.value.xAxis[0].data = data.list.map((item) =>
      formatXAxis(item.createTime, state.activeTab)
    );
    option.value.series[0].data = data.list.map((item) => item.data);
  }
};
query();

const tabChange = (tab) => {
  state.activeTab = tab;
  query();
};
const changeYear = (value) => {
  state.activeYear = value;
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
  height: 265px;

  .cs-left-wrap5 {
    width: 100%;
    height: 210px;
  }
}
</style>
