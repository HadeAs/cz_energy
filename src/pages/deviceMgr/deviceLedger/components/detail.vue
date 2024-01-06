<!--
 * @Author: ymZhang
 * @Date: 2023-12-26 12:56:07
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-06 14:40:04
 * @Description: 
-->
<template>
  <el-form ref="formRef" v-bind="COMMON_FORM_CONFIG" :model="state.detailForm">
    <el-form-item label="设备名称" required prop="name">
      <el-input placeholder="请输入" v-model="state.detailForm.name" />
    </el-form-item>
    <!-- <el-form-item label="资产编号" required prop="no">
      <el-input placeholder="请输入" v-model="state.detailForm.no" />
    </el-form-item> -->
    <el-form-item label="型号规格" prop="modelNum">
      <el-input placeholder="请输入" v-model="state.detailForm.modelNum" />
    </el-form-item>
    <el-form-item label="设备类型" required prop="equipmentTypeId">
      <el-select v-model="state.detailForm.equipmentTypeId">
        <el-option
          v-for="item in opts"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="安装时间" prop="openTime">
      <el-date-picker
        v-model="state.detailForm.openTime"
        equipmentTypeId="datetime"
        placeholder="请选择日期时间"
        value-format="YYYY-MM-DD hh:mm:ss"
      />
    </el-form-item>
  </el-form>
  <Param ref="paramRef" :params="state.params" />
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { COMMON_FORM_CONFIG } from "@/constant/formConfig";
import Param from "./param.vue";

const init = {
  name: "",
  modelNum: "",
  equipmentTypeId: "",
  openTime: "",
};
const props = defineProps({
  initData: {
    type: Object,
  },
  opts: {
    type: Array,
    default: [],
  },
});

const formRef = ref();
const paramRef = ref();
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
    const params = props.initData.equipmentModelParamList || [];
    state.detailForm = formData;
    state.params = params;
  }
});

defineExpose({
  validate: () => {
    return formRef.value
      .validate()
      .then(() => {
        const params = paramRef.value.getValue();
        // if (params.length) {
        //   // params.forEach((item) => {
        //   //   // item.equipmentModelId = state.detailForm.equipmentTypeId
        //   // })
        // }
        return {
          ...state.detailForm,
          equipmentModelParamList: params,
          equipmentCount: params.length,
        };
      })
      .catch(() => {
        return false;
      });
  },
});
</script>
