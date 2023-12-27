<!--
 * @Author: ymZhang
 * @Date: 2023-12-26 22:43:43
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-27 13:18:28
 * @Description: 
-->

<template>
  <ProDrawer :title="title" ref="handleDrawerRef" @confirm="confirmDetail">
    <el-form ref="formRef" v-bind="COMMON_FORM_CONFIG" :model="state.form">
      <el-form-item label="所属项目" required prop="project">
        <el-select v-model="state.form.project">
          <el-option
            v-for="item in state.projectOpts"
            :key="item.id"
            :label="item.text"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="点位名称" required prop="name">
        <el-input placeholder="请输入点位名称" v-model="state.form.name" />
      </el-form-item>
      <el-form-item label="点位标签" required prop="label">
        <el-input placeholder="请输入点位标签" v-model="state.form.label" />
      </el-form-item>
      <el-form-item label="点位类型" required prop="type">
        <el-input placeholder="请输入点位类型" v-model="state.form.type" />
      </el-form-item>
      <el-form-item label="最大阈值" required prop="temp">
        <el-input placeholder="请输入最大阈值" v-model="state.form.temp" />
      </el-form-item>
      <el-form-item label="最小阈值" required prop="temp2">
        <el-input placeholder="请输入最小阈值" v-model="state.form.temp2" />
      </el-form-item>
      <el-form-item label="关联变量" required prop="relation">
        <el-select v-model="state.form.relation">
          <el-option
            v-for="item in state.projectOpts"
            :key="item.id"
            :label="item.text"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="智能网关" required prop="gateway">
        <el-select v-model="state.form.gateway">
          <el-option
            v-for="item in state.projectOpts"
            :key="item.id"
            :label="item.text"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="点位模板" required prop="template">
        <el-select v-model="state.form.template">
          <el-option
            v-for="item in state.projectOpts"
            :key="item.id"
            :label="item.text"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="通讯站号" required prop="state">
        <el-input v-model="state.form.state" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="检测周期" required prop="time">
        <el-select v-model="state.form.time">
          <el-option
            v-for="item in state.timeOpts"
            :key="item.id"
            :label="item.text"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="点位编号" required prop="positionNo">
        <el-select v-model="state.form.positionNo">
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
          <el-radio-button label="1">启用</el-radio-button>
          <el-radio-button label="2">停用</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否隐藏" required prop="hide">
        <el-radio-group v-model="state.form.hide">
          <el-radio-button label="1">展示</el-radio-button>
          <el-radio-button label="2">隐藏</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </ProDrawer>
</template>
<script setup name="Detail">
import { ref, reactive, watch } from "vue";
import ProDrawer from "@/components/ProDrawer.vue";
import { COMMON_FORM_CONFIG } from "@/constant/formConfig";
import ProUpload from "@/components/ProUpload.vue";

const initData = {
  project: "",
  name: "",
  label: "",
  type: "",
  temp: "",
  temp2: "",
  relation: "",
  gateway: "",
  template: "",
  state: "",
  time: "",
  positionNo: "",
  status: "1",
  hide: "1",
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
  projectOpts: [
    {
      id: "1",
      text: "网关1",
    },
    {
      id: "2",
      text: "网关2",
    },
  ],
  timeOpts: [
    {
      id: "1",
      text: "1分钟",
    },
    {
      id: "2",
      text: "2分钟",
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

watch(
  () => props.data,
  (val) => {
    state.form = { ...initData, ...val };
  }
);
const open = () => {
  handleDrawerRef.value.open();
};
defineExpose({ open });
</script>
