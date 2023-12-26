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
      :file-list="projectImgs"
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
      :file-list="airImgs"
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
      :file-list="buildImgs"
      @change="handleBuildChange"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";
import ProUpload from "@/components/ProUpload.vue";
import { PictureFilled } from "@element-plus/icons-vue";

const projectImgs = ref([]);
const airImgs = ref([]);
const buildImgs = ref([]);

const handleAirChange = (fileList) => {
  airImgs.value = fileList;
};
const handleBuildChange = (fileList) => {
  buildImgs.value = fileList;
};
const handleProjectChange = (fileList) => {
  projectImgs.value = fileList;
};

defineExpose({
  getPictures: () => ({
    project: projectImgs,
    air: airImgs,
    build: buildImgs,
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
