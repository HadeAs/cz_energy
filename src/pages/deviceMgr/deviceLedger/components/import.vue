<!--
 * @Author: ymZhang
 * @Date: 2023-12-26 14:38:19
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-26 18:07:57
 * @Description: 
-->
<template>
  <el-form ref="formRef" v-bind="COMMON_FORM_CONFIG" :model="state.form">
    <el-form-item label="导入文件">
      <ProUpload>
        <template #tip>
          <div class="el-upload__tip tip">
            支持扩展名：.rar .zip .doc .docx...
          </div>
        </template>
      </ProUpload>
    </el-form-item>
  </el-form>
</template>
<script setup name="Import">
import { reactive, ref } from "vue";
import { COMMON_FORM_CONFIG } from "@/constant/formConfig";
import ProUpload from "@/components/ProUpload.vue";
const formRef = ref();
const state = reactive({
  form: {},
});
const validate = async () => {
  let valid = false;
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      valid = true;
    } else {
      valid = false;
    }
  });
  return valid ? state.form : valid;
};
defineExpose({
  validate,
});
</script>
