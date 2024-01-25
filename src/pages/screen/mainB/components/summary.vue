<template>
  <div class="cs-box-content content">
    <div class="cs-header-content">
      <img src="@/assets/img/screen/mainB/u1.png" />建筑能耗情况汇总
      <div class="pull-right">
        <span class="cs-title-unit margin-right-base">单位：kWh</span>
      </div>
    </div>
    <div class="cs-left-wrap2">
      <div class="cs-box-info" v-for="item in state.summaryList" :key="item.id">
        <div class="cs-box-title"><img :src="item.icon" />{{ item.title }}</div>
        <div class="cs-box-num">{{ item.value }}</div>
        <img src="@/assets/img/screen/mainB/u4390.png" />
      </div>
    </div>
    <div class="cs-header-content">
      <div class="pull-right">
        <YearTabs :default-tab="state.activeTab" @change="tabChange" />
      </div>
    </div>
    <div class="cs-left-wrap3">
      <div
        class="cs-box-info"
        v-for="item in state.summaryTypeList"
        :key="item.energyStatisticsId"
      >
        <div class="cs-info-title text-overflow">
          <img :src="item.icon" />{{ item.energyStatisticsName }}
        </div>
        <div class="text-overflow">
          <span class="cs-info-num">{{ item.totalEnergyAmount }}</span>
          <span class="cs-info-unit">{{
            `${item.tag ? `(${item.tag})` : ""}`
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, watch } from "vue";
import u6247 from "@/assets/img/screen/mainB/u6247.png";
import u6249 from "@/assets/img/screen/mainB/u6249.png";
import YearTabs from "./yearTabs.vue";
import { querySummary, querySummaryType } from "@/api/screen/mainb";
import u5112 from "@/assets/img/screen/mainB/u5112.png";
import u5115 from "@/assets/img/screen/mainB/u5115.png";
import u5118 from "@/assets/img/screen/mainB/u5118.png";
import u5121 from "@/assets/img/screen/mainB/u5121.png";
import u5124 from "@/assets/img/screen/mainB/u5124.png";
import u6268 from "@/assets/img/screen/mainB/u6268.png";

const COMMON_TYPE_LIST = [
  {
    energyStatisticsId: 1,
    energyStatisticsName: "电",
    tag: "kWh",
    totalEnergyAmount: "174,360",
    icon: u5112,
  },
  {
    energyStatisticsId: 2,
    energyStatisticsName: "燃气",
    tag: "m³",
    totalEnergyAmount: "60",
    icon: u5115,
  },
  {
    energyStatisticsId: 3,
    energyStatisticsName: "石油",
    tag: "m³",
    totalEnergyAmount: "60",
    icon: u5115,
  },
  {
    energyStatisticsId: 4,
    energyStatisticsName: "集中供热量",
    tag: "kWh",
    totalEnergyAmount: "0",
    icon: u5118,
  },
  {
    energyStatisticsId: 5,
    energyStatisticsName: "集中供冷量",
    tag: "kWh",
    totalEnergyAmount: "0",
    icon: u5121,
  },
  {
    energyStatisticsId: 6,
    energyStatisticsName: "可再生能源",
    tag: "kWh",
    totalEnergyAmount: "80",
    icon: u5124,
  },
  {
    energyStatisticsId: 7,
    energyStatisticsName: "其他",
    tag: "",
    totalEnergyAmount: "80",
    icon: u6268,
  },
];
const props = defineProps({
  projectId: { type: Number },
});
const state = reactive({
  tag1: "kWh",
  activeTab: "month",
  summaryList: [
    {
      id: 1,
      title: "本年监测电量",
      value: "1,981,544",
      icon: u6247,
    },
    {
      id: 2,
      title: "本月监测电量",
      value: "174,360",
      icon: u6247,
    },
    {
      id: 3,
      title: "本日监测电量",
      value: "5,736",
      icon: u6249,
    },
  ],
  summaryTypeList: [...COMMON_TYPE_LIST],
});

const getSummaryList = async () => {
  const { data } = await querySummary({ projectId: props.projectId });
  if (data) {
    const { yearTotalPower, monthTotalPower, dayTotalPower, tag } = data;
    state.summaryList[0].value = yearTotalPower.toLocaleString();
    state.summaryList[1].value = monthTotalPower.toLocaleString();
    state.summaryList[2].value = dayTotalPower.toLocaleString();
    state.tag1 = tag;
  }
};

const getSummaryTypeList = async () => {
  const { data } = await querySummaryType({
    projectId: props.projectId,
    type: state.activeTab,
  });
  if (data?.data) {
    state.summaryTypeList = data.data.map((item, index) => ({
      ...item,
      icon: COMMON_TYPE_LIST[index].icon,
      totalEnergyAmount: item.totalEnergyAmount.toLocaleString(),
    }));
  }
};

const init = () => {
  getSummaryList();
  getSummaryTypeList();
};
init();
const tabChange = (tab) => {
  state.activeTab = tab;
  getSummaryTypeList();
};
watch(
  () => props.projectId,
  () => {
    init();
  }
);
</script>
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

  .cs-left-wrap2 .cs-box-info > img {
    width: 116px;
    height: 98px;
    position: relative;
    top: -32px;
  }

  .cs-left-wrap2 .cs-box-info .cs-box-title {
    color: #7a7886;
    font-size: 16px;
  }

  .cs-left-wrap2 .cs-box-info .cs-box-title > img {
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
    flex: 1;
    overflow: hidden;
  }

  .cs-left-wrap3 .cs-box-info:last-child {
    margin-right: 0;
  }

  .cs-left-wrap3 .cs-box-info .cs-info-title {
    color: #7a7886;
  }

  .cs-left-wrap3 .cs-box-info .cs-info-title > img {
    width: 18px;
    height: 16px;
  }

  .cs-left-wrap3 .cs-box-info .cs-info-num {
    color: #00ffff;
    font-weight: bold;
  }

  .cs-left-wrap3 .cs-box-info .cs-info-unit {
    color: #7a7886;
  }
}
</style>
