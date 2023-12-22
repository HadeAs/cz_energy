<template>
  <div class="cs-box-content content">
    <div class="cs-header-content">
      <img src="@/assets/img/screen/mainA/u2.png">建筑碳排放排名
      <div class="pull-right">
        <ul class="cs-list-group">
          <li class="active">强度</li>
          <li>总量</li>
        </ul>
        <ul class="cs-btn-group margin-left-large-4">
          <li class="active">月</li>
          <li>年</li>
        </ul>
      </div>
    </div>
    <div class="cs-left-wrap3">
      <div class="cs-unit">单位：<span id="js-unit">kgCO₂e/(㎡·a)</span></div>
      <ul class="cs-rank">
        <li class="cs-rank-wrap" v-for="(item, index) in state.rankData" :key="item.value">
          <div class="cs-rank-num" :class="'num' + Number(index + 1)">{{ index + 1 }}</div>
          <div class="cs-rank-name text-overflow">{{ item.name }}</div>
          <div class="cs-progress-wrap">
            <div class="progress-bar" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"
              :style="{ width: item.percent }">
            </div>
            <div class="cs-total-num">{{ item.value }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup name="Rank">
import { reactive } from "vue";
const state = reactive({
  rankData: [
    {
      name: "常州天辉锂电池制造",
      percent: "90%",
      value: 156
    },
    {
      name: "太仓市第一人民医院",
      percent: "80%",
      value: 126
    },
    {
      name: "苏州独墅湖书",
      percent: "60%",
      value: 106
    },
    {
      name: "金陵新城酒店",
      percent: "40%",
      value: 66
    },
    {
      name: "武家嘴办公楼",
      percent: "30%",
      value: 56
    }
  ]
})
</script>
<style lang="scss" scoped>
.content {
  height: 263px;

  .cs-left-wrap3 {
    padding-top: 8px;

    .cs-unit {
      color: #7A7886;
    }

    .cs-rank {
      list-style: none;
      padding: 0;
    }

    .cs-rank-wrap {
      display: flex;
      height: 36px;
      align-items: center;

      .cs-rank-num {
        flex-shrink: 0;
        width: 23px;
        height: 23px;
        text-align: center;
        line-height: 23px;
        font-size: 12px;
        color: #fff;
        background: url(@/assets/img/screen/mainA/u3864.png);

        &.num1 {
          background: url(@/assets/img/screen/mainA/u3849.png);
        }

        &.num2 {
          background: url(@/assets/img/screen/mainA/u3854.png);
        }

        &.num3 {
          background: url(@/assets/img/screen/mainA/u3859.png);
        }
      }

      .cs-rank-name {
        width: 100px;
        flex-shrink: 0;
        margin-left: 8px;
        color: #acabb4;
      }

      .cs-progress-wrap {
        flex: 1;
        overflow: hidden;
        display: flex;
        align-items: center;
      }

      .progress-bar {
        height: 10px;
        background-image: linear-gradient(to right, #3b3a55 0%, #2985f7 100%);
        border: none;
        border-radius: 0 5px 5px 0;
      }
      .cs-total-num {
  color: #fff;
  margin-left: 6px;
}
    }
  }
}
</style>