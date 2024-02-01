<template>
  <div class="cs-box-content content">
    <div class="cs-header-content">
      <img src="@/assets/img/screen/mainA/u1.png" />碳排放情况汇总
    </div>
    <div class="cs-left-wrap1">
      <div class="cs-left-box" v-for="item in summaryList" :key="item.value">
        <img :src="item.icon" />
        <p class="name">{{ item.name }}</p>
        <p class="value">{{ item.value }}</p>
        <p class="unit">{{ item.unit }}</p>
      </div>
    </div>
    <div class="cs-left-wrap2">
      <Echart id="chart1" :option="option" />
      <div class="cs-unit">单位：tCO₂</div>
      <div class="cs-rate">
        <div class="cs-rate-box">
          <span class="cs-rate-label"
            ><img src="@/assets/img/screen/mainA/u79.png" />同比</span
          >
          <span class="cs-rate-num" :class="state.yoy > 0 ? 'decline' : 'rise'"
            ><img :src="state.yoy > 0 ? upImg : downImg" />{{
              Math.abs(state.yoy)
            }}%</span
          >
        </div>
        <div class="cs-rate-box">
          <span class="cs-rate-label"
            ><img src="@/assets/img/screen/mainA/u79.png" />环比</span
          >
          <span class="cs-rate-num" :class="state.mom > 0 ? 'decline' : 'rise'"
            ><img :src="state.mom > 0 ? upImg : downImg" />{{
              Math.abs(state.mom)
            }}%</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup name="Summary">
import u4063 from "@/assets/img/screen/mainA/u4063.png";
import u4066 from "@/assets/img/screen/mainA/u4066.png";
import u4072 from "@/assets/img/screen/mainA/u4072.png";
import u4069 from "@/assets/img/screen/mainA/u4069.png";
import { reactive, ref, watch } from "vue";
import Echart from "@/components/Echart.vue";
import { PIE_OPT } from "./constant";
import {
  queryCarbonSummaryUp,
  queryCarbonSummaryDown,
} from "@/api/screen/maina";
import downImg from "@/assets/img/screen/mainA/u80.png";
import upImg from "@/assets/img/screen/mainA/u81.png";

const props = defineProps({
  projectId: { type: Number },
});

const option = ref(PIE_OPT);
const summaryList = reactive([
  {
    name: "碳排放总量",
    unit: "tCO₂",
    icon: u4063,
    value: 1362.05,
  },
  {
    name: "碳排放强度",
    unit: "kgCO₂e/(㎡·a)",
    icon: u4066,
    value: "68.10",
  },
  {
    name: "用能人数",
    unit: "人",
    icon: u4072,
    value: 800,
  },
  {
    name: "人均碳排放量",
    unit: "kgCO₂",
    icon: u4069,
    value: 1702.56,
  },
]);
const state = reactive({
  data: [
    {
      name: "电力",
      value: "102.65",
    },
    {
      name: "燃气",
      value: "88.8",
    },
    {
      name: "市政热力",
      value: "0",
    },
    {
      name: "石油",
      value: "0",
    },
  ],
  yoy: -11,
  mom: 0.5,
});
const initPie = () => {
  option.value.legend.formatter = (name) => {
    let value;
    state.data.forEach((v) => {
      if (v.name === name) {
        value = v.value;
      }
    });
    return ["{a|" + name + "}", "{b|" + value + "}"].join("\n");
  };
  let sum = 0;
  option.value.series[0].data = option.value.series[0].data.map(
    (item, index) => {
      const value = state.data[index]?.value?.toLocaleString() || 0;
      sum += Number(state.data[index]?.value || 0);
      return {
        ...item,
        value,
        name: state.data[index]?.name,
      };
    }
  );
  option.value.series[0].label.formatter = [
    `{a|${(sum || 0).toFixed(2).toLocaleString()}}`,
    "{b|本月碳排量}",
  ].join("\n");
};

const querySummary = async () => {
  const { data } = await queryCarbonSummaryUp({ projectId: props.projectId });
  if (data) {
    summaryList[0].value = data.summary.toLocaleString();
    summaryList[1].value = data.intensity.toLocaleString();
    summaryList[2].value = data.energyPersonNum;
    summaryList[3].value = data.perPerson.toLocaleString();
  }
};

const querySummary2 = async () => {
  const { data } = await queryCarbonSummaryDown({ projectId: props.projectId });
  if (data) {
    state.mom = (data.mom * 100).toLocaleString();
    state.yoy = (data.yoy * 100).toLocaleString();
    state.data = data.list.map((item) => ({
      ...item,
      name: item.carbonStatisticsName,
      value: item.carbonSummary.toLocaleString(),
    }));
    initPie();
  }
};

const init = () => {
  querySummary();
  querySummary2();
};
init();
watch(
  () => props.projectId,
  () => {
    init();
  }
);
</script>
<style lang="scss" scoped>
.content {
  height: 437px;

  .cs-left-wrap1 {
    width: 100%;
    height: 100px;
    display: flex;
    flex-wrap: wrap;
    padding-left: 12px;
    margin-top: 20px;
    margin-bottom: 8px;
    border-bottom: 1px dashed #303644;

    .cs-left-box {
      flex: 1;
      height: 110px;
      position: relative;
      text-align: center;

      > img {
        position: absolute;
        top: -16px;
        left: -18px;
      }

      > p {
        margin-bottom: 0;

        &.name {
          color: #7a7886;
        }

        &.value {
          color: #1699fa;
          font-size: 22px;
        }

        &.unit {
          color: #acabb4;
        }
      }

      &:nth-child(3),
      &:nth-child(4) {
        > p {
          &.value {
            color: #fff;
          }
        }
      }
    }
  }

  .cs-left-wrap2 {
    width: 100%;
    height: 250px;
    position: relative;

    #chart1 {
      width: 100%;
      height: 100%;
    }

    .cs-unit {
      position: absolute;
      right: 20px;
      top: 20px;
      color: #acabb4;
    }

    .cs-rate {
      position: absolute;
      top: 30%;
      right: 20%;

      .cs-rate-box {
        margin-bottom: 12px;
      }

      .cs-rate-label {
        display: inline-block;
        width: 64px;
        height: 24px;
        text-align: center;
        line-height: 22px;
        color: #acabb4;
        border: 1px solid #acabb4;
        border-radius: 12px;
      }

      .cs-rate-num {
        font-size: 16px;
        font-weight: bold;
        line-height: 22px;
      }

      .cs-rate-num.rise {
        color: #fa5555;
      }

      .cs-rate-num.decline {
        color: #00b050;
      }
    }
  }
}
</style>
