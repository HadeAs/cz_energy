<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-23 16:21:41
 * @Description: 
-->
<template>
  <div>
    <TimeRangeSearch
      @time-change="handleTimeChange"
      @export-click="handleExport"
    />
    <EchartTreeContainer
      style="height: calc(100vh - 203px)"
      :showSwitch="true"
      @type-change="handleTypeChange"
    >
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
          :default-checked-keys="[2, 3, 4]"
          :filter-node-method="filterNode"
        />
      </template>
    </EchartTreeContainer>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, nextTick } from "vue";
import { Search } from "@element-plus/icons-vue";
import Echart from "@/components/Echart.vue";
import { COMMON_ECHART_OPTION, CHARGE_CATEGORY_DATA } from "@/constant";
import EchartTreeContainer from "@/components/EchartTreeContainer.vue";
import MainContentContainer from "@/components/MainContentContainer.vue";

const varName = ref("");
const treeRef = ref();
const xAxisCnt = ref(12);
const suffix = ref(":00");
const chartOption = ref(COMMON_ECHART_OPTION);
const treeData = ref(CHARGE_CATEGORY_DATA);
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
const handleTimeChange = (val) => {};
const handleExport = () => {};
</script>
