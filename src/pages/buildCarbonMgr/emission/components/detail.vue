<template>
  <ProDrawer :title="title" ref="handleDrawerRef" @confirm="confirmDetail">
    <el-form ref="formRef" v-bind="COMMON_FORM_CONFIG" :model="state.form">
      <el-form-item label="因子名称" required prop="name">
        <el-input placeholder="请输入名称" v-model="state.form.name" />
      </el-form-item>
      <el-form-item label="碳排放因子标准" required prop="standardId">
        <el-select v-model="state.form.standardId" placeholder="选择排放标准">
          <el-option v-for="item in staList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="值" required prop="value">
        <el-input placeholder="请输入值" v-model="state.form.value" />
      </el-form-item>
      <el-form-item label="年份" required prop="year">
        <el-date-picker type="year" placeholder="请选择年份" v-model="state.form.year" />
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
import { renderAxis } from '@/utils/index.js';

const { globalState } = storeToRefs(appStore.global);
const initData = {
  projectId: "",
  name: "",
  tag: "",
  type: "",
  year: "",
};
const emits = defineEmits(["submit"]);
const props = defineProps({
  title: { type: String },
  data: { type: Object, default: {} },
  staList: { type: Array, default: [] },
});
const handleDrawerRef = ref();
const formRef = ref();
const state = reactive({
  initFlag: false,
  form: { ...initData, ...props.data },
});

const confirmDetail = async () => {
  await formRef.value.validate((valid) => {
    if (valid) {
      emits("submit", { ...state.form, year: Number(renderAxis('year', state.form.year)) });
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
