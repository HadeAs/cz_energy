<!--
 * @Author: ymZhang
 * @Date: 2023-12-26 22:43:43
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-06 18:06:33
 * @Description: 
-->

<template>
  <ProDrawer :title="title" ref="handleDrawerRef" @confirm="confirmDetail">
    <el-form ref="formRef" v-bind="COMMON_FORM_CONFIG" :model="state.form">
      <el-form-item label="所属项目" required prop="projectId">
        <el-select v-model="state.form.projectId">
          <el-option
            v-for="item in globalState.projects"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="点位名称" required prop="name">
        <el-input placeholder="请输入点位名称" v-model="state.form.name" />
      </el-form-item>
      <el-form-item label="点位标签" required prop="tag">
        <el-input placeholder="请输入点位标签" v-model="state.form.tag" />
      </el-form-item>
      <el-form-item label="点位类型" required prop="type">
        <el-input placeholder="请输入点位类型" v-model="state.form.type" />
      </el-form-item>
      <el-form-item label="最大阈值" required prop="maxThreshold">
        <el-input-number v-model="state.form.maxThreshold" />
      </el-form-item>
      <el-form-item label="最小阈值" required prop="minThreshold">
        <el-input-number v-model="state.form.minThreshold" />
      </el-form-item>
      <el-form-item label="关联变量" required prop="statisticsTypeId">
        <el-select v-model="state.form.statisticsTypeId">
          <el-option
            v-for="item in state.variableList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="智能网关" required prop="gatewayId">
        <el-select v-model="state.form.gatewayId">
          <el-option
            v-for="item in state.gatewayList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="点位模板" required prop="template">
        <el-select v-model="state.form.template">
          <el-option
            v-for="item in state.templateList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item> -->
      <el-form-item label="通讯站号" required prop="commNum">
        <el-input-number v-model="state.form.commNum" :min="0" />
      </el-form-item>
      <el-form-item label="检测周期" required prop="period">
        <el-select v-model="state.form.period">
          <el-option
            v-for="item in state.timeOpts"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="点位编号" required prop="number">
        <el-select v-model="state.form.number">
          <el-option
            v-for="item in state.timeOpts"
            :key="item.id"
            :label="item.text"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="启用状态" required prop="status">
        <el-radio-group v-model="state.form.status">
          <el-radio-button :label="true">启用</el-radio-button>
          <el-radio-button :label="false">停用</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否隐藏" required prop="hidden">
        <el-radio-group v-model="state.form.hidden">
          <el-radio-button :label="false">展示</el-radio-button>
          <el-radio-button :label="true">隐藏</el-radio-button>
        </el-radio-group>
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
  const { data: varData } = await getVariablesByLevel();
  const { data: tempData } = await getVariablesByParent();
  state.gatewayList = gatewayData.data;
  state.variableList = varData.data;
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
      getDetail(val);
    }
    state.form = { ...initData, ...val };
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
