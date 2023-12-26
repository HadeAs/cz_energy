<!--
 * @Author: ymZhang
 * @Date: 2023-12-26 12:56:07
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-26 14:33:40
 * @Description: 
-->
<template>
  <el-form ref="formRef" v-bind="COMMON_FORM_CONFIG" :model="state.detailForm">
    <el-form-item label="设备名称" required prop="project">
      <el-input placeholder="请输入" v-model="state.detailForm.project" />
    </el-form-item>
    <el-form-item label="资产编号" required prop="no">
      <el-input placeholder="请输入" v-model="state.detailForm.no" />
    </el-form-item>
    <el-form-item label="型号规格" prop="model">
      <el-input placeholder="请输入" v-model="state.detailForm.model" />
    </el-form-item>
    <el-form-item label="设备类型" prop="type">
      <el-select v-model="state.detailForm.type">
        <el-option
          v-for="item in state.types"
          :key="item.id"
          :label="item.text"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="安装时间" prop="time">
      <el-date-picker
        v-model="state.detailForm.time"
        type="datetime"
        placeholder="请选择日期时间"
        value-format="YYYY-MM-DD hh:mm:ss"
      />
    </el-form-item>
  </el-form>
  <Param :params="state.params" />
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { COMMON_FORM_CONFIG } from "@/constant/formConfig";
import Param from "./param.vue";

const init = {
  no: "",
  project: "",
  model: "",
  type: "",
  time: "",
};
const props = defineProps({
  initData: {
    type: Object,
  },
});

defineExpose({
  validate: () => {
    return formRef.value
      .validate()
      .then(() => {
        return state.detailForm;
      })
      .catch(() => {
        return false;
      });
  },
});

const formRef = ref();
const state = reactive({
  detailForm: init,
  params: [],
  types: [
    {
      id: "空调",
      text: "空调",
    },
    {
      id: "配供电",
      text: "配供电",
    },
    {
      id: "照明",
      text: "照明",
    },
    {
      id: "动力",
      text: "动力",
    },
  ],
});

onMounted(() => {
  if (props.initData) {
    const formData = { ...init, ...props.initData };
    state.detailForm = formData;
  }
});
</script>
