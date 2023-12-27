<!--
 * @Author: ymZhang
 * @Date: 2023-12-26 15:34:18
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-26 21:41:37
 * @Description: 
-->
<template>
  <ProDrawer
    title="关联设备参数"
    ref="handleDrawerRef"
    @confirm="confirmDetail"
  >
    <el-form
      ref="formRef"
      class="device-container"
      v-bind="COMMON_FORM_CONFIG"
      :model="state.form"
    >
      <el-form-item prop="param">
        <el-input
          v-model="state.form.param"
          placeholder="请输入设备参数名称"
          :prefix-icon="Search"
        />
      </el-form-item>
      <el-form-item prop="devices">
        <el-checkbox-group v-model="state.form.devices">
          <el-checkbox
            v-for="item in state.deviceOpts"
            :key="item.id"
            :label="item.id"
            >{{ item.text }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </ProDrawer>
</template>
<script setup name="Detail">
import { ref, reactive, watch } from "vue";
import ProDrawer from "@/components/ProDrawer.vue";
import { COMMON_FORM_CONFIG } from "@/constant/formConfig";
import { Search } from "@element-plus/icons-vue";

const initData = {
  param: "",
  devices: [],
};
const emits = defineEmits(["submit"]);
const props = defineProps({
  data: { type: Object, default: {} },
});
const handleDrawerRef = ref();
const formRef = ref();
const state = reactive({
  form: { ...initData, ...props.data },
  deviceOpts: new Array(10).fill("").map((item, index) => ({
    text: "冷热源侧供水温度",
    id: index,
  })),
});
const confirmDetail = () => {
  // await formRef.value.validate((valid) => {
  //   if (valid) {
  //     handleDrawerRef.value.close();
  //     emits("submit", state.form);
  //   }
  // });
  emits("submit", state.form);
};

watch(
  () => props.data,
  (val) => {
    state.form = val;
  }
);
const open = () => {
  handleDrawerRef.value.open();
};
defineExpose({ open });
</script>
<style lang="scss" scoped>
.device-container {
  :deep() {
    .el-checkbox {
      display: flex;
    }
  }
}
</style>
