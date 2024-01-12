<template>
  <ProDrawer :title="title" ref="handleDrawerRef" @confirm="confirmDetail">
    <el-form ref="formRef" v-bind="COMMON_FORM_CONFIG" :model="state.form">
      <el-form-item label="名称" required prop="name">
        <el-input placeholder="请输入名称" v-model="state.form.name" />
      </el-form-item>
      <el-form-item label="符号" required prop="tag">
        <el-input placeholder="请输入符号" v-model="state.form.tag" />
      </el-form-item>
      <el-form-item label="值" required prop="type">
        <el-input placeholder="请输入值" v-model="state.form.type" />
      </el-form-item>
    </el-form>
  </ProDrawer>
</template>
<script setup name="Detail">
import { ref, reactive, watch } from "vue";
import ProDrawer from "@/components/ProDrawer.vue";
import { COMMON_FORM_CONFIG } from "@/constant/formConfig";
import { storeToRefs } from "pinia";
import appStore from "@/store";
import { getInfo } from "@/api/deviceMgr/pointMgr";
import {
  getGatewayList,
  getVariablesByLevel,
  getVariablesByParent,
} from "@/api/common";

const { globalState } = storeToRefs(appStore.global);
const initData = {
  projectId: "",
  name: "",
  tag: "",
  type: "",
  maxThreshold: null,
  minThreshold: null,
  statisticsTypeId: "",
  gatewayId: "",
  template: "",
  commNum: null,
  period: "",
  number: "",
  status: true,
  hidden: false,
};
const emits = defineEmits(["submit"]);
const props = defineProps({
  title: { type: String },
  data: { type: Object, default: {} },
});
const handleDrawerRef = ref();
const formRef = ref();
const state = reactive({
  initFlag: false,
  form: { ...initData, ...props.data },
  info: {},
  gatewayList: [],
  variableList: [],
  templateList: [],
  timeOpts: [
    { id: 5, name: "5分钟" },
    { id: 10, name: "10分钟" },
    { id: 15, name: "15分钟" },
    { id: 30, name: "30分钟" },
    { id: 60, name: "60分钟" },
    { id: 90, name: "90分钟" },
  ],
});
const init = async () => {
  const { data: gatewayData } = await getGatewayList();
  // const { data: varData } = await getVariablesByLevel();
  const { data: tempData } = await getVariablesByParent();
  state.gatewayList = gatewayData.data;
  // state.variableList = varData.data;
  state.templateList = tempData.data;
  state.initFlag = true;
};

const getDetail = async (param) => {
  const { data } = await getInfo({ projectId: param.projectId, id: param.id });
  state.info = data.data;
  state.form.statisticsTypeId = data.data.statisticsTypeId;
  state.form.number = data.data.number;
  state.form.tag = data.data.tag;
  state.form.type = data.data.type;
  state.form.gatewayId = data.data.gatewayId;
};
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
    if (val.id) {
      // getDetail(val);
    }
    state.form = { ...initData, ...val };
  }
);
const open = () => {
  if (!state.initFlag) {
    // init();
  }
  handleDrawerRef.value.open();
};
const close = () => {
  handleDrawerRef.value.close();
};
defineExpose({ open, close });
</script>
