<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-23 19:54:13
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-29 15:36:55
 * @Description: 
-->
<template>
  <div class="cs-box-content content">
    <div class="cs-header-content">
      <img src="@/assets/img/screen/mainB/u3.png" />用气趋势分析
      <div class="pull-right">
        <span class="cs-title-unit margin-right-small-2">单位：m³</span>
        <ul class="cs-btn-group">
          <li>年</li>
          <li class="active">月</li>
          <li>日</li>
        </ul>
        <UnitSelect />
      </div>
    </div>
    <Echart id="chart2" class="cs-left-wrap5" :option="option" />
  </div>
</template>
<script setup name="Analysis">
import { ref } from "vue";
import { ANALYSE_OPT } from "./constant";
import Echart from "@/components/Echart.vue";
import UnitSelect from "../../mainA/components/unitSelect.vue";

const option = ref(ANALYSE_OPT);
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
