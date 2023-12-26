<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-25 13:16:28
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-26 21:08:17
 * @Description: 
-->
<template>
  <MainContentContainer class="pro-search-container">
    <el-form :inline="true" :model="dynamicFormData">
      <el-form-item
        v-for="(domain, index) in dynamicFormData"
        :label="domain.label"
        :prop="domain.prop"
      >
        <el-input
          v-if="domain.type === 'input'"
          v-model="domain.value"
          placeholder="请输入"
          clearable
        />
        <el-date-picker
          v-if="domain.type === 'datetimerange'"
          v-model="domain.value"
          type="datetimerange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="YYYY-MM-DD hh:mm:ss"
        />
      </el-form-item>
      <el-form-item>
        <el-button v-auth="authKey" type="primary" @click="onSubmit">{{
          buttonContent
        }}</el-button>
      </el-form-item>
    </el-form>
  </MainContentContainer>
</template>
<script setup>
import { reactive } from "vue";
import MainContentContainer from "@/components/MainContentContainer.vue";

const props = defineProps({
  formInfo: {
    type: Array,
    default: [],
  },
  buttonContent: {
    type: String,
    default: "搜索",
  },
  authKey: {
    type: String,
  },
});

const emits = defineEmits(["button-click"]);

const dynamicFormData = reactive(props.formInfo);
const onSubmit = () => {
  emits("button-click", dynamicFormData);
};
</script>
