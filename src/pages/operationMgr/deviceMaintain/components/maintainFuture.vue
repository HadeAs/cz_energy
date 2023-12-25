<!--
 * @Author: ymZhang
 * @Date: 2023-12-25 13:56:35
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-25 14:01:59
 * @Description: 
-->
<template>
  <BoxContainer title="五年保养计划">
    <template #extra>
      <el-button type="primary" @click="handleEdit">编辑</el-button>
    </template>
    <div class="cs-text-wrap">{{ state.desc }}</div>
    <ProDrawer title="编辑保养计划" ref="drawerRef" @confirm="confirmAddVar">
      <el-form
        ref="formRef"
        v-bind="COMMON_FORM_CONFIG"
        :model="state.formData"
        :rules="rules"
      >
        <el-form-item label="计划内容" prop="desc">
          <el-input
            class="desc-inner"
            v-model="state.formData.desc"
            type="textarea"
            placeholder="请输入至少5个字符"
          />
        </el-form-item>
      </el-form>
    </ProDrawer>
  </BoxContainer>
</template>
<script setup name="MainTainPlan">
import { reactive, ref } from "vue";
import BoxContainer from "./boxContainer.vue";

const rules = {
  desc: [
    { required: true, message: "请输入至少5个字符", trigger: "blur" },
    { min: 5, message: "请输入至少5个字符", trigger: "blur" },
  ],
};
const drawerRef = ref();
const formRef = ref();
const state = reactive({
  desc: "这是保养计划内容这是保养计划内容这是保养计划内容这是保养计划内容，这是保养计划内容这是保养计划内容这是保养计划内容这是保养计划内容这是保养计划内容这是保养计划内容。这是保养计划内容这是保养计划内容这是保养计划内容这是保养计划内容这是保养计划内容这是保养计划内容这是保养计划内容这是保养计划内容这是保养计划内容这是保养计划内容这是保养计划内容这是保养计划内容，这是保养计划内容这是保养计划内容这是保养计划内容这是保养计划内容。",
  formData: {
    desc: "",
  },
});

const handleEdit = () => {
  state.formData.desc = state.desc;
  drawerRef.value.open();
};
const confirmAddVar = () => {
  formRef.value
    .validate()
    .then(() => {
      console.log("success");
      drawerRef.value.close();
    })
    .catch(() => {
      console.log("fail");
    });
};
</script>
<style lang="scss" scoped>
.cs-text-wrap {
  padding: 0 12px;
  line-height: 32px;
  border-radius: 3px;
  border: 1px solid #cfd4ed;
  min-height: 100px;
}
.desc-inner {
  :deep() {
    .el-textarea__inner {
      min-height: calc(100vh - 180px) !important;
    }
  }
}
</style>
