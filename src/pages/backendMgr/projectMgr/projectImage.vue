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
      :limit="1"
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
      :limit="1"
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
      :limit="1"
      :file-list="AirQualityImage"
      @change="handleBuildChange"
    />
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import ProUpload from "@/components/ProUpload.vue";
import { PictureFilled } from "@element-plus/icons-vue";
import { fetchProImg } from '@/api/backstageMng/pmMng.js';
import { getImageUrl } from '@/api/common.js';
import { transformFileToUrl } from '@/utils/index.js';

const oldRaw = {};

const params = [
  { fetchKey: 'airQualityImage', postKey: 'AirQualityImage' },
  { fetchKey: 'energyFlowImage', postKey: 'EnergyFlowImage' },
  { fetchKey: 'panelImage', postKey: 'panelImage' },
];

const panelImage = ref([]);
const EnergyFlowImage = ref([]);
const AirQualityImage = ref([]);

const parseImage = async (url, key) => {
  if (!url) {
    return [];
  }
  const data = await getImageUrl(url);
  Object.assign(oldRaw, {
    [key]: data,
  });
  const imageUrl = transformFileToUrl(data);
  const [fileName, fileSuffix] = url.split(".");
  return [{ name: fileName, url: imageUrl }];
};

const handleAirChange = (fileList) => {
  EnergyFlowImage.value = fileList;
};
const handleBuildChange = (fileList) => {
  AirQualityImage.value = fileList;
};
const handleProjectChange = (fileList) => {
  panelImage.value = fileList;
};

const props = defineProps({
  initData: {
    type: Object,
  },
});

const renderFile = (imgData, key) => {
  if (imgData?.raw) {
    return imgData?.raw;
  }
  const oldFileData = oldRaw?.[key];
  return new File([oldFileData], `${imgData?.name}.png`, {
    type: oldFileData.type,
  });
}

defineExpose({
  getPictures: () => {
    return {
      panelImage: panelImage?.value?.map(img => renderFile(img, 'panelImage')),
      EnergyFlowImage: EnergyFlowImage?.value?.map(img => renderFile(img, 'EnergyFlowImage')),
      AirQualityImage: AirQualityImage?.value?.map(img => renderFile(img, 'AirQualityImage')),
    }
  },
});

onMounted(async () => {
  if (props.initData) {
    const res = await fetchProImg(props.initData);
    if (res?.code === 200) {
      const list = await Promise.all(params.map(({ fetchKey, postKey }) => parseImage(res?.data?.data?.[fetchKey], postKey)));
      AirQualityImage.value = list?.[0] || [];
      EnergyFlowImage.value = list?.[1] || [];
      panelImage.value = list?.[2] || [];
    }
  }
})
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
