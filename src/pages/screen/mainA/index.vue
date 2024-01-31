<template>
  <div class="cs-left-wrapper">
    <Summary :project-id="state.projectId" />
    <Rank :project-id="state.projectId" />
    <Trend :project-id="state.projectId" />
  </div>
  <div class="cs-center-wrapper">
    <Map
      :project-id="state.projectId"
      :project-list="globalState.projects"
      :bim-url="state.bim"
      :location="state.location"
      :change="appStore.global.changeName"
    />
    <OverView :config="state.config" />
  </div>
  <div class="cs-right-wrapper">
    <Process :project-id="state.projectId" />
    <Action :project-id="state.projectId" />
    <Rate :project-id="state.projectId" />
  </div>
</template>
<script setup name="MainA">
import { reactive, watch } from "vue";
import { storeToRefs } from "pinia";
import appStore from "@/store";
import {
  Summary,
  Rank,
  Trend,
  Map,
  OverView,
  Process,
  Action,
  Rate,
} from "./components";
import { getImageUrl } from "@/api/common";
import { transformFileToUrl } from "@/utils";
import bimImage from "@/assets/img/screen/mainA/bim.png";
import { queryOverview } from "@/api/screen/maina";

const { globalState } = storeToRefs(appStore.global);
const state = reactive({
  projectId: globalState.value.projectId,
  bim: bimImage,
  location: { longitude: "", latitude: "" },
  config: {
    area: "20000",
    projectName: "武家嘴办公楼",
    buildingTypeName: "办公建筑",
    openYear: "2015",
    airConditionerForm: "分机盘管+新风系统",
    solarCapacity: "186",
    groundHeatArea: "15000",
    solarHeatCollectArea: "1190",
    extWallWarmForm: "外保温，保温装饰板",
  },
});

const getBim = async (config) => {
  const { panelImage, ...rest } = config;
  state.location = { ...rest };
  if (panelImage) {
    const data = await getImageUrl(panelImage);
    state.bim = transformFileToUrl(data);
  }
};

const query = async () => {
  const { data } = await queryOverview({ projectId: state.projectId });
  if (data) {
    state.config = {
      ...data,
      area: (data.area || 0).toFixed(0),
      solarCapacity: (data.solarCapacity || 0).toFixed(0),
      solarHeatCollectArea: (data.solarHeatCollectArea || 0).toFixed(0),
    };
    getBim({
      panelImage: data.panelImage,
      longitude: data.longitude,
      latitude: data.latitude,
    });
  }
};
query();

watch(
  () => globalState.value.projectId,
  (val) => {
    state.projectId = val;
    query();
  }
);
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

.cs-right-wrapper
  .cs-right-wrap1
  .cs-info-wrap
  .cs-info-box
  .cs-main-text
  .cs-num-text {
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}

.cs-right-wrapper
  .cs-right-wrap1
  .cs-info-wrap
  .cs-info-box
  .cs-main-text
  .cs-unit-text {
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
  color: #acabb4;
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
  color: #acabb4;
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
  color: #acabb4;
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

.cs-right-wrapper .cs-right-wrap5 .cs-right-info .cs-info-box > img {
  width: 25px;
  height: 21px;
}

.cs-right-wrapper .cs-right-wrap5 .cs-right-info .cs-info-box .cs-info-text {
  display: inline-block;
  width: 100px;
  color: #7a7886;
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

.cs-right-wrapper
  .cs-right-wrap5
  .cs-right-info
  .cs-info-box
  .cs-info-num
  .cs-unit {
  color: #fff;
  font-size: 14px;
  font-weight: normal;
  margin-left: 4px;
}
</style>
