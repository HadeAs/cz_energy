<!--
 * @Author: ymZhang
 * @Date: 2023-12-26 15:52:16
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-08 22:46:12
 * @Description: 
-->
<template>
  <ProDrawer title="新增" ref="handleDrawerRef" @confirm="confirmDetail">
    <el-form ref="formRef" v-bind="COMMON_FORM_CONFIG" :model="state.form">
      <!-- <el-form-item label="监测点位名称" required prop="name">
        <el-input placeholder="请输入监测点位名称" v-model="state.form.name" />
      </el-form-item> -->
      <el-form-item label="数据" required prop="data">
        <el-input v-model="state.form.data" />
      </el-form-item>
      <el-form-item label="操作记录" required prop="description">
        <el-input
          v-model="state.form.description"
          type="textarea"
          placeholder="请输入至少5个字符"
        />
      </el-form-item>
    </el-form>
  </ProDrawer>
</template>
<script setup name="Handle">
import { ref, reactive } from "vue";
import ProDrawer from "@/components/ProDrawer.vue";
import { COMMON_FORM_CONFIG } from "@/constant/formConfig";

const initData = {
  deviceDataId: "",
  data: null,
  description: "",
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
