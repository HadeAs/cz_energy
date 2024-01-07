<!--
 * @Author: ymZhang
 * @Date: 2023-12-26 13:27:07
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-06 22:26:51
 * @Description: 
-->
<template>
  <div class="container">
    <div class="title">技术参数</div>
    <el-form ref="formRef" v-model="state.formValue">
      <div
        class="block"
        v-for="(item, index) in Object.keys(state.formValue)"
        :key="item"
      >
        <div class="block-title">
          <span class="left">参数{{ index + 1 }}: </span>
          <el-button class="del-btn" type="danger" text @click="delRule(item)"
            >删除</el-button
          >
        </div>
        <el-form-item label="参数名称" :prop="item + '.name'">
          <el-input
            v-model="state.formValue[item].name"
            placeholder="请输入参数名称"
          />
        </el-form-item>
        <el-form-item label="参数内容" :prop="item + '.value'">
          <el-input
            v-model="state.formValue[item].value"
            placeholder="请输入参数内容"
          />
        </el-form-item>
      </div>
    </el-form>
    <el-button
      type="primary"
      plain
      class="add-btn"
      :icon="Plus"
      @click="addRule"
      >添加</el-button
    >
  </div>
</template>
<script setup name="Param">
import { reactive, watch, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";

const props = defineProps({
  params: { type: Array, default: [] },
});

const formRef = ref();
const initForm = (params) => {
  const param = {};
  params.forEach((item, index) => {
    param[index] = {
      ...item,
      name: item.name,
      value: item.value,
    };
  });
  return param;
};
const state = reactive({
  formValue: initForm(props.params),
});
const delRule = (index) => {
  delete state.formValue[index];
};
const addRule = () => {
  const randomKey = Math.random();
  state.formValue[randomKey] = {
    name: "",
    value: "",
  };
};
watch(
  () => props.params,
  (val) => {
    state.formValue = initForm(val);
  },
  { deep: true }
);
const getValue = () => {
  const params = [];
  Object.keys(state.formValue).forEach((key) => {
    params.push({
      ...state.formValue[key],
      name: state.formValue[key].name,
      value: state.formValue[key].value,
    });
  });
  return params;
};
defineExpose({ getValue });
</script>
<style lang="scss" scoped>
.container {
  .title {
    font-weight: bold;
    margin-bottom: 10px;
  }
  .block {
    background: #f5f7fd;
    padding: 10px 16px;
    margin-bottom: 10px;
    .block-title {
      display: flex;
      justify-value: space-between;
      align-items: center;
      margin-bottom: 10px;
      span {
        font-weight: bold;
      }
    }
    .del-btn {
      padding-right: 0;
    }
  }
  .add-btn {
    width: 100%;
  }
}
</style>
