<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-24 20:16:45
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-09 09:59:36
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
    <el-form-item label="用户名" required prop="userName">
      <el-input placeholder="请输入" v-model="state.detailForm.userName" autocomplete="false" disabled />
    </el-form-item>
    <el-form-item label="旧密码" required prop="oldPassword">
      <el-input
        placeholder="请输入"
        v-model="state.detailForm.oldPassword"
        type="password"
        show-password
        autocomplete="false"
      />
    </el-form-item>
    <el-form-item label="新密码" required prop="newPassword">
      <el-input
        placeholder="请输入"
        v-model="state.detailForm.newPassword"
        type="password"
        show-password
        autocomplete="false"
      />
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { LOCK_STATUS, COMMON_ROLE } from "@/constant";
import { storeToRefs } from "pinia";
import appStore from "@/store/index.js";
import { getUserInfo } from "@/api/backstageMng/userMng";

const { globalState } = storeToRefs(appStore.global);

const init = {
  userName: "",
  oldPassword: "",
  newPassword: "",
};

const rules = {
  userName: { required: true, message: "请输入用户名", trigger: "blur" },
  oldPassword: { required: true, message: "请输入旧密码", trigger: "blur" },
  newPassword: { required: true, message: "请输入新密码", trigger: "blur" },
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
          const { id, oldPassword, newPassword } = state.detailForm;
          return { id, oldPassword, newPassword };
        })
        .catch(() => {
          return false;
        });
  },
});

const formRef = ref();
const state = reactive({ detailForm: init });

const getInfo = async (id) => {
  const { data } = await getUserInfo({ id });
  if (data?.data) {
    state.detailForm = { ...data.data };
  }
};

onMounted(() => {
  if (props.initData) {
    getInfo(props.initData.id);
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
