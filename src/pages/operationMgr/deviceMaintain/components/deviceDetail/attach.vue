<!--
 * @Author: ymZhang
 * @Date: 2023-12-25 15:59:51
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-20 13:50:33
 * @Description: 
-->
<template>
  <BoxContainer class="attach-container" title="附件">
    <ProUpload
      :limit="1"
      :fileList="state.fileList"
      authKey="maintain_device_upload"
      @change="handleSubmit"
    >
      <template #tip>
        <div class="el-upload__tip tip">支持文件类型：.rar .zip .doc .pdf</div>
      </template>
    </ProUpload>
    <el-button
      v-if="fileUrl"
      type="primary"
      plain
      :icon="Download"
      @click="download"
      >下载文件</el-button
    >
  </BoxContainer>
</template>
<script setup name="Detail1">
import { reactive } from "vue";
import BoxContainer from "../boxContainer.vue";
import ProUpload from "@/components/ProUpload.vue";
import { uploadAttach } from "@/api/operationMgr/deviceMaintain";
import { Download } from "@element-plus/icons-vue";
import { getDevicePlanFile } from "@/api/common";
import { exportWithExcel } from "@/utils";

const emits = defineEmits(["reload"]);
const props = defineProps({
  deviceId: { type: String },
  projectId: { type: String },
  fileUrl: { type: String },
});
const state = reactive({
  fileList: [],
});
const handleSubmit = async (fileList) => {
  if (fileList && fileList.length === 1) {
    const { code } = await uploadAttach(props.projectId, {
      equipmentModelId: props.deviceId,
      file: fileList[0].raw,
    });
    if (code === 200) {
      emits("reload");
    }
  }
};
const download = async () => {
  const name = props.fileUrl;
  const data = getDevicePlanFile(name);
  if (data && !data.code) {
    const [n, type] = name.split(".");
    exportWithExcel(data, "保养附件", type);
    // ElMessage({
    //   type: "success",
    //   message: "下载成功",
    // });
  }
};
</script>
<style lang="scss" scoped>
.attach-container {
  :deep() {
    .cs-box-wrap {
      display: flex;
    }
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
