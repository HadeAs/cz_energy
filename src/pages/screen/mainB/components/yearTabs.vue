<!--
 * @Author: ymZhang
 * @Date: 2024-01-22 12:09:44
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-22 12:27:45
 * @Description: 
-->
<template>
  <ul class="cs-btn-group margin-left-large-4">
    <li
      v-for="item in tabs"
      :key="item.id"
      :class="item.id === state.activeTab ? 'active' : ''"
      @click="handleClick(item.id)"
    >
      {{ item.name }}
    </li>
  </ul>
</template>
<script setup name="YearTabs">
import { reactive } from "vue";
const props = defineProps({
  defaultTab: { type: String, default: "" },
});
const emits = defineEmits(["change"]);
const tabs = [
  { id: "year", name: "年" },
  { id: "month", name: "月" },
  { id: "day", name: "日" },
];
const state = reactive({
  activeTab: props.defaultTab ? props.defaultTab : tabs[0].id,
});
const handleClick = (tab) => {
  if (tab !== state.activeTab) {
    state.activeTab = tab;
    emits("change", tab);
  }
};
</script>
