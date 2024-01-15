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
    <el-form-item label="用户角色" required prop="roleId">
      <el-select v-model="state.detailForm.roleId" placeholder="请选择">
        <el-option
          v-for="item in globalState.roleList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="用户名" required prop="userName">
      <el-input
        placeholder="请输入"
        v-model="state.detailForm.userName"
        autocomplete="false"
      />
    </el-form-item>
<!--    <el-form-item label="密码" required prop="passwordPlainText">-->
<!--      <el-input-->
<!--        placeholder="请输入"-->
<!--        v-model="state.detailForm.passwordPlainText"-->
<!--        type="password"-->
<!--        show-password-->
<!--        autocomplete="false"-->
<!--      />-->
<!--    </el-form-item>-->
    <el-form-item label="手机号码" required prop="phone">
      <el-input v-model="state.detailForm.phone" placeholder="手机号码">
        <template #prefix>
          <el-icon><Iphone /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="锁定状态" required prop="locked">
      <el-select v-model="state.detailForm.locked" placeholder="请选择">
        <el-option v-for="item in LOCK_STATUS" v-bind="item" />
      </el-select>
    </el-form-item>
    <el-form-item label="关联项目" required prop="projectIds">
      <el-select
        multiple
        v-model="state.detailForm.projectIds"
        placeholder="请选择"
      >
        <el-option
          v-for="item in globalState.projects"
          v-bind="item"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
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
import { storeToRefs } from "pinia";
import appStore from "@/store/index.js";
import { getUserInfo } from "@/api/backstageMng/userMng";

const { globalState } = storeToRefs(appStore.global);

const phoneTest = /^1[3456789]\d{9}$/;
const init = {
  roleId: "",
  userName: "",
  passwordPlainText: "",
  phone: "",
  locked: 0,
  projectIds: [],
  description: "",
  department: "",
};

const rules = {
  roleId: { required: true, message: "请选择用户角色", trigger: "change" },
  userName: { required: true, message: "请输入用户名", trigger: "blur" },
  // passwordPlainText: { required: true, message: "请输入密码", trigger: "blur" },
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      pattern: phoneTest,
      message: "手机号码格式不正确",
      trigger: "blur",
    },
  ],
  locked: { required: true, message: "请选择锁定状态", trigger: "change" },
  projectIds: { required: true, message: "请选择关联项目", trigger: "change" },
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

const getInfo = async (id) => {
  const { data } = await getUserInfo({ id });
  if (data?.data) {
    state.detailForm = { ...data.data };
  }
};

onMounted(() => {
  if (props.initData) {
    getInfo(props.initData.id);
    const formData = {
      ...init,
      ...props.initData,
      // projectIds: props.initData?.projects?.map((i) => i?.id),
    };
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
