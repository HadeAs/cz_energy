<template>
  <div class="select-container">
    <span v-if="label" class="cs-title-unit margin-right-base">{{ label }}</span>
    <el-select v-model="state.value" class="cs-title-select" :style="{ width: state.width }">
      <el-option v-for="item in state.opts" :key="item.id" :label="item.text" :value="item.id" />
    </el-select>
  </div>
</template>
<script setup name="UnitSelect">
import { reactive } from "vue";

const localOpts = [{
  id: "2023",
  text: "2023"
}, {
  id: "2022",
  text: "2022"
}, {
  id: "2021",
  text: "2021"
}];
const defaultWidth = "90px";
const props = defineProps(["label", "options", "width"]);
const state = reactive({
  value: props.options ? props.options[0].id : localOpts[0].id,
  opts: props.options || localOpts,
  width: props.width || defaultWidth
})
</script>
<style lang="scss" scoped>
.select-container {
  box-sizing: border-box;
  display: inline-block;
  margin: 0;
  position: relative;
  vertical-align: middle;

  :deep() {

    .el-input__wrapper {
      background-color: transparent !important;
      box-shadow: 0 0 0 1px rgba(110, 215, 254, 0.4) inset;
    }
  }
}
</style>