<!--
 * @Author: ymZhang
 * @Date: 2023-12-23 19:28:34
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-26 21:24:54
 * @Description: 
-->
<template>
  <MainContentContainer class="search">
    <el-form :inline="true" :model="state.formData">
      <el-form-item label="时间范围">
        <el-date-picker
          v-model="state.formData.timeRange"
          type="datetimerange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="YYYY-MM-DD hh:mm:ss"
          @change="handleDateChange"
        />
      </el-form-item>
      <el-form-item style="float: right">
        <el-button v-auth="authKey" type="primary" @click="handleExport"
          >导出</el-button
        >
      </el-form-item>
    </el-form>
  </MainContentContainer>
</template>
<script setup name="TimeRangeSearch">
import MainContentContainer from "@/components/MainContentContainer.vue";
import { reactive } from "vue";

defineProps({
  authKey: {
    type: String,
  },
});

const emits = defineEmits(["export-click", "time-change"]);
const state = reactive({
  formData: {
    timeRange: "",
  },
});

const handleDateChange = (val) => {
  emits("time-change", val);
};

const handleExport = () => {
  emits("export-click");
};
</script>
<style lang="scss" scoped>
.search {
  margin-bottom: 10px;
  :deep() {
    .el-form {
      .el-form-item:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
