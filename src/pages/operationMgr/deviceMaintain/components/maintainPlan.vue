<!--
 * @Author: ymZhang
 * @Date: 2023-12-25 13:10:14
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-25 13:53:08
 * @Description: 
-->
<template>
  <BoxContainer title="保养计划">
    <template #extra>
      <el-button type="primary" @click="handleAdd">添加</el-button>
    </template>
    <el-descriptions
      class="maintain-plan-container"
      :column="1"
      size="default"
      border
    >
      <el-descriptions-item
        v-for="(item, index) in state.exclData"
        :key="index"
        :label="item.label"
      >
        {{ item.value }}
      </el-descriptions-item>
    </el-descriptions>
    <ProDrawer title="添加保养计划" ref="drawerRef" @confirm="confirmAddVar">
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
  exclData: [
    {
      label: "2020年",
      value:
        "这是保养计划内容这是保养计划内容这是保养计划内容这是保养计划内容，这是保养计划内容这是保养计划内容这是保养计划内容这是这是保养计划内容这是保养计划内容这是保养计划内容这是保养计划内容，这是保养计划内容这是保养计划内容这是保养计划内容这是这是保养计划内容这是保养计划内容这是保养计划内容这是保养计划内容，这是保养计划内容这是保养计划内容这是保养计划内容这是",
    },
    {
      label: "2021年",
      value:
        "这是保养计划内容这是保养计划内容这是保养计划内容这是保养计划内容，这是保养计划内容这是保养计划内容这是保养计划内容这是",
    },
    {
      label: "2022年",
      value:
        "这是保养计划内容这是保养计划内容这是保养计划内容这是保养计划内容，这是保养计划内容这是保养计划内容这是保养计划内容这是",
    },
    {
      label: "2023年",
      value:
        "这是保养计划内容这是保养计划内容这是保养计划内容这是保养计划内容，这是保养计划内容这是保养计划内容这是保养计划内容这是",
    },
  ],
  formData: {
    desc: "",
  },
});

const handleAdd = () => {
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
.maintain-plan-container {
  :deep() {
    .el-descriptions__body
      .el-descriptions__table.is-bordered
      .el-descriptions__cell {
      min-width: 100px;
    }
  }
}
.desc-inner {
  :deep() {
    .el-textarea__inner {
      min-height: calc(100vh - 180px) !important;
    }
  }
}
</style>
