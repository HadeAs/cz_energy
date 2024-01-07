<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-24 20:16:45
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-27 19:37:22
 * @Description: 
-->
<template>
  <el-form
    ref="formRef"
    :rules="rules"
    label-position="left"
    :model="state.detailForm"
    label-width="180px"
    class="custom-form"
  >
    <el-form-item label="用户角色" required prop="userRole">
      <el-select v-model="state.detailForm.userRole" placeholder="请选择">
        <el-option v-for="item in COMMON_ROLE" v-bind="item" />
      </el-select>
    </el-form-item>
    <el-form-item label="用户名" required prop="userName">
      <el-input placeholder="请输入" v-model="state.detailForm.userName" autocomplete="false" />
    </el-form-item>
    <el-form-item label="密码" required prop="password">
      <el-input
        placeholder="请输入"
        v-model="state.detailForm.password"
        type="password"
        show-password
        autocomplete="false"
      />
    </el-form-item>
    <el-form-item label="锁定状态" required prop="status">
      <el-select v-model="state.detailForm.status" placeholder="请选择">
        <el-option v-for="item in LOCK_STATUS" v-bind="item" />
      </el-select>
    </el-form-item>
    <el-form-item label="关联项目" required prop="projects">
      <el-select
        multiple
        v-model="state.detailForm.projects"
        placeholder="请选择"
      >
        <el-option v-for="item in globalState.projects" v-bind="item" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="备注信息" required prop="description">
      <el-input
        v-model="state.detailForm.description"
        type="textarea"
        placeholder="请输入至少5个字符"
      />
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { LOCK_STATUS, COMMON_ROLE } from "@/constant";
import { storeToRefs } from 'pinia';
import appStore from '@/store/index.js';

const { globalState } = storeToRefs(appStore.global);

const init = {
  roleName: "",
  userName: "",
  password: "",
  status: "",
  projects: [],
  description: "",
};

const rules = {
  roleName: { required: true, message: "请选择用户角色", trigger: "change" },
  userName: { required: true, message: "请输入用户名", trigger: "blur" },
  password: { required: true, message: "请输入密码", trigger: "blur" },
  status: { required: true, message: "请选择锁定状态", trigger: "change" },
  projects: { required: true, message: "请选择关联项目", trigger: "change" },
  description: [
    { required: true, message: "请输入备注信息", trigger: "blur" },
    { min: 5, message: "请输入至少5个字符", trigger: "blur" },
  ],
};
const props = defineProps({
  initData: {
    type: Object,
  },
});

defineExpose({
  validate: () => {
    return formRef.value
      .validate()
      .then(() => {
        return state.detailForm;
      })
      .catch(() => {
        return false;
      });
  },
});

const formRef = ref();
const state = reactive({ detailForm: init });

onMounted(() => {
  if (props.initData) {
    const formData = { ...init, ...props.initData, projects: props.initData?.projects?.map(i => i?.id) };
    state.detailForm = formData;
  }
});
</script>
<style lang="scss" scoped>
.custom-form,
.sub-form-container {
  :deep() {
    .el-form-item {
      flex-direction: column !important;
    }
  }
}
</style>
