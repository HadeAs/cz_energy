<!--
 * @Author: ymZhang
 * @Date: 2023-12-26 15:34:18
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-27 12:51:01
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
      <el-form-item label="设备名称" required prop="name">
        <el-input placeholder="请输入设备名称" v-model="state.form.name" />
      </el-form-item>
      <el-form-item label="设备种类" required prop="type">
        <el-select v-model="state.form.type">
          <el-option
            v-for="item in state.projectOpts"
            :key="item.id"
            :label="item.text"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="设备位置" required prop="position">
        <el-input v-model="state.form.position" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="系统分类" required prop="system">
        <el-select v-model="state.form.system">
          <el-option
            v-for="item in state.projectOpts"
            :key="item.id"
            :label="item.text"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="管理人" required prop="admin">
        <el-select v-model="state.form.admin">
          <el-option
            v-for="item in state.projectOpts"
            :key="item.id"
            :label="item.text"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="保养信息类别" required prop="classify">
        <el-select v-model="state.form.classify">
          <el-option
            v-for="item in state.projectOpts"
            :key="item.id"
            :label="item.text"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="启用时间" required prop="time">
        <el-date-picker
          value-format="YYYY-MM-DD hh:mm:ss"
          v-model="state.form.time"
          type="datetime"
          placeholder="请选择时间"
        />
      </el-form-item>
      <el-form-item label="启用状态" required prop="status">
        <el-radio-group v-model="state.form.status">
          <el-radio-button label="1">启用</el-radio-button>
          <el-radio-button label="2">停用</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上传设备图片" required prop="img">
        <ProUpload
          list-type="picture-card"
          :limit="5"
          :file-list="state.form.img"
        />
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
  type: "",
  position: "",
  system: "",
  admin: "",
  classify: "",
  time: "",
  status: "1",
  img: [],
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
      text: "demo1",
    },
    {
      id: "2",
      text: "demo2",
    },
    {
      id: "3",
      text: "demo3",
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
