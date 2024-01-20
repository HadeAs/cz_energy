<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-25 13:16:28
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-19 19:39:55
 * @Description: 
-->
<template>
  <MainContentContainer class="pro-search-container">
    <el-form :inline="true" :model="dynamicFormData">
      <el-form-item
        v-for="(domain, index) in dynamicFormData"
        :label="domain.label"
        :prop="domain.prop"
        v-auth="domain.authKey"
      >
        <el-input
          v-if="domain.type === 'input'"
          v-model="domain.value"
          placeholder="请输入"
          clearable
        />
        <el-date-picker
          v-else-if="domain.type === 'datetimerange'"
          v-model="domain.value"
          type="datetimerange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :value-format="COMMON_DATE_TIME_FORMAT"
          v-bind="domain.config || {}"
          @change="handleChange(domain)"
        />
        <el-select
          v-else-if="domain.type === 'select'"
          v-model="domain.value"
          placeholder="请选择"
          clearable
        >
          <el-option
            v-for="opt in domain.options"
            :key="opt.value"
            :label="opt.label"
            :value="opt.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          v-auth="authKey"
          type="primary"
          @click="onSubmit"
          v-bind="buttonConfig"
          >{{ buttonContent }}</el-button
        >
      </el-form-item>
    </el-form>
  </MainContentContainer>
</template>
<script setup>
import { reactive } from "vue";
import MainContentContainer from "@/components/MainContentContainer.vue";
import { COMMON_DATE_TIME_FORMAT } from "@/constant";

const props = defineProps({
  formInfo: {
    type: Array,
    default: [],
  },
  buttonContent: {
    type: String,
    default: "搜索",
  },
  buttonConfig: {
    type: Object,
    default: {},
  },
  authKey: {
    type: String,
  },
});

const emits = defineEmits(["button-click", "search-change"]);

const dynamicFormData = reactive(props.formInfo);
const onSubmit = () => {
  emits("button-click", dynamicFormData);
};
const handleChange = (item) => {
  emits("search-change", { prop: item.prop, value: item.value });
};
</script>
