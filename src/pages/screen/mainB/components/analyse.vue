<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-23 19:54:13
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-15 03:33:31
 * @Description: 
-->
<template>
  <div class="cs-box-content content">
    <div class="cs-header-content">
      <img src="@/assets/img/screen/mainB/u3.png" />用气趋势分析
      <div class="pull-right">
        <span class="cs-title-unit margin-right-small-2">单位：m³</span>
        <ul class="cs-btn-group">
          <li
            v-for="(item, index) in tabs"
            :key="index"
            :class="state.activeTab === index ? 'active' : ''"
            @click="handleChange(index)"
          >
            {{ item }}
          </li>
        </ul>
        <UnitSelect @change="changeYear" />
      </div>
    </div>
    <Echart id="chart2" class="cs-left-wrap5" :option="option" />
  </div>
</template>
<script setup name="Analysis">
import { ref, reactive } from "vue";
import { ANALYSE_OPT } from "./constant";
import Echart from "@/components/Echart.vue";
import UnitSelect from "../../mainA/components/unitSelect.vue";
const tabs = ["年", "月", "日"];
const unitMap = {
  0: { unit: "月", num: 12 },
  1: { unit: "日", num: 31 },
  2: { unit: ":00", num: 24 },
};
const option = ref(ANALYSE_OPT);
const state = reactive({
  activeTab: 1,
});
const randomArr = (times, num) => {
  return new Array(times).fill("").map((v) => (Math.random() * num).toFixed(0));
};
const handleChange = (index) => {
  if (state.activeTab !== index) {
    state.activeTab = index;
    const unit = unitMap[index];
    const newData = randomArr(unit.num, 100);
    option.value.xAxis[0].data = new Array(unit.num).fill("").map((v, i) => {
      return `${i + 1}${unit.unit}`;
    });
    option.value.series[0].data = newData;
  }
};
const changeYear = () => {
  option.value.series[0].data = option.value.series[0].data.map(
    (item) => item + Math.floor(Math.random() * 20)
  );
};
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
