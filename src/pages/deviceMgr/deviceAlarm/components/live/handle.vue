<!--
 * @Author: ymZhang
 * @Date: 2023-12-26 15:34:18
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-06 15:07:51
 * @Description: 
-->
<template>
  <ProDrawer title="立即处理" ref="handleDrawerRef" @confirm="confirmDetail">
    <el-form ref="formRef" v-bind="COMMON_FORM_CONFIG" :model="state.form">
      <el-form-item label="报警设备名称" required prop="equipmentName">
        <el-input
          placeholder="请输入报警设备名称"
          v-model="state.form.equipmentName"
        />
      </el-form-item>
      <el-form-item label="处理人" required prop="userName">
        <el-input placeholder="请输入处理人" v-model="state.form.userName" />
      </el-form-item>
      <el-form-item label="处理详情" required prop="result">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入至少五个字符"
          v-model="state.form.result"
        />
      </el-form-item>
    </el-form>
  </ProDrawer>
</template>
<script setup name="Handle">
import { ref, reactive, watch } from "vue";
import ProDrawer from "@/components/ProDrawer.vue";
import { COMMON_FORM_CONFIG } from "@/constant/formConfig";

const initData = {
  equipmentName: "",
  userName: "",
  result: "",
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
      emits("submit", state.form);
    }
  });
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
