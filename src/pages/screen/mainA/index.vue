<template>
  <div class="cs-left-wrapper">
    <Summary />
    <Rank />
    <Trend />
  </div>
  <div class="cs-center-wrapper">
    <Map />
    <OverView />
  </div>
  <div class="cs-right-wrapper">
    <Process />
    <Action />
    <Rate />
  </div>
</template>
<script lang="ts" setup name="MainA">
import { Summary, Rank, Trend, Map, OverView, Process, Action, Rate } from "./components";
</script>
<style lang="scss" scoped>
.cs-left-wrapper {
  width: 542px;
  flex-shrink: 0;
}

.cs-center-wrapper {
  flex: 1;
  margin: 0 20px;
}

.cs-right-wrapper {
  width: 542px;
  flex-shrink: 0;
}

.cs-right-wrapper .cs-right-wrap1 {
  display: flex;
  height: 120px;
}

.cs-right-wrapper .cs-right-wrap1 .cs-info-wrap {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  height: 120px;
}

.cs-right-wrapper .cs-right-wrap1 .cs-info-wrap .cs-info-box {
  width: 50%;
  padding-top: 10px;
  padding-left: 10px;
}

.cs-right-wrapper .cs-right-wrap1 .cs-info-wrap .cs-info-box .cs-title-text {
  height: 20px;
  line-height: 20px;
  color: #7a7787;
}

.cs-right-wrapper .cs-right-wrap1 .cs-info-wrap .cs-info-box .cs-main-text .cs-num-text {
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}

.cs-right-wrapper .cs-right-wrap1 .cs-info-wrap .cs-info-box .cs-main-text .cs-unit-text {
  color: #acabb4;
}

.cs-right-wrapper .cs-right-wrap1 .cs-num-wrap {
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

.cs-right-wrapper .cs-right-wrap1 .cs-num-wrap .cs-num1 {
  margin-top: 34px;
  margin-bottom: 28px;
}

.cs-right-wrapper .cs-right-wrap1 .cs-num-wrap .cs-num1 .cs-num-text {
  font-size: 28px;
  font-weight: bold;
}

.cs-right-wrapper .cs-right-wrap2 {
  width: 100%;
  height: 168px;
  margin-top: 10px;
}

.cs-right-wrapper .cs-right-wrap3 {
  display: flex;
  flex-wrap: wrap;
  margin-top: 12px;
}

.cs-right-wrapper .cs-right-wrap3 .cs-info-wrap {
  height: 20px;
  line-height: 18px;
  border-radius: 3px;
  margin-right: 6px;
  margin-bottom: 6px;
  font-size: 12px;
  border: 1px solid #acabb4;
}

.cs-right-wrapper .cs-right-wrap3 .cs-info-wrap .cs-info-label {
  display: inline-block;
  width: 46px;
  text-align: center;
  color: #fff;
}

.cs-right-wrapper .cs-right-wrap3 .cs-info-wrap .cs-info-detail {
  display: inline-block;
  width: 70px;
  text-align: center;
  color: #ACABB4;
}

.cs-right-wrapper .cs-right-wrap3 .cs-info-wrap.color1 {
  border-color: rgba(41, 133, 247, 0.6);
  background-color: rgba(41, 133, 247, 0.2);
}

.cs-right-wrapper .cs-right-wrap3 .cs-info-wrap.color1 .cs-info-label {
  background-color: rgba(41, 133, 247, 0.3);
}

.cs-right-wrapper .cs-right-wrap3 .cs-info-wrap.color2 {
  border-color: rgba(0, 176, 80, 0.6);
  background-color: rgba(0, 176, 80, 0.2);
}

.cs-right-wrapper .cs-right-wrap3 .cs-info-wrap.color2 .cs-info-label {
  background-color: rgba(0, 176, 80, 0.3);
}

.cs-right-wrapper .cs-right-wrap3 .cs-info-wrap.color3 {
  border-color: rgba(235, 158, 5, 0.6);
  background-color: rgba(235, 158, 5, 0.2);
}

.cs-right-wrapper .cs-right-wrap3 .cs-info-wrap.color3 .cs-info-label {
  background-color: rgba(235, 158, 5, 0.3);
}

.cs-right-wrapper .cs-right-wrap4 {
  width: 100%;
  height: 150px;
}

.cs-right-wrapper .cs-right-wrap5 {
  display: flex;
}

.cs-right-wrapper .cs-right-wrap5 .cs-left-info {
  width: 269px;
  height: 118px;
  flex-shrink: 0;
  background: url(@/assets/img/screen/mainA/u3362.png) no-repeat;
  background-size: 100% 100%;
  position: relative;
}

.cs-right-wrapper .cs-right-wrap5 .cs-left-info .cs-info-num {
  font-size: 30px;
  color: #ffcc33;
  font-weight: bold;
  line-height: 30px;
  position: absolute;
  top: 32px;
  left: 32px;
}

.cs-right-wrapper .cs-right-wrap5 .cs-left-info .cs-info-num .cs-unit {
  font-size: 14px;
}

.cs-right-wrapper .cs-right-wrap5 .cs-left-info .cs-info-text {
  color: #ACABB4;
  position: absolute;
  left: 12px;
  top: 62px;
}

.cs-right-wrapper .cs-right-wrap5 .cs-left-info .cs-info-amount {
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  line-height: 20px;
  position: absolute;
  top: 50px;
  left: 130px;
}

.cs-right-wrapper .cs-right-wrap5 .cs-left-info .cs-info-amount .cs-unit {
  font-size: 14px;
}

.cs-right-wrapper .cs-right-wrap5 .cs-left-info .cs-info-detail {
  color: #ACABB4;
  font-weight: bold;
  position: absolute;
  left: 108px;
  top: 90px;
}

.cs-right-wrapper .cs-right-wrap5 .cs-right-info {
  flex: 1;
  padding-left: 20px;
  padding-top: 20px;
}

.cs-right-wrapper .cs-right-wrap5 .cs-right-info .cs-info-box {
  margin-top: 8px;
}

.cs-right-wrapper .cs-right-wrap5 .cs-right-info .cs-info-box>img {
  width: 25px;
  height: 21px;
}

.cs-right-wrapper .cs-right-wrap5 .cs-right-info .cs-info-box .cs-info-text {
  display: inline-block;
  width: 100px;
  color: #7A7886;
}

.cs-right-wrapper .cs-right-wrap5 .cs-right-info .cs-info-box .cs-info-num {
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

.cs-right-wrapper .cs-right-wrap5 .cs-right-info .cs-info-box .cs-info-num .cs-unit {
  color: #fff;
  font-size: 14px;
  font-weight: normal;
  margin-left: 4px;
}
</style>