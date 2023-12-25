<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-24 20:16:45
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-25 17:04:49
 * @Description: 
-->
<template>
  <el-form
    ref="formRef"
    label-position="left"
    :model="state.detailForm"
    label-width="180px"
    class="custom-form"
  >
    <el-form-item label="网关ID" required prop="gatewayId">
      <el-input placeholder="请输入" v-model="state.detailForm.gatewayId" />
    </el-form-item>
    <el-form-item label="网关名称" required prop="gatewayName">
      <el-input placeholder="请输入" v-model="state.detailForm.gatewayName" />
    </el-form-item>
    <el-form-item label="网关版本" required prop="gatewayVersion">
      <el-input
        placeholder="请输入"
        v-model="state.detailForm.gatewayVersion"
      />
    </el-form-item>
    <el-form-item label="通讯接口" required prop="interface">
      <el-input placeholder="请输入" v-model="state.detailForm.interface" />
    </el-form-item>
    <el-form-item label="备注" required prop="remark">
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

const init = {
  gatewayName: "",
  gatewayId: "",
  gatewayVersion: "",
  interface: "",
  remark: "",
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
