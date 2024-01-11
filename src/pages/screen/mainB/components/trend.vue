<template>
  <div class="cs-box-content content">
    <div class="cs-header-content">
      <img src="@/assets/img/screen/mainB/u4.png" />用能趋势分析
      <div class="pull-right">
        <UnitSelect label="单位：kW·h" />
      </div>
    </div>
    <div class="cs-sub-header">
      <span class="cs-sub-header-text">用电趋势（逐月）</span>
    </div>
    <Echart id="chart3" class="cs-center-wrap1" :option="option1" />
    <div class="cs-sub-header">
      <span class="cs-sub-header-text">用电趋势（逐日）</span>
      <div class="cs-sub-right">
        <UnitSelect
          :options="state.dataMonth"
          :default-value="state.dataMonth[4].id"
        />
      </div>
    </div>
    <Echart id="chart4" class="cs-center-wrap2" :option="option2" />
    <div class="cs-sub-header">
      <span class="cs-sub-header-text">用电趋势（逐时）</span>
      <div class="cs-sub-right">
        <UnitSelect :options="state.dataDate" />
      </div>
    </div>
    <Echart id="chart5" class="cs-center-wrap3" :option="option3" />
  </div>
</template>
<script setup name="Trend">
import { reactive, ref } from "vue";
import { TREND_OPT1, TREND_OPT2, TREND_OPT3 } from "./constant";
import Echart from "@/components/Echart.vue";
import UnitSelect from "../../mainA/components/unitSelect.vue";

const option1 = ref(TREND_OPT1);
const option2 = ref(TREND_OPT2);
const option3 = ref(TREND_OPT3);

const state = reactive({
  dataMonth: [
    {
      id: 1,
      text: "1月",
    },
    {
      id: 2,
      text: "2月",
    },
    {
      id: 3,
      text: "3月",
    },
    {
      id: 4,
      text: "4月",
    },
    {
      id: 5,
      text: "5月",
      selected: true,
    },
    {
      id: 6,
      text: "6月",
    },
  ],
  dataDate: [
    {
      id: 1,
      text: "09-26",
    },
    {
      id: 2,
      text: "09-27",
    },
    {
      id: 3,
      text: "09-28",
    },
    {
      id: 4,
      text: "09-29",
    },
    {
      id: 5,
      text: "09-30",
    },
  ],
});
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
}
</style>
