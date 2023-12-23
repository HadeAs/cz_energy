<template>
  <div class="cs-box-content content">
    <div class="cs-header-content"><img src="@/assets/img/screen/mainB/u1.png">建筑能耗情况汇总
      <div class="pull-right">
        <span class="cs-title-unit margin-right-base">单位：kWh</span>
      </div>
    </div>
    <div class="cs-left-wrap2">
      <div class="cs-box-info">
        <div class="cs-box-title">
          <img src="@/assets/img/screen/mainB/u6247.png">本年监测电量
        </div>
        <div class="cs-box-num">1,981,544</div>
        <img src="@/assets/img/screen/mainB/u4390.png">
      </div>
      <div class="cs-box-info">
        <div class="cs-box-title">
          <img src="@/assets/img/screen/mainB/u6247.png">本月监测电量
        </div>
        <div class="cs-box-num">174,360</div>
        <img src="@/assets/img/screen/mainB/u4390.png">
      </div>
      <div class="cs-box-info">
        <div class="cs-box-title">
          <img src="@/assets/img/screen/mainB/u6249.png">本日监测电量
        </div>
        <div class="cs-box-num">5,736</div>
        <img src="@/assets/img/screen/mainB/u4390.png">
      </div>
    </div>
    <div class="cs-header-content">
      <div class="pull-right">
        <ul class="cs-btn-group margin-left-large-4">
          <li>年</li>
          <li class="active">月</li>
          <li>日</li>
        </ul>
      </div>
    </div>
    <div class="cs-left-wrap3">
      <div class="cs-box-info">
        <div class="cs-info-title text-overflow">
          <img src="@/assets/img/screen/mainB/u5112.png">电
        </div>
        <div class="text-overflow">
          <span class="cs-info-num">174,360</span>
          <span class="cs-info-unit">(kWh)</span>
        </div>
      </div>
      <div class="cs-box-info">
        <div class="cs-info-title text-overflow">
          <img src="@/assets/img/screen/mainB/u5115.png">燃气
        </div>
        <div class="text-overflow">
          <span class="cs-info-num">60</span>
          <span class="cs-info-unit">(m³)</span>
        </div>
      </div>
      <div class="cs-box-info">
        <div class="cs-info-title text-overflow">
          <img src="@/assets/img/screen/mainB/u5118.png">集中供热量
        </div>
        <div class="text-overflow">
          <span class="cs-info-num">0</span>
          <span class="cs-info-unit">(kWh)</span>
        </div>
      </div>
      <div class="cs-box-info">
        <div class="cs-info-title text-overflow">
          <img src="@/assets/img/screen/mainB/u5121.png">集中供冷量
        </div>
        <div class="text-overflow">
          <span class="cs-info-num">0</span>
          <span class="cs-info-unit">(kWh)</span>
        </div>
      </div>
      <div class="cs-box-info">
        <div class="cs-info-title text-overflow">
          <img src="@/assets/img/screen/mainB/u5124.png">可再生能源
        </div>
        <div class="text-overflow">
          <span class="cs-info-num">80</span>
          <span class="cs-info-unit">(kWh)</span>
        </div>
      </div>
      <div class="cs-box-info">
        <div class="cs-info-title text-overflow">
          <img src="@/assets/img/screen/mainB/u6268.png">其他
        </div>
        <div class="text-overflow">
          <span class="cs-info-num">80</span>
          <span class="cs-info-unit"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.content {
  height: 312px;

  .cs-left-wrap2 {
    display: flex;
    margin-top: 8px;
    margin-bottom: 12px;
    border-bottom: 1px dashed #303644;
    height: 145px;
  }

  .cs-left-wrap2 .cs-box-info {
    flex: 1;
    text-align: center;
  }

  .cs-left-wrap2 .cs-box-info>img {
    width: 116px;
    height: 98px;
    position: relative;
    top: -32px;
  }

  .cs-left-wrap2 .cs-box-info .cs-box-title {
    color: #7A7886;
    font-size: 16px;
  }

  .cs-left-wrap2 .cs-box-info .cs-box-title>img {
    width: 17px;
    height: 17px;
  }

  .cs-left-wrap2 .cs-box-info .cs-box-num {
    color: #fff;
    font-size: 20px;
    font-weight: bold;
  }

  .cs-left-wrap3 {
    display: flex;
    margin-top: 10px;
  }

  .cs-left-wrap3 .cs-box-info {
    line-height: 20px;
    margin-right: 10px;
  }

  .cs-left-wrap3 .cs-box-info:last-child {
    margin-right: 0;
  }

  .cs-left-wrap3 .cs-box-info .cs-info-title {
    color: #7A7886;
  }

  .cs-left-wrap3 .cs-box-info .cs-info-title>img {
    width: 18px;
    height: 16px;
  }

  .cs-left-wrap3 .cs-box-info .cs-info-num {
    color: #00FFFF;
    font-weight: bold;
  }

  .cs-left-wrap3 .cs-box-info .cs-info-unit {
    color: #7A7886;
  }
}
</style>