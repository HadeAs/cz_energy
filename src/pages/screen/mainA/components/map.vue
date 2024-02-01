<template>
  <div class="cs-center-wrap1">
    <div class="cs-center-map" v-show="state.activeTab === 'GIS'">
      <Echart ref="chartRef" id="map" :option="option" @click="handleClick" />
    </div>
    <div class="cs-center-map" v-show="state.activeTab === 'BIM'">
      <img :src="bimUrl" />
    </div>
    <ul class="cs-center-tab">
      <li
        v-for="item in tabs"
        :key="item.value"
        :class="state.activeTab === item.value ? 'active' : ''"
        @click="changeTab(item.value)"
      >
        <div class="cs-tab-icon"><img :src="item.url" /></div>
        <div class="cs-tab-text">{{ item.value }}</div>
      </li>
    </ul>
    <el-icon
      class="back-icon"
      v-show="state.district && state.activeTab === 'GIS'"
      @click="backToCity"
      ><Back
    /></el-icon>
    <a href="javascript:void(0)" class="cs-link" @click="gotoB">进入B屏</a>
    <el-select id="select2" v-model="state.selectVal" @change="handleChange">
      <el-option
        v-for="item in projectList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
  </div>
</template>
<script setup name="Map">
import { reactive, ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { Back } from "@element-plus/icons-vue";
import areaInfo from "@/constant/320000.json";
import districtInfo from "@/constant/320400.json";
import { registerMap } from "echarts/core";
import Echart from "@/components/Echart.vue";
import { MAP_OPT, MAP_OPT2 } from "./constant";
import gis from "@/assets/img/screen/mainA/u2705.png";
import bim from "@/assets/img/screen/mainA/u2710.png";

const mapPointData = [{ value: ["119.63", "32.02"], name: "武家嘴办公楼" }];
const props = defineProps({
  projectId: { type: Number },
  projectList: { type: Array },
  bimUrl: { type: String },
  location: { type: Object },
  change: { type: Function },
});
const tabs = [
  {
    value: "GIS",
    url: gis,
  },
  {
    value: "BIM",
    url: bim,
  },
];
const router = useRouter();
const state = reactive({
  selectVal: 1,
  activeTab: "GIS",
  district: false,
});

const chartRef = ref();
const option = ref({});

const changeTab = (tab) => {
  if (state.activeTab !== tab) {
    state.activeTab = tab;
  }
};

const gotoB = () => {
  router.push({ path: "/mainB" });
};

const getPoint = () => {
  const target = props.projectList.find((v) => v.id === props.projectId);
  if (!target) return mapPointData;
  return [
    {
      value: [
        String(props.location.latitude),
        String(props.location.longitude),
      ],
      name: target.name,
    },
  ];
};

const initArea = () => {
  const point = getPoint();
  registerMap("jsMap", areaInfo);
  option.value = MAP_OPT(point);
};

const handleChange = (val) => {
  props.change(val);
};

watch(
  () => props.location,
  (val) => {
    if (val && val.latitude && val.longitude) {
      initArea();
    }
  },
  { immediate: true }
);

const handleClick = (param) => {
  // const point = getPoint();
  // const names = point.map((item) => item.name);
  // if (names.includes(param.name)) {
  //   registerMap("czMap", districtInfo);
  //   option.value = MAP_OPT2;
  //   state.district = true;
  // }
};
const backToCity = () => {
  initArea();
  state.district = false;
};
</script>
<style lang="scss" scoped>
.cs-center-wrap1 {
  width: 100%;
  height: 658px;
  position: relative;

  .back-icon {
    position: absolute;
    top: 20px;
    left: 160px;
    font-size: 38px;
    color: #26eff9;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #008aff;
  }

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
        border: 2px solid #0059a2;
        // font-size: 22px;
        color: rgba(38, 239, 249, 0.5);
        line-height: 44px;
      }

      .cs-tab-text {
        color: #a9c5e7;
      }

      &.active .cs-tab-icon {
        border-color: #008aff;
        color: #26eff9;
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
}
</style>
