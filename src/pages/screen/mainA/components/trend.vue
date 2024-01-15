<!--
 * @Author: ymZhang
 * @Date: 2023-12-22 23:12:58
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-15 02:37:58
 * @Description: 
-->
<template>
  <div class="cs-box-content content">
    <div class="cs-header-content">
      <img src="@/assets/img/screen/mainA/u3.png" />碳排放趋势
      <div class="pull-right">
        <UnitSelect label="单位：t" @change="handleChange" />
      </div>
    </div>
    <Echart id="chart2" class="cs-left-wrap4" :option="option" />
  </div>
</template>
<script setup name="Trend">
import { ref } from "vue";
import Echart from "@/components/Echart.vue";
import UnitSelect from "./unitSelect.vue";
import { LINE_OPT } from "./constant";
const option = ref(LINE_OPT);
// const state = reactive({
//   value: "2023",
//   opts: ["2023", "2022", "2021"]
// })
const handleChange = () => {
  option.value.series[0].data = option.value.series[0].data.map(
    (v) => v + Math.floor(Math.random() * 70)
  );
};
</script>
<style lang="scss" scoped>
.content {
  height: 238px;

  .cs-left-wrap4 {
    width: 100%;
    height: 192px;
  }
}
</style>
