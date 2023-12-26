<!--
 * @Author: ymZhang
 * @Date: 2023-12-26 15:52:16
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-26 16:11:00
 * @Description: 
-->
<template>
  <ProDrawer title="新增" ref="handleDrawerRef" @confirm="confirmDetail">
    <el-form ref="formRef" v-bind="COMMON_FORM_CONFIG" :model="state.form">
      <el-form-item label="监测点位名称" required prop="name">
        <el-input placeholder="请输入监测点位名称" v-model="state.form.name" />
      </el-form-item>
      <el-form-item label="阈值" required prop="num">
        <el-input placeholder="请输入阈值" v-model="state.form.num" />
      </el-form-item>
    </el-form>
  </ProDrawer>
</template>
<script setup name="Handle">
import { ref, reactive } from "vue";
import ProDrawer from "@/components/ProDrawer.vue";
import { COMMON_FORM_CONFIG } from "@/constant/formConfig";

const initData = {
  name: "",
  num: "",
};
const emits = defineEmits(["submit"]);
const handleDrawerRef = ref();
const formRef = ref();
const state = reactive({
  form: { ...initData },
});
const confirmDetail = async () => {
  await formRef.value.validate((valid) => {
    if (valid) {
      handleDrawerRef.value.close();
      emits("submit", state.form);
    }
  });
};
const open = () => {
  handleDrawerRef.value.open();
};
defineExpose({ open });
</script>
