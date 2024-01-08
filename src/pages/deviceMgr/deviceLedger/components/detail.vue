<!--
 * @Author: ymZhang
 * @Date: 2023-12-26 12:56:07
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-08 15:58:40
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
        type="datetime"
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
import {
  getInfo,
  addDeviceParam,
  delDeviceParam,
} from "@/api/deviceMgr/deviceLedger";
import Param from "./param.vue";

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
const paramRef = ref();

const initData = () => {
  if (props.initData) {
    const formData = { ...init, ...props.initData };
    const params = props.initData.equipmentModelParamList || [];
    return [formData, params];
  }
  return [{}, []];
};

const [formData, params] = initData();
const state = reactive({
  detailForm: formData,
  params,
});

const getDeviceInfo = async (param) => {
  const { projectId, id } = param;
  const { data } = await getInfo({ projectId, id });
  if (data?.data) {
    state.params = data.data.equipmentModelParamList || [];
    state.detailForm.equipmentTypeId = data.data.equipmentTypeId;
  }
};

onMounted(() => {
  const [formData, params] = initData();
  state.detailForm = formData;
  state.params = params;
  if (props.initData?.id) {
    getDeviceInfo(props.initData);
  }
});

const updateParam = async () => {
  let changeFlag = false;
  const params = paramRef.value.getValue();
  const ids = params.map((item) => item.id);
  const delParams = props.initData.equipmentModelParamList.filter(
    (item) => !ids.includes(item.id)
  );
  const addParams = params.filter((item) => !item.id);
  if (delParams.length) {
    changeFlag = true;
    for (let i = 0; i < delParams.length; i += 1) {
      await delDeviceParam(props.initData.projectId, {
        id: delParams[i].id,
        equipmentModelId: props.initData.id,
      });
    }
  }
  if (addParams.length) {
    changeFlag = true;
    for (let i = 0; i < addParams.length; i += 1) {
      await addDeviceParam(props.initData.projectId, {
        equipmentModelId: props.initData.id,
        ...addParams[i],
      });
    }
  }
  if (changeFlag) {
    const { data } = await getInfo({
      projectId: props.initData.projectId,
      id: props.initData.id,
    });
  }
  // const newParams = params.map((item, index) => ({
  //   id: index,
  //   name: item.name,
  //   value: item.value,
  //   equipmentModelId: props.initData.id,
  // }));
  // state.detailForm.equipmentModelParamList = newParams;
  // state.detailForm.equipmentCount = newParams.length;
};

defineExpose({
  validate: () => {
    return formRef.value
      .validate()
      .then(async () => {
        if (props.initData?.id) {
          // edit
          await updateParam();
        }
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
