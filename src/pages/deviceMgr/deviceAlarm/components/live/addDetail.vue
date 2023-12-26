<!--
 * @Author: ymZhang
 * @Date: 2023-12-26 15:52:16
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-26 16:11:04
 * @Description: 
-->
<template>
  <ProDrawer title="新增" ref="handleDrawerRef" @confirm="confirmDetail">
    <el-form ref="formRef" v-bind="COMMON_FORM_CONFIG" :model="state.form">
      <el-form-item label="报警设备名称" required prop="type">
        <el-select v-model="state.form.type">
          <el-option
            v-for="item in state.opts"
            :key="item.id"
            :label="item.text"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </ProDrawer>
</template>
<script setup name="Handle">
import { ref, reactive } from "vue";
import ProDrawer from "@/components/ProDrawer.vue";
import { COMMON_FORM_CONFIG } from "@/constant/formConfig";

const initData = {
  type: "",
};
const emits = defineEmits(["submit"]);
const handleDrawerRef = ref();
const formRef = ref();
const state = reactive({
  form: { ...initData },
  opts: [
    {
      id: "1",
      text: "设备1",
    },
    {
      id: "2",
      text: "设备2",
    },
    {
      id: "3",
      text: "设备3",
    },
  ],
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
