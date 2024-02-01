<!--
 * @Author: ymZhang
 * @Date: 2023-12-22 23:12:58
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-30 23:23:13
 * @Description: 
-->
<template>
  <div class="cs-box-content content">
    <div class="cs-header-content">
      <img src="@/assets/img/screen/mainA/u3.png" />碳排放趋势
      <div class="pull-right">
        <UnitSelect
          :default-value="state.year"
          label="单位：t"
          @change="handleChange"
        />
      </div>
    </div>
    <Echart id="chart2" class="cs-left-wrap4" :option="option" />
  </div>
</template>
<script setup name="Trend">
import { reactive, ref, watch } from "vue";
import Echart from "@/components/Echart.vue";
import UnitSelect from "./unitSelect.vue";
import { LINE_OPT } from "./constant";
import { queryCarbonTrend } from "@/api/screen/maina";
import { formatXAxis } from "@/utils";

const props = defineProps({
  projectId: { type: Number },
});
const option = ref(LINE_OPT);
const state = reactive({
  year: "2023",
});

const query = async () => {
  const { data } = await queryCarbonTrend({
    projectId: props.projectId,
    year: state.year,
  });
  if (data.data) {
    option.value.xAxis[0].data = data.data.map((item) => {
      const value = String(formatXAxis(item.createTime, "monthOnly"));
      const realValue = value.startsWith("0") ? value.substring(1) : value;
      return `${realValue}月`;
    });
    option.value.series[0].data = data.data.map((item) => item.data);
  }
};
query();
const handleChange = (val) => {
  state.year = val;
  query();
};
watch(
  () => props.projectId,
  () => {
    query();
  }
);
</script>
<style lang="scss" scoped>
.content {
  height: 238px;

  .cs-left-wrap4 {
    width: 100%;
    height: 192px;
  }
}
</style>
