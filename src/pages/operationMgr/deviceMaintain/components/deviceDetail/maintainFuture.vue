<!--
 * @Author: ymZhang
 * @Date: 2023-12-25 13:56:35
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-08 12:45:48
 * @Description: 
-->
<template>
  <BoxContainer title="五年保养计划">
    <template #extra>
      <el-button
        type="primary"
        @click="handleEdit"
        v-auth="'maintain_device_edit'"
        >编辑</el-button
      >
    </template>
    <div class="cs-text-wrap">{{ plan }}</div>
    <ProDrawer title="编辑保养计划" ref="drawerRef" @confirm="confirmAddVar">
      <el-form
        ref="formRef"
        v-bind="COMMON_FORM_CONFIG"
        :model="state.formData"
        :rules="rules"
      >
        <el-form-item label="计划内容" prop="content">
          <el-input
            class="content-inner"
            v-model="state.formData.content"
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
import BoxContainer from "../boxContainer.vue";
import { setFiveYearPlan } from "@/api/operationMgr/deviceMaintain";

const props = defineProps({
  deviceId: { type: String },
  projectId: { type: String },
  plan: { type: String },
});
const emits = defineEmits(["reload"]);
const rules = {
  content: [
    { required: true, message: "请输入至少5个字符", trigger: "blur" },
    { min: 5, message: "请输入至少5个字符", trigger: "blur" },
  ],
};
const drawerRef = ref();
const formRef = ref();
const state = reactive({
  formData: {
    content: "",
  },
});

const handleEdit = () => {
  state.formData.content = props.plan;
  drawerRef.value.open();
};
const confirmAddVar = () => {
  formRef.value
    .validate()
    .then(async () => {
      const { code } = await setFiveYearPlan(props.projectId, {
        equipmentModelId: props.deviceId,
        fiveYearMaintainPlan: state.formData.content,
      });
      if (code === 200) {
        ElMessage.success("5年保养计划修改成功");
        emits("reload");
        drawerRef.value.close();
      }
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
.content-inner {
  :deep() {
    .el-textarea__inner {
      min-height: calc(100vh - 180px) !important;
    }
  }
}
</style>
