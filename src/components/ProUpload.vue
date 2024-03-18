<!--
 * @Author: ymZhang
 * @Date: 2023-12-25 14:07:09
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-19 20:32:22
 * @Description: 
-->
<template>
  <span>
    <el-upload
      class="upload-file"
      v-if="listType === 'text'"
      v-model:file-list="state.fileList"
      :accept="state.accept"
      list-type="text"
      :auto-upload="false"
      :limit="limit"
      :on-exceed="handleExceed"
      :before-upload="beforeUpload"
      :on-success="uploadSuccess"
      :on-progress="uploadProgress"
      :on-error="uploadError"
      :on-remove="handleRemove"
      :on-change="handleChange"
      v-bind="$attrs"
    >
      <slot name="default">
        <el-button v-auth="authKey" type="primary" :icon="Upload"
          >上传文件</el-button
        >
      </slot>
      <slot name="tip"></slot>
    </el-upload>
    <template v-else>
      <!-- 多图片模式不需要请求接口 -->
      <el-upload
        v-model:file-list="state.fileList"
        action="#"
        list-type="picture-card"
        multiple
        :accept="state.accept"
        :limit="limit"
        :auto-upload="false"
        :on-exceed="handleExceed"
        :before-upload="beforeUpload"
        :on-success="uploadSuccess"
        :on-progress="uploadProgress"
        :on-error="uploadError"
        :on-remove="handleRemove"
        :on-change="handleChange"
        v-bind="$attrs"
      >
        <el-icon><Plus /></el-icon>
        <template #file="{ file }">
          <div>
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <el-icon><zoom-in /></el-icon>
              </span>
              <span
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <el-icon><Delete /></el-icon>
              </span>
            </span>
          </div>
        </template>
      </el-upload>
      <el-dialog width="80%" v-model="state.dialogVisible">
        <img
          class="preview-img"
          :src="state.dialogImageUrl"
          alt="Preview Image"
        />
      </el-dialog>
    </template>
  </span>
</template>
<script setup name="ProUpload">
import { reactive, watch } from "vue";
import { Delete, Plus, ZoomIn, Upload } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { COMMON_IMAGE_TYPES, COMMON_FILE_TYPES } from "@/constant";

const props = defineProps({
  authKey: { type: String, default: "" },
  listType: { type: String, default: "text" },
  fileList: { type: Array, default: [] },
  accepts: { type: Array },
  maxSize: { type: Number, default: null }, // kb字节单位
  limit: { type: Number, default: null },
});

const emits = defineEmits(["change", "success", "error", "progress"]);

const handleAccept = () => {
  let accepts = props.accepts;
  if (!props.accepts) {
    accepts =
      props.listType === "picture-card"
        ? COMMON_IMAGE_TYPES
        : COMMON_FILE_TYPES;
  }
  return accepts.join(",");
};
const state = reactive({
  fileList: props.fileList,
  dialogImageUrl: "",
  dialogVisible: false,
  accept: handleAccept(),
});

const handleRemove = (file, fileList) => {
  console.log("remove file", file);
  state.fileList = state.fileList.filter((v) => v.uid !== file.uid);
  emits("change", state.fileList);
};

const handleChange = (uploadFile, uploadFiles) => {
  state.fileList = uploadFiles;
  emits("change", state.fileList);
};

const handlePictureCardPreview = (file) => {
  state.dialogImageUrl = file.url;
  state.dialogVisible = true;
};

// 文件上传数量限制
const handleExceed = (files, fileList) => {
  if (props.limit) {
    ElMessage.error("文件上传数超过最大限制！");
  }
};

// 格式大小的限制
const beforeUpload = (rawFile) => {
  const accepts = state.accept.split(",");
  if (!accepts.length && !props.maxSize) return true;
  if (accepts.length) {
    const fileSuffix = rawFile.name.substring(
      rawFile.name.lastIndexOf(".") + 1
    );
    if (!accepts.some((item) => item.includes(fileSuffix))) {
      ElMessage.error("文件格式错误！请检查！");
      return false;
    }
  }
  if (props.maxSize && rawFile.size / props.maxSize > 2) {
    ElMessage.error("上传文件大小已超过阀值，请重新上传！");
    return false;
  }
  return true;
};

// 文件上传成功时的钩子
const uploadSuccess = (response, file, fileList) => {
  // 上传成功之后后台返回的数据
  console.log("uploadSuccess", uploadSuccess);
  emits("success", file, fileList);
};
const uploadProgress = (e, file, fileList) => {
  console.log("uploadProgress", uploadProgress);
  emits("progress", file, fileList);
};
const uploadError = (err) => {
  ElMessage.error("文件上传失败！");
  emits("error", err);
};

watch(
  () => props.fileList,
  (val) => {
    state.fileList = val;
  }
);

const getFileList = () => {
  return state.fileList;
};
defineExpose({ getFileList });
</script>
<style lang="scss" scoped>
.preview-img {
  width: 100%;
  height: 100%;
}
.upload-file {
  :deep() {
    .el-upload {
      display: block;
    }
    .el-upload__tip {
      margin-top: 4px;
    }
  }
}
</style>
