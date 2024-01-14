<template>
  <div class="cs-box-content content">
    <div class="cs-header-content">
      <img src="@/assets/img/screen/mainA/u5.png" />碳中和进程
    </div>
    <div class="cs-right-wrap1">
      <div class="cs-info-wrap">
        <div class="cs-info-box">
          <div class="cs-title-text">
            <img src="@/assets/img/screen/mainA/u311.png" />碳达峰倒计时
          </div>
          <div class="cs-main-text">
            <span class="cs-num-text">1542</span>
            <span class="cs-unit-text">天</span>
          </div>
        </div>
        <div class="cs-info-box">
          <div class="cs-title-text">
            <img src="@/assets/img/screen/mainA/u311.png" />考核时间
          </div>
          <div class="cs-main-text">
            <span class="cs-num-text">2026</span>
            <span class="cs-unit-text"></span>
          </div>
        </div>
        <div class="cs-info-box">
          <div class="cs-title-text">
            <img src="@/assets/img/screen/mainA/u311.png" />碳中和倒计时
          </div>
          <div class="cs-main-text">
            <span class="cs-num-text">2654 </span>
            <span class="cs-unit-text">天</span>
          </div>
        </div>
        <div class="cs-info-box">
          <div class="cs-title-text">
            <img src="@/assets/img/screen/mainA/u311.png" />考核时间
          </div>
          <div class="cs-main-text">
            <span class="cs-num-text">2023</span>
            <span class="cs-unit-text"></span>
          </div>
        </div>
      </div>
      <div class="cs-num-wrap">
        <div class="cs-num1">
          <span class="cs-num-text">68</span>
          <span class="cs-num-unit">%</span>
        </div>
        <div class="cs-num2">碳达峰完成进度</div>
      </div>
    </div>
    <div class="cs-sub-header">
      <span class="cs-sub-header-text">碳中和趋势</span>
      <div class="cs-sub-right">
        <UnitSelect label="单位：万t" />
      </div>
    </div>
    <!-- <div class="cs-right-wrap2" id="chart3"></div> -->
    <Echart class="cs-right-wrap2" id="chart3" :option="option" />
  </div>
</template>
<script setup name="Process">
import { ref } from "vue";
import UnitSelect from "./unitSelect.vue";
import { COLUM_OPT } from "./constant";
import img1 from "@/assets/img/screen/mainA/bar1.png";
import img2 from "@/assets/img/screen/mainA/bar2.png";
import img3 from "@/assets/img/screen/mainA/bar3.png";
import img4 from "@/assets/img/screen/mainA/bar4.png";
import img5 from "@/assets/img/screen/mainA/bar5.png";
import img6 from "@/assets/img/screen/mainA/bar6.png";

import Echart from "@/components/Echart.vue";

const option = ref(COLUM_OPT(img1, img2, img3, img4, img5, img6));

// const handleChange = (val) => {
//   option.value.series[1].data = option.value.series[1].data.map((item) => {
//     return { ...item, value: parseInt(item.value + 50, 10) };
//   });
//   option.value.series[0].data = option.value.series[0].data.map((item) => {
//     if (item === 0) return item;
//     return item + 50;
//   });
// };
</script>
<style lang="scss" scoped>
.content {
  height: 389px;

  .cs-right-wrap1 {
    display: flex;
    height: 120px;
  }

  .cs-right-wrap1 .cs-info-wrap {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    height: 120px;
  }

  .cs-right-wrap1 .cs-info-wrap .cs-info-box {
    width: 50%;
    padding-top: 10px;
    padding-left: 10px;
  }

  .cs-right-wrap1 .cs-info-wrap .cs-info-box .cs-title-text {
    height: 20px;
    line-height: 20px;
    color: #7a7787;
  }

  .cs-right-wrap1 .cs-info-wrap .cs-info-box .cs-main-text .cs-num-text {
    color: #fff;
    font-size: 20px;
    font-weight: bold;
  }

  .cs-right-wrap1 .cs-info-wrap .cs-info-box .cs-main-text .cs-unit-text {
    color: #acabb4;
  }

  .cs-right-wrap1 .cs-num-wrap {
    width: 197px;
    height: 154px;
    flex-shrink: 0;
    background: url(@/assets/img/screen/mainA/u3896.png);
    background-size: cover;
    text-align: center;
    color: #fff;
    position: relative;
    top: -40px;
  }

  .cs-right-wrap1 .cs-num-wrap .cs-num1 {
    margin-top: 34px;
    margin-bottom: 28px;
  }

  .cs-right-wrap1 .cs-num-wrap .cs-num1 .cs-num-text {
    font-size: 28px;
    font-weight: bold;
  }

  .cs-right-wrap2 {
    width: 100%;
    height: 168px;
    margin-top: 10px;
  }
}
</style>
