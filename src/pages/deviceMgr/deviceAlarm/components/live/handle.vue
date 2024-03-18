<!--
 * @Author: ymZhang
 * @Date: 2023-12-26 15:34:18
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-19 20:38:04
 * @Description: 
-->
<template>
  <ProDrawer title="立即处理" ref="handleDrawerRef" @confirm="confirmDetail">
    <el-form
      ref="formRef"
      v-bind="COMMON_FORM_CONFIG"
      :model="state.form"
      :rules="rules"
    >
      <el-form-item label="报警设备名称" prop="equipmentName">
        <el-input
          placeholder="请输入报警设备名称"
          v-model="state.form.equipmentName"
        />
      </el-form-item>
      <!-- <el-form-item label="处理人" required prop="userName">
        <el-input placeholder="请输入处理人" v-model="state.form.userName" />
      </el-form-item> -->
      <el-form-item label="处理详情" prop="result">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入至少五个字符"
          v-model="state.form.result"
        />
      </el-form-item>
      <el-form-item prop="file">
        <ProUpload :fileList="state.form.file" :limit="1" @change="fileChange">
          <template #tip>
            <div class="el-upload__tip tip">
              支持文件类型：.rar .zip .doc .pdf
            </div>
          </template>
        </ProUpload>
      </el-form-item>
    </el-form>
  </ProDrawer>
</template>
<script setup name="Handle">
import { ref, reactive, watch } from "vue";
import ProDrawer from "@/components/ProDrawer.vue";
import { COMMON_FORM_CONFIG } from "@/constant/formConfig";
import ProUpload from "@/components/ProUpload.vue";

const rules = {
  name: { required: true, message: "请输入报警名称", trigger: "change" },
  result: { required: true, message: "请输入处理详情", trigger: "change" },
  // file: [
  //   {
  //     type: "array",
  //     required: true,
  //     message: "请上传文件",
  //     trigger: "change",
  //   },
  // ],
};
const initData = {
  equipmentName: "",
  // userName: "",
  result: "",
  file: [],
};
const emits = defineEmits(["submit"]);
const props = defineProps({
  data: { type: Object, default: {} },
});
const handleDrawerRef = ref();
const formRef = ref();
const state = reactive({
  form: { ...initData, ...props.data },
});
const confirmDetail = async () => {
  await formRef.value.validate((valid) => {
    if (valid) {
      const { file, ...rest } = state.form;
      const param = { ...rest };
      if (file.length) {
        param.file = file[0].raw;
      }
      emits("submit", param);
    }
  });
};

const fileChange = async (fileList) => {
  state.form.file = fileList;
};

watch(
  () => props.data,
  (val) => {
    state.form = val;
  }
);
const open = () => {
  handleDrawerRef.value.open();
};
const close = () => {
  handleDrawerRef.value.close();
};
defineExpose({ open, close });
</script>
