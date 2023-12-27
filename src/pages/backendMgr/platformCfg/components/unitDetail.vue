<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-24 20:16:45
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-27 19:45:38
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
    <el-form-item label="单位名称" required prop="unitName">
      <el-input placeholder="请输入" v-model="state.detailForm.unitName" />
    </el-form-item>
    <el-form-item label="符号" required prop="symbol">
      <el-input placeholder="请输入" v-model="state.detailForm.symbol" />
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
  symbol: "",
  unitName: "",
  remark: "",
};
const props = defineProps({
  initData: {
    type: Object,
  },
});
const rules = {
  unitName: { required: true, message: "请输入单位名称", trigger: "blur" },
  symbol: { required: true, message: "请输入符号", trigger: "blur" },
  remark: [
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
