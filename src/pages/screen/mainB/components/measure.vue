<template>
  <div class="cs-box-content content">
    <div class="cs-header-content">
      <img src="@/assets/img/screen/mainB/u8.png">分项计量
      <div class="pull-right">
        <span class="cs-title-unit margin-right-small-1">单位：kWh</span>
        <ul class="cs-btn-group">
          <li>年</li>
          <li>月</li>
          <li class="active">日</li>
        </ul>
      </div>
    </div>
    <Echart id="chart1" class="cs-left-wrap4" :option="option" />
  </div>
</template>
<script setup name="Measure">
import { ref, reactive } from "vue";
import { MEASURE_OPT } from "./constant";
import Echart from "@/components/Echart.vue";

const state = reactive({
  chartData: [
    { value: 30, name: '空调', rate: '30%' },
    { value: 20, name: '动力', rate: '20%' },
    { value: 28, name: '照明插座', rate: '28%' },
    { value: 22, name: '特殊', rate: '22%' },
  ]
})
const option = ref(MEASURE_OPT(state.chartData))
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