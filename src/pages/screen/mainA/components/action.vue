<template>
  <div class="cs-box-content content" style="height: 343px;">
    <div class="cs-header-content">
      <img src="@/assets/img/screen/mainA/u6.png">碳减排举措追踪
    </div>
    <div class="cs-sub-header">
      <span class="cs-sub-header-text">最新举措</span>
    </div>
    <div class="cs-right-wrap3">
      <div class="cs-info-wrap color1">
        <span class="cs-info-label">能源类</span>
        <span class="cs-info-detail">光伏发电</span>
      </div>
      <div class="cs-info-wrap color2">
        <span class="cs-info-label">业务类</span>
        <span class="cs-info-detail">供热改造</span>
      </div>
      <div class="cs-info-wrap color3">
        <span class="cs-info-label">能效类</span>
        <span class="cs-info-detail">节能电器</span>
      </div>
      <div class="cs-info-wrap color2">
        <span class="cs-info-label">业务类</span>
        <span class="cs-info-detail">供热改造</span>
      </div>
      <div class="cs-info-wrap color3">
        <span class="cs-info-label">能效类</span>
        <span class="cs-info-detail">节能电器</span>
      </div>
      <div class="cs-info-wrap color1">
        <span class="cs-info-label">能源类</span>
        <span class="cs-info-detail">光伏发电</span>
      </div>
    </div>
    <div class="cs-sub-header">
      <span class="cs-sub-header-text">碳减排趋势</span>
      <div class="cs-sub-right">
        <span class="cs-right-text">单位：t</span>
      </div>
    </div>
    <!-- <div class="cs-right-wrap4" id="chart4"></div> -->
    <Echart class="cs-right-wrap4" id="chart4" :option="option" />
  </div>
</template>
<script setup name="Action">
import { ref } from "vue";
import { LINE_OPT2 } from "./constant";
import Echart from "@/components/Echart.vue";
const option = ref(LINE_OPT2);
</script>
<style lang="scss" scoped>
.content {
  height: 343px;

  .cs-right-wrap3 {
    display: flex;
    flex-wrap: wrap;
    margin-top: 12px;
  }

  .cs-right-wrap3 .cs-info-wrap {
    height: 20px;
    line-height: 18px;
    border-radius: 3px;
    margin-right: 6px;
    margin-bottom: 6px;
    font-size: 12px;
    border: 1px solid #acabb4;
  }

  .cs-right-wrap3 .cs-info-wrap .cs-info-label {
    display: inline-block;
    width: 46px;
    text-align: center;
    color: #fff;
  }

  .cs-right-wrap3 .cs-info-wrap .cs-info-detail {
    display: inline-block;
    width: 70px;
    text-align: center;
    color: #ACABB4;
  }

  .cs-right-wrap3 .cs-info-wrap.color1 {
    border-color: rgba(41, 133, 247, 0.6);
    background-color: rgba(41, 133, 247, 0.2);
  }

  .cs-right-wrap3 .cs-info-wrap.color1 .cs-info-label {
    background-color: rgba(41, 133, 247, 0.3);
  }

  .cs-right-wrap3 .cs-info-wrap.color2 {
    border-color: rgba(0, 176, 80, 0.6);
    background-color: rgba(0, 176, 80, 0.2);
  }

  .cs-right-wrap3 .cs-info-wrap.color2 .cs-info-label {
    background-color: rgba(0, 176, 80, 0.3);
  }

  .cs-right-wrap3 .cs-info-wrap.color3 {
    border-color: rgba(235, 158, 5, 0.6);
    background-color: rgba(235, 158, 5, 0.2);
  }

  .cs-right-wrap3 .cs-info-wrap.color3 .cs-info-label {
    background-color: rgba(235, 158, 5, 0.3);
  }

  .cs-right-wrap4 {
    width: 100%;
    height: 150px;
  }
}
</style>