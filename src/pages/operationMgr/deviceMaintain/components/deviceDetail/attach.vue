<!--
 * @Author: ymZhang
 * @Date: 2023-12-25 15:59:51
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-27 13:55:42
 * @Description: 
-->
<template>
  <BoxContainer class="attach-container" title="附件">
    <ProUpload :fileList="state.fileList" authKey="maintain_device_upload">
      <template #tip>
        <div class="el-upload__tip tip">支持文件类型：.rar .zip .doc .pdf</div>
      </template>
    </ProUpload>
  </BoxContainer>
</template>
<script setup name="Detail1">
import { reactive } from "vue";
import BoxContainer from "../boxContainer.vue";
import ProUpload from "@/components/ProUpload.vue";

const state = reactive({
  fileList: [],
});
</script>
<style lang="scss" scoped>
.attach-container {
  :deep() {
    .el-upload {
      display: block;
    }
  }
  .tip {
    font-size: 12px;
    color: #a2aabb;
    margin-top: 4px;
  }
}
</style>
