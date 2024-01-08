<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-25 10:33:49
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-26 20:51:03
 * @Description: 
-->
<template>
  <div class="upload-container">
    <div class="title">
      <el-icon class="pic-icon"><PictureFilled /></el-icon>
      <span>主页项目图</span>
    </div>
    <ProUpload
      list-type="picture-card"
      :limit="5"
      :file-list="panelImage"
      @change="handleProjectChange"
    />
  </div>
  <div class="upload-container">
    <div class="title">
      <el-icon class="pic-icon"><PictureFilled /></el-icon>
      <span>空气质量展示图</span>
    </div>
    <ProUpload
      list-type="picture-card"
      :limit="5"
      :file-list="EnergyFlowImage"
      @change="handleAirChange"
    />
  </div>
  <div class="upload-container">
    <div class="title">
      <el-icon class="pic-icon"><PictureFilled /></el-icon>
      <span>建筑能流展示图</span>
    </div>
    <ProUpload
      list-type="picture-card"
      :limit="5"
      :file-list="AirQualityImage"
      @change="handleBuildChange"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";
import ProUpload from "@/components/ProUpload.vue";
import { PictureFilled } from "@element-plus/icons-vue";

const panelImage = ref([]);
const EnergyFlowImage = ref([]);
const AirQualityImage = ref([]);

const handleAirChange = (fileList) => {
  EnergyFlowImage.value = fileList;
};
const handleBuildChange = (fileList) => {
  AirQualityImage.value = fileList;
};
const handleProjectChange = (fileList) => {
  panelImage.value = fileList;
};

defineExpose({
  getPictures: () => ({
    panelImage: panelImage?.value?.map(item => item?.raw),
    EnergyFlowImage: EnergyFlowImage?.value?.map(item => item?.raw),
    AirQualityImage: AirQualityImage?.value?.map(item => item?.raw),
  }),
});
</script>
<style scoped lang="scss">
.upload-container {
  margin-bottom: 25px;
  .title {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    span {
      margin-left: 10px;
      font-size: 14px;
      font-weight: bold;
    }
    .pic-icon {
      font-size: 16px;
      color: #2985f7;
    }
  }
}
</style>
