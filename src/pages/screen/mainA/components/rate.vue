<template>
  <div class="cs-box-content content">
    <div class="cs-header-content">
      <img src="@/assets/img/screen/mainA/u7.png">碳减排评价
      <div class="pull-right">
        <UnitSelect />
      </div>
    </div>
    <div class="cs-right-wrap5">
      <div class="cs-left-info">
        <span class="cs-info-num">25<span class="cs-unit">%</span></span>
        <span class="cs-info-text">年投资回报率</span>
        <span class="cs-info-amount">200.00<span class="cs-unit">万元</span></span>
        <span class="cs-info-detail">碳减排总收益</span>
      </div>
      <div class="cs-right-info">
        <div class="cs-info-box">
          <img src="@/assets/img/screen/mainA/u4228.png">
          <span class="cs-info-text">年收益</span>
          <span class="cs-info-num">30<span class="cs-unit">万元</span></span>
        </div>
        <div class="cs-info-box">
          <img src="@/assets/img/screen/mainA/u4228.png">
          <span class="cs-info-text">年减排</span>
          <span class="cs-info-num">3500<span class="cs-unit">t</span></span>
        </div>
        <div class="cs-info-box">
          <img src="@/assets/img/screen/mainA/u4228.png">
          <span class="cs-info-text">预期投资回报年</span>
          <span class="cs-info-num">2030<span class="cs-unit">年</span></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup name="Rate">
import UnitSelect from "./unitSelect.vue"
</script>
<style lang="scss" scoped>
.content {
  height: 206px;

  .cs-right-wrap5 {
    display: flex;
  }

  .cs-right-wrap5 .cs-left-info {
    width: 269px;
    height: 118px;
    flex-shrink: 0;
    background: url(@/assets/img/screen/mainA/u3362.png) no-repeat;
    background-size: 100% 100%;
    position: relative;
  }

  .cs-right-wrap5 .cs-left-info .cs-info-num {
    font-size: 30px;
    color: #ffcc33;
    font-weight: bold;
    line-height: 30px;
    position: absolute;
    top: 32px;
    left: 32px;
  }

  .cs-right-wrap5 .cs-left-info .cs-info-num .cs-unit {
    font-size: 14px;
  }

  .cs-right-wrap5 .cs-left-info .cs-info-text {
    color: #ACABB4;
    position: absolute;
    left: 12px;
    top: 62px;
  }

  .cs-right-wrap5 .cs-left-info .cs-info-amount {
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    line-height: 20px;
    position: absolute;
    top: 50px;
    left: 130px;
  }

  .cs-right-wrap5 .cs-left-info .cs-info-amount .cs-unit {
    font-size: 14px;
  }

  .cs-right-wrap5 .cs-left-info .cs-info-detail {
    color: #ACABB4;
    font-weight: bold;
    position: absolute;
    left: 108px;
    top: 90px;
  }

  .cs-right-wrap5 .cs-right-info {
    flex: 1;
    padding-left: 20px;
    padding-top: 20px;
  }

  .cs-right-wrap5 .cs-right-info .cs-info-box {
    margin-top: 8px;
    display: flex;
  }

  .cs-right-wrap5 .cs-right-info .cs-info-box>img {
    width: 25px;
    height: 21px;
  }

  .cs-right-wrap5 .cs-right-info .cs-info-box .cs-info-text {
    display: inline-block;
    width: 100px;
    color: #7A7886;
  }

  .cs-right-wrap5 .cs-right-info .cs-info-box .cs-info-num {
    display: inline-block;
    width: 62px;
    height: 24px;
    background: url(@/assets/img/screen/mainA/u4214.png);
    background-size: 100% 100%;
    line-height: 24px;
    padding-left: 5px;
    color: #00f9ff;
    font-size: 16px;
    font-weight: bold;
  }

  .cs-right-wrap5 .cs-right-info .cs-info-box .cs-info-num .cs-unit {
    color: #fff;
    font-size: 14px;
    font-weight: normal;
    margin-left: 4px;
  }
}
</style>