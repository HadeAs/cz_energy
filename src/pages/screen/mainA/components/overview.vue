<template>
  <div class="cs-box-content content">
    <div class="cs-header-content">
      <img src="@/assets/img/screen/mainA/u4.png" />建筑概况
      <div class="pull-right">
        <!-- <span class="cs-title-unit margin-right-base">单位：万t</span>
        <el-select v-model="state.value" class="cs-title-select">
          <el-option v-for="item in state.opts" :key="item" :label="item" :value="item" />
        </el-select> -->
        <UnitSelect label="单位：万t" />
      </div>
    </div>
    <div class="cs-center-wrap2">
      <div class="cs-center-box">
        <img src="@/assets/img/screen/mainA/u4194.png" />
        <div class="cs-info-wrap">
          <div class="cs-info-title">建筑名称</div>
          <div class="cs-info-num">
            <span class="num">武家嘴办公楼</span>
          </div>
        </div>
      </div>
      <div class="cs-center-box">
        <img src="@/assets/img/screen/mainA/u4192.png" />
        <div class="cs-info-wrap">
          <div class="cs-info-title">建筑类型</div>
          <div class="cs-info-num">
            <span class="num">办公建筑</span>
          </div>
        </div>
      </div>
      <div class="cs-center-box">
        <img src="@/assets/img/screen/mainA/u4192.png" />
        <div class="cs-info-wrap">
          <div class="cs-info-title">总建筑面积</div>
          <div class="cs-info-num">
            <span class="num">20000</span>
            <span class="unit">m²</span>
          </div>
        </div>
      </div>
      <div class="cs-center-box">
        <img src="@/assets/img/screen/mainA/u4194.png" />
        <div class="cs-info-wrap">
          <div class="cs-info-title">建造年份</div>
          <div class="cs-info-num">
            <span class="num">2015</span>
          </div>
        </div>
      </div>
      <div class="cs-center-box">
        <img src="@/assets/img/screen/mainA/u4204.png" />
        <div class="cs-info-wrap">
          <div class="cs-info-title">建筑面积</div>
          <div class="cs-info-num">
            <span class="num">15,611</span>
            <span class="unit">㎡</span>
          </div>
        </div>
      </div>
      <div class="cs-center-box">
        <img src="@/assets/img/screen/mainA/u4200.png" />
        <div class="cs-info-wrap">
          <div class="cs-info-title">空调形式</div>
          <div class="cs-info-num">
            <span class="num">分机盘管+新风系统</span>
          </div>
        </div>
      </div>
      <div class="cs-center-box">
        <img src="@/assets/img/screen/mainA/u4208.png" />
        <div class="cs-info-wrap">
          <div class="cs-info-title">太阳能光伏装机容量</div>
          <div class="cs-info-num">
            <span class="num">186</span>
            <span class="unit">186</span>
          </div>
        </div>
      </div>
      <div class="cs-center-box">
        <img src="@/assets/img/screen/mainA/u4206.png" />
        <div class="cs-info-wrap">
          <div class="cs-info-title">地源热泵应用面积</div>
          <div class="cs-info-num">
            <span class="num">15000</span>
            <span class="unit">㎡</span>
          </div>
        </div>
      </div>
      <div class="cs-center-box">
        <img src="@/assets/img/screen/mainA/u4202.png" />
        <div class="cs-info-wrap">
          <div class="cs-info-title">太阳能热水集热面积</div>
          <div class="cs-info-num">
            <span class="num">1190</span>
            <span class="unit">㎡</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup name="Overview">
import { reactive } from "vue";
import UnitSelect from "./unitSelect.vue";
const state = reactive({
  value: "2023",
  opts: ["2023", "2022", "2021"],
});
</script>
<style lang="scss" scoped>
.content {
  height: 312px;
  .cs-center-wrap2 {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .cs-center-wrap2 .cs-center-box {
    width: calc(33% - 8px);
    height: 70px;
    margin-right: 12px;
    margin-top: 16px;
    border-radius: 3px;
    background-color: #2d2837;
    display: flex;
    padding: 10px;
  }

  .cs-center-wrap2 .cs-center-box:nth-child(3n) {
    margin-right: 0;
  }

  .cs-center-wrap2 .cs-center-box img {
    width: 50px;
    height: 50px;
    flex-shrink: 0;
    margin-right: 10px;
  }

  .cs-center-wrap2 .cs-center-box .cs-info-title {
    color: #7a7886;
  }

  .cs-center-wrap2 .cs-center-box .cs-info-num {
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    line-height: 24px;
  }
}
</style>
