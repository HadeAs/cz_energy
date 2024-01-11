<!--
 * @Author: ymZhang
 * @Date: 2023-12-23 19:10:40
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-11 15:06:45
 * @Description: 
-->
<template>
  <div class="select-container">
    <span v-if="label" class="cs-title-unit margin-right-base">{{
      label
    }}</span>
    <el-select
      v-model="state.value"
      class="cs-title-select"
      :style="{ width: state.width }"
      @change="handleChange"
    >
      <el-option
        v-for="item in state.opts"
        :key="item.id"
        :label="item.text"
        :value="item.id"
      />
    </el-select>
  </div>
</template>
<script setup name="UnitSelect">
import { reactive } from "vue";

const localOpts = [
  {
    id: "2023",
    text: "2023",
  },
  {
    id: "2022",
    text: "2022",
  },
  {
    id: "2021",
    text: "2021",
  },
];
const defaultWidth = "90px";
const emits = defineEmits(["change"]);
const props = defineProps(["label", "options", "width", "defaultValue"]);
const getDefaultValue = () => {
  if (props.defaultValue) return props.defaultValue;
  return props.options ? props.options[0].id : localOpts[0].id;
};
const state = reactive({
  value: getDefaultValue(),
  opts: props.options || localOpts,
  width: props.width || defaultWidth,
});
const handleChange = () => {
  emits("change", state.value);
};
</script>
<style lang="scss" scoped>
.select-container {
  box-sizing: border-box;
  display: inline-block;
  margin: 0;
  position: relative;
  vertical-align: middle;

  .cs-title-unit {
    color: #7a7886;
  }

  :deep() {
    .el-input {
      height: 28px;
    }
    .el-input__wrapper {
      background-color: transparent !important;
      box-shadow: 0 0 0 1px rgba(110, 215, 254, 0.4) inset;
    }
    .el-select:hover:not(.el-select--disabled) .el-input__wrapper {
      box-shadow: 0 0 0 1px rgba(0, 249, 255, 0.6) inset;
    }
    .el-select .el-input__wrapper.is-focus {
      box-shadow: 0 0 0 1px rgba(0, 249, 255, 0.6) inset;
    }
    .el-select .el-input__inner {
      color: #fff;
    }
    .el-select .el-input .el-select__caret.el-icon {
      color: rgba(0, 249, 255, 0.6);
    }
  }
}
</style>
