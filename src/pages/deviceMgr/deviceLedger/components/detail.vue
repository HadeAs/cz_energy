<!--
 * @Author: ymZhang
 * @Date: 2023-12-26 12:56:07
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-17 15:59:25
 * @Description: 
-->
<template>
  <el-form ref="formRef" v-bind="COMMON_FORM_CONFIG" :model="state.detailForm">
    <el-form-item label="设备名称" required prop="name">
      <el-input placeholder="请输入" v-model="state.detailForm.name" />
    </el-form-item>
    <!-- <el-form-item label="资产编号" required prop="propertyNum">
      <el-input placeholder="请输入" v-model="state.detailForm.propertyNum" />
    </el-form-item> -->
    <el-form-item label="型号规格" prop="modelNum">
      <el-input placeholder="请输入" v-model="state.detailForm.modelNum" />
    </el-form-item>
    <el-form-item label="设备类型" required prop="equipmentTypeId">
      <!-- <el-select v-model="state.detailForm.equipmentTypeId">
        <el-option
          v-for="item in opts"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select> -->
      <el-tree-select
        placeholder="选择设备类型"
        node-key="id"
        v-model="state.detailForm.equipmentTypeId"
        :data="opts"
        :render-after-expand="false"
        :props="typeProps"
        default-expand-all
        clearable
      />
    </el-form-item>
    <el-form-item label="安装时间" prop="openTime">
      <el-date-picker
        v-model="state.detailForm.openTime"
        type="datetime"
        placeholder="请选择日期时间"
        :value-format="COMMON_DATE_TIME_FORMAT"
      />
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { COMMON_FORM_CONFIG } from "@/constant/formConfig";
import { COMMON_DATE_TIME_FORMAT } from "@/constant";

const typeProps = {
  label: "name",
}
const init = {
  name: "",
  modelNum: "",
  // propertyNum: "",
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

const state = reactive({
  detailForm: { ...init },
});

onMounted(() => {
  state.detailForm = { ...init, ...props.initData };
});

defineExpose({
  validate: () => {
    return formRef.value
      .validate()
      .then(() => {
        const { equipmentModelParamList, equipmentCount, ...rest } =
          state.detailForm;
        return rest;
      })
      .catch(() => {
        return false;
      });
  },
});
</script>
