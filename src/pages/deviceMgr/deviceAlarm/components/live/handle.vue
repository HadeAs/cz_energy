<!--
 * @Author: ymZhang
 * @Date: 2023-12-26 15:34:18
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-26 15:52:01
 * @Description: 
-->
<template>
  <ProDrawer title="立即处理" ref="handleDrawerRef" @confirm="confirmDetail">
    <el-form ref="formRef" v-bind="COMMON_FORM_CONFIG" :model="state.form">
      <el-form-item label="报警设备名称" required prop="name">
        <el-input placeholder="请输入报警设备名称" v-model="state.form.name" />
      </el-form-item>
      <el-form-item label="处理人" required prop="admin">
        <el-input placeholder="请输入处理人" v-model="state.form.admin" />
      </el-form-item>
      <el-form-item label="处理详情" required prop="remark">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入至少五个字符"
          v-model="state.form.remark"
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
  name: "",
  admin: "",
  remark: "",
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
      handleDrawerRef.value.close();
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
defineExpose({ open });
</script>
