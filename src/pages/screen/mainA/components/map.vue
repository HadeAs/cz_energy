<template>
  <div class="cs-center-wrap1">
    <div class="cs-center-map" v-show="state.activeTab === 'GIS'">
      <Echart id="map" :option="option" />
    </div>
    <div class="cs-center-map" v-show="state.activeTab === 'BIM'">
      <img src="@/assets/img/screen/mainA/bim.png">
    </div>
    <ul class="cs-center-tab">
      <li v-for="item in tabs" :key="item.value" :class="state.activeTab === item.value ? 'active' : ''"
        @click="changeTab(item.value)">
        <div class="cs-tab-icon"><img :src="item.url"></div>
        <div class="cs-tab-text">{{ item.value }}</div>
      </li>
    </ul>
    <a href="javascript:void(0)" class="cs-link" @click="gotoB">进入B屏</a>
    <el-select id="select2" v-model="state.selectVal">
      <el-option v-for="item in state.opts" :key="item.id" :label="item.text" :value="item.id" />
    </el-select>
  </div>
</template>
<script setup name="Map">
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import areaInfo from "@/constant/320000.json";
import { registerMap } from "echarts/core";
import Echart from "@/components/Echart.vue";
import { MAP_OPT } from "./constant";
import gis from "@/assets/img/screen/mainA/u2705.png";
import bim from "@/assets/img/screen/mainA/u2710.png";

const mapPointData = [{ value: ['119.63', '32.02'], name: '武家嘴办公楼' }];
const tabs = [
  {
    value: "GIS",
    url: gis
  },
  {
    value: "BIM",
    url: bim
  }
];
const router = useRouter();
const state = reactive({
  selectVal: 1,
  activeTab: "GIS",
  opts: [
    {
      id: 1,
      text: '武家嘴大酒店',
    },
    {
      id: 2,
      text: '徐州沛县中金商贸',
    },
    {
      id: 3,
      text: '连云港白虎山小商品',
    },
    {
      id: 4,
      text: '葛洲坝融创南京紫郡',
    },
  ],
  mapData: [
    { value: 4, name: '徐州市' },
    { value: 6, name: '南京市' },
    { value: 12, name: '泰州市' },
    { value: 16, name: '镇江市' },
    { value: 21, name: '连云港市' },
    { value: 21, name: '扬州市' },
    { value: 21, name: '常州市' },
    { value: 21, name: '南通市' },
    { value: 26, name: '苏州市' },
    { value: 26, name: '淮安市' },
    { value: 32, name: '宿迁市' },
    { value: 32, name: '盐城市' },
    { value: 32, name: '无锡市' },
  ]
})

const option = ref({});

const changeTab = (tab) => {
  if (state.activeTab !== tab) {
    state.activeTab = tab;
  }
};

const gotoB = () => {
  router.push({ path: "/mainB" });
}

onMounted(() => {
  registerMap("jsMap", areaInfo);
  option.value = MAP_OPT(state.mapData, mapPointData)
});
</script>
<style lang="scss" scoped>
.cs-center-wrap1 {
  width: 100%;
  height: 658px;
  position: relative;

  .cs-center-tab {
    position: absolute;
    top: 20px;
    left: 0;
    list-style: none;
    padding: 0;
    display: flex;

    li {
      width: 50px;
      margin-right: 30px;
      text-align: center;
      cursor: pointer;

      .cs-tab-icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 2px solid #0059A2;
        // font-size: 22px;
        color: rgba(38, 239, 249, 0.5);
        line-height: 44px;
      }

      .cs-tab-text {
        color: #A9C5E7;
      }

      &.active .cs-tab-icon {
        border-color: #008AFF;
        color: #26EFF9;
      }

      &.active .cs-tab-text {
        font-weight: bold;
        color: #fff;
      }
    }
  }

  .cs-link {
    position: absolute;
    right: 160px;
    top: 20px;
    width: 100px;
    height: 36px;
    background: url(@/assets/img/screen/mainA/u4517.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 36px;
    color: #fff;
  }

  :deep() {

    .el-select {
      position: absolute;
      right: 0;
      top: 20px;
      width: 150px;
      .el-input__wrapper {
        background: rgba(5, 11, 27, 0.4) !important;
      }

      .el-input__inner {
        color: rgba(110, 215, 254, 1) !important;
      }
    }
    .el-select .el-input__wrapper {
      box-shadow: 0 0 0 1px rgba(110, 215, 254, 0.4) inset;
    }
    .el-select:hover:not(.el-select--disabled) .el-input__wrapper {
      box-shadow: 0 0 0 1px rgba(110, 215, 254, 1) inset;
    }
    .el-input .el-select__caret {
      color: rgba(110, 215, 254, 0.4) !important;
    }

  }

  .cs-center-map:first-child {
    width: 100%;
    height: 100%;
    background: url(@/assets/img/screen/mainA/u91.png);
    background-size: cover;
  }

  .cs-center-map:nth-child(2) {
    width: 100%;
    height: 100%;
    padding: 50px 0;
  }

  .cs-center-map img {
    width: 100%;
    height: 100%;
  }

  #map {
    width: 100%;
    height: 100%;
  }
}</style>