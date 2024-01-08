<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-24 20:16:45
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-27 19:42:57
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
    <el-form-item label="角色名称" required prop="name">
      <el-input placeholder="请输入" v-model="state.detailForm.name" />
    </el-form-item>
    <el-form-item label="角色key" required prop="roleKey">
      <el-input placeholder="请输入" v-model="state.detailForm.roleKey" />
    </el-form-item>
    <el-form-item label="备注信息" required prop="description">
      <el-input
        v-model="state.detailForm.description"
        type="textarea"
        placeholder="请输入至少5个字符"
      />
    </el-form-item>
    <el-form-item label="权限范围" required prop="level">
      <el-select v-model="state.detailForm.level" placeholder="请选择">
        <el-option label="部分项目" :value="0"></el-option>
        <el-option label="所有项目" :value="1"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { fetchOneRole } from '@/api/backstageMng/authMng.js';

const init = {
  roleKey: "",
  name: "",
  description: "",
};
const props = defineProps({
  initData: {
    type: Object,
  },
});
const rules = {
  name: { required: true, message: "请输入角色名称", trigger: "blur" },
  roleKey: { required: true, message: "请输入角色key", trigger: "blur" },
  description: [
    { required: true, message: "请输入备注信息", trigger: "blur" },
    { min: 5, message: "请输入至少5个字符", trigger: "blur" },
  ],
};
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

onMounted(async () => {
  if (props.initData) {
    const { data } = await fetchOneRole(props.initData);
    if (data?.data) {
      state.detailForm = { ...init, ...props.initData, ...data?.data }
    }
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
