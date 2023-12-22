<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-22 16:08:34
 * @Description: 
-->
<template>
  <EchartTreeContainer>
    <template #left>
      <Echart :option="option" />
    </template>
    <template #right>
      <el-input
        v-model="varName"
        placeholder="请输入内容"
        :prefix-icon="Search"
        style="margin-bottom: 10px"
      />
      <el-tree
        :data="treeData"
        show-checkbox
        node-key="id"
        ref="treeRef"
        default-expand-all
        @check="varCheckChangeHandle"
        :default-checked-keys="[8, 9, 10, 11]"
        :filter-node-method="filterNode"
      />
    </template>
  </EchartTreeContainer>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from "vue";
import { Search } from "@element-plus/icons-vue";
import Echart from "@/components/Echart.vue";
import { COMMON_ECHART_OPTION, CARBON_CATEGORY_DATA } from "@/constant";
import EchartTreeContainer from "@/components/EchartTreeContainer.vue";

const varName = ref("");
const treeRef = ref();
const treeData = ref(CARBON_CATEGORY_DATA);

const randomArr = (num) => {
  return new Array(13).fill("").map((v) => (Math.random() * num).toFixed(0));
};

watch(varName, (val) => {
  treeRef.value && treeRef.value.filter(val);
});

const filterNode = (value, data) => {
  if (!value) return true;
  return data.label.includes(value);
};

const varCheckChangeHandle = () => {
  const checks = treeRef.value.getCheckedNodes();
  const checkchilds = checks.filter((v) => !v.children);
  // 动态更改图表数据
  const seriesData = [];
  const legendData = [];
  checkchilds.forEach((item) => {
    legendData.push(item.label);
    seriesData.push({
      name: item.label,
      type: "line",
      smooth: true,
      data: randomArr(1000),
    });
  });
  option.value.legend.data = legendData;
  option.value.series = seriesData;
  option.value = { ...option.value };
  //跨父节点节点禁止点击
  if (checkchilds.length) {
    const node = checkchilds[0];
    treeData.value.forEach((v) => {
      if (!v.children.find((item) => item.id === node.id)) {
        v.disabled = true;
        v.children.forEach((j) => {
          j.disabled = true;
        });
      }
    });
  } else {
    treeData.value.forEach((v) => {
      v.disabled = false;
      v.children.forEach((j) => {
        j.disabled = false;
      });
    });
  }
  treeData.value = [...treeData.value];
  nextTick(() => {
    treeRef.value.setCheckedNodes(checks);
  });
};

onMounted(() => {
  varCheckChangeHandle();
});

const option = ref(COMMON_ECHART_OPTION);
</script>
<style lang="scss" scoped></style>
