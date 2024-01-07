<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-24 20:16:45
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-27 19:47:57
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
    <el-form-item label="系统分类名称" required prop="name">
      <el-input placeholder="请输入" v-model="state.detailForm.name" />
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";

const init = {
  name: "",
};
const props = defineProps({
  initData: {
    type: Object,
  },
});
const rules = {
  name: {
    required: true,
    message: "请输入系统分类名称",
    trigger: "blur",
  },
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
