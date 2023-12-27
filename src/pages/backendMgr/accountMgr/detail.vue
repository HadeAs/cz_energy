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
      <el-input placeholder="请输入" v-model="state.detailForm.userName" />
    </el-form-item>
    <el-form-item label="密码" required prop="password">
      <el-input
        placeholder="请输入"
        v-model="state.detailForm.password"
        type="password"
        show-password
      />
    </el-form-item>
    <el-form-item label="锁定状态" required prop="status">
      <el-select v-model="state.detailForm.status" placeholder="请选择">
        <el-option v-for="item in LOCK_STATUS" v-bind="item" />
      </el-select>
    </el-form-item>
    <el-form-item label="关联项目" required prop="bindProject">
      <el-select
        multiple
        v-model="state.detailForm.bindProject"
        placeholder="请选择"
      >
        <el-option v-for="item in projects" v-bind="item" />
      </el-select>
    </el-form-item>
    <el-form-item label="备注信息" required prop="remark">
      <el-input
        v-model="state.detailForm.remark"
        type="textarea"
        placeholder="请输入至少5个字符"
      />
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { LOCK_STATUS, COMMON_ROLE } from "@/constant";

const init = {
  userRole: "",
  userName: "",
  password: "",
  status: "",
  bindProject: [],
  remark: "",
};
const projects = [
  { label: "项目001", value: "项目001" },
  { label: "项目002", value: "项目002" },
  { label: "项目003", value: "项目003" },
  { label: "项目004", value: "项目004" },
  { label: "项目005", value: "项目005" },
  { label: "项目006", value: "项目006" },
  { label: "项目007", value: "项目007" },
  { label: "项目008", value: "项目008" },
];
const rules = {
  userRole: { required: true, message: "请选择用户角色", trigger: "change" },
  userName: { required: true, message: "请输入用户名", trigger: "blur" },
  password: { required: true, message: "请输入密码", trigger: "blur" },
  status: { required: true, message: "请选择锁定状态", trigger: "change" },
  bindProject: { required: true, message: "请选择关联项目", trigger: "change" },
  remark: [
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
    const formData = { ...init, ...props.initData };
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
