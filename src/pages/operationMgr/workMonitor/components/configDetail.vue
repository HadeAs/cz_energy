<!--
 * @Author: ymZhang
 * @Date: 2024-01-17 12:37:34
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-17 15:30:40
 * @Description: 
-->

<template>
  <ProDrawer :title="title" ref="handleDrawerRef" @confirm="confirmDetail">
    <el-form
      ref="formRef"
      v-bind="COMMON_FORM_CONFIG"
      :model="state.form"
      :rules="rules"
    >
      <el-form-item label="数据项名称" prop="name">
        <el-input placeholder="请输入数据项名称" v-model="state.form.name" />
      </el-form-item>
      <el-form-item label="数据项模板" prop="templateId">
        <el-select v-model="state.form.templateId">
          <el-option
            v-for="item in state.unitList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="关联点位" prop="deviceIds">
        <el-select v-model="state.form.deviceIds" multiple>
          <el-option
            v-for="item in state.collectList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="数据聚合" prop="function">
        <el-select v-model="state.form.function">
          <el-option
            v-for="item in COMMON_FUNCTION_LIST"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </ProDrawer>
</template>
<script setup name="Handle">
import { ref, reactive, watch } from "vue";
import ProDrawer from "@/components/ProDrawer.vue";
import { COMMON_FORM_CONFIG } from "@/constant/formConfig";
import { getUnitList } from "@/api/common";
import { getCollectList } from "@/api/deviceMgr";
import { COMMON_FUNCTION_LIST } from "@/constant";
import { getDataInfo } from "@/api/operationMgr/workMonitor";

const rules = {
  name: [{ required: true, message: "请输入数据项名称", trigger: "blur" }],
  templateId: [
    { required: true, message: "请选择数据项模板", trigger: "blur" },
  ],
  deviceIds: [{ required: true, message: "请选择关联点位", trigger: "blur" }],
  function: [{ required: true, message: "请选择数据聚合", trigger: "blur" }],
};
const initData = {
  name: "",
  templateId: "",
  deviceIds: [],
  type: "",
  function: "",
};
const emits = defineEmits(["submit"]);
const props = defineProps({
  title: { type: String },
  data: { type: Object, default: {} },
});
const handleDrawerRef = ref();
const formRef = ref();
const state = reactive({
  form: { ...initData, ...props.data },
  unitList: [],
  collectList: [],
  initFlag: false,
});
const confirmDetail = async () => {
  await formRef.value.validate((valid) => {
    if (valid) {
      emits("submit", state.form);
    }
  });
};

const init = async () => {
  const { data } = await getUnitList();
  const { data: collectData } = await getCollectList({
    projectId: props.data.projectId,
  });
  state.unitList = data.data;
  state.collectList = collectData.data;
  state.initFlag = true;
};

const getDetail = async () => {
  const { data } = await getDataInfo({
    projectId: props.data.projectId,
    id: props.data.id,
  });
  if (data?.data) {
    state.form.templateId = data.data.templateId;
  }
};

watch(
  () => props.data,
  (val) => {
    state.form = val;
    if (val?.id) {
      getDetail();
    }
  }
);
const open = () => {
  if (!state.initFlag) {
    init();
  }
  handleDrawerRef.value.open();
};
const close = () => {
  handleDrawerRef.value.close();
};
defineExpose({ open, close });
</script>
