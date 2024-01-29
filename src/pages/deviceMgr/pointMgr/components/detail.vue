<!--
 * @Author: ymZhang
 * @Date: 2023-12-26 22:43:43
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-17 15:47:01
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
      <el-form-item label="用能变量" prop="energyStatisticsId">
        <el-select v-model="state.form.energyStatisticsId">
          <el-option
            v-for="item in state.energyList"
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
      <el-form-item label="点位模板" required prop="templateId">
        <el-select v-model="state.form.templateId">
          <el-option
            v-for="item in state.unitList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="碳排放因子" prop="carbonStatisticsId">
        <el-select v-model="state.form.carbonStatisticsId">
          <el-option
            v-for="item in state.tpyList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="碳减排变量" prop="carbonReduceStatisticsId">
        <el-select v-model="state.form.carbonReduceStatisticsId">
          <el-option
            v-for="item in state.reduceList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="通讯站号" required prop="commNum">
        <el-input-number v-model="state.form.commNum" :min="0" />
      </el-form-item>
      <el-form-item label="检测周期(分钟)" required prop="period">
        <el-input-number v-model="state.form.period" :min="0" :max="9999" />
      </el-form-item>
      <el-form-item label="点位编号" required prop="number">
        <el-input-number v-model="state.form.number" :min="1" :max="255" />
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
import { getGatewayList, getUnitList, getEnergyList, getCarbonTpyList, getCarbonReduceList } from "@/api/common";
import { COMMON_FUNCTION_LIST } from "@/constant";

const { globalState } = storeToRefs(appStore.global);
const initData = {
  projectId: "",
  name: "",
  tag: "",
  type: "",
  maxThreshold: null,
  minThreshold: null,
  energyStatisticsId: "",
  gatewayId: "",
  templateId: "",
  commNum: null,
  period: 60,
  number: null,
  status: true,
  hidden: false,
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
  initFlag: false,
  form: { ...initData, ...props.data },
  info: {},
  gatewayList: [],
  variableList: [],
  unitList: [],
  energyList: [],
  tpyList: [],
  reduceList: [],
});
const init = async () => {
  const { data: gatewayData } = await getGatewayList();
  const { data: unitData } = await getUnitList();
  const { data: energyData } = await getEnergyList();
  const { data: tpy } = await getCarbonTpyList();
  const { data: reduce } = await getCarbonReduceList();
  state.gatewayList = gatewayData.data;
  state.unitList = unitData.data;
  state.energyList = energyData.data;
  state.tpyList = tpy.data;
  state.reduceList = reduce.data;
  state.initFlag = true;
};

const getDetail = async (param) => {
  const { data } = await getInfo({ projectId: param.projectId, id: param.id });
  state.info = data.data;
  state.form.number = data.data.number;
  state.form.tag = data.data.tag;
  state.form.type = data.data.type;
  state.form.gatewayId = data.data.gatewayId;
  state.form.templateId = data.data.templateId;
  state.form.energyStatisticsId = data.data.energyStatisticsId;
  state.form.function = data.data.function;
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
