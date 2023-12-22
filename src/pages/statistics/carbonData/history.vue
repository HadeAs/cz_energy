<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-22 22:03:01
 * @Description: 
-->
<template>
  <MainContentContainer class="search">
    <el-form :inline="true" :model="formData">
      <el-form-item label="时间范围">
        <el-date-picker
          v-model="formData.timeRange"
          type="datetimerange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="YYYY-MM-DD hh:mm:ss"
        />
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="primary">导出</el-button>
      </el-form-item>
    </el-form>
  </MainContentContainer>
  <EchartTreeContainer :showSwitch="true" @type-change="handleTypeChange">
    <template #left>
      <Echart :option="chartOption" />
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
import { ref, reactive, watch, onMounted, nextTick } from "vue";
import { Search } from "@element-plus/icons-vue";
import Echart from "@/components/Echart.vue";
import { COMMON_ECHART_OPTION, CARBON_CATEGORY_DATA } from "@/constant";
import EchartTreeContainer from "@/components/EchartTreeContainer.vue";
import MainContentContainer from "@/components/MainContentContainer.vue";

const varName = ref("");
const treeRef = ref();
const xAxisCnt = ref(12);
const suffix = ref(":00");
const chartOption = ref(COMMON_ECHART_OPTION);
const treeData = ref(CARBON_CATEGORY_DATA);
const formData = reactive({
  timeRange: "",
});

const randomArr = (count, num) => {
  return new Array(count).fill("").map((v) => (Math.random() * num).toFixed(0));
};

watch(varName, (val) => {
  treeRef.value && treeRef.value.filter(val);
});

const filterNode = (value, data) => {
  if (!value) return true;
  return data.label.includes(value);
};

const handleTypeChange = (val) => {
  switch (val) {
    case "hour":
      xAxisCnt.value = 12;
      suffix.value = ":00";
      break;
    case "day":
      xAxisCnt.value = 31;
      suffix.value = "日";
      break;
    case "month":
      xAxisCnt.value = 12;
      suffix.value = "月";
      break;
    case "year":
      xAxisCnt.value = 10;
      suffix.value = "年";
      break;
    default:
      break;
  }
  varCheckChangeHandle();
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
      showSymbol: false,
      data: randomArr(xAxisCnt.value, 1000),
    });
  });
  chartOption.value.xAxis[0].data = new Array(xAxisCnt.value)
    .fill("")
    .map(
      (v, i) => `${suffix.value === "年" ? 2001 + i : i + 1}${suffix.value}`
    );
  chartOption.value.legend.data = legendData;
  chartOption.value.series = seriesData;
  chartOption.value = { ...chartOption.value };
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
</script>
