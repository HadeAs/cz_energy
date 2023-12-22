<template>
  <div class="select-container">
    <span class="cs-title-unit margin-right-base">{{ label }}</span>
    <el-select v-model="state.value" class="cs-title-select">
      <el-option v-for="item in state.opts" :key="item" :label="item" :value="item" />
    </el-select>
  </div>
</template>
<script setup name="UnitSelect">
import { reactive } from "vue";

defineProps(["label"])
const state = reactive({
  value: "2023",
  opts: ["2023", "2022", "2021"]
})
</script>
<style lang="scss" scoped>
.select-container {
  :deep() {
    .el-select {
      width: 75px;
    }
    .el-input__wrapper {
        background-color: transparent !important;
        box-shadow: 0 0 0 1px rgba(110, 215, 254, 0.4) inset;
      }
  }
}
</style>