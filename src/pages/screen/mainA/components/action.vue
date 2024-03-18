<template>
  <div class="cs-box-content content" style="height: 343px">
    <div class="cs-header-content">
      <img src="@/assets/img/screen/mainA/u6.png" />碳减排举措追踪
    </div>
    <div class="cs-sub-header">
      <span class="cs-sub-header-text">最新举措</span>
    </div>
    <div class="cs-right-wrap3">
      <div
        class="cs-info-wrap"
        :class="colorMAP[item.groupName] || colorMAP['可再生能源']"
        v-for="item in state.groups"
        :key="item.id"
      >
        <span class="cs-info-label">{{ item.groupName }}</span>
        <span class="cs-info-detail">{{ item.name }}</span>
      </div>
    </div>
    <div class="cs-sub-header">
      <span class="cs-sub-header-text">碳减排趋势</span>
      <div class="cs-sub-right">
        <span class="cs-right-text">单位：t</span>
      </div>
    </div>
    <Echart class="cs-right-wrap4" id="chart4" :option="option" />
  </div>
</template>
<script setup name="Action">
import { ref, reactive, watch } from "vue";
import { LINE_OPT2 } from "./constant";
import Echart from "@/components/Echart.vue";
import { queryCarbonMethod } from "@/api/screen/maina";
import { formatXAxis } from "@/utils";

// const LINE_COLORS = [
//   "#fff",
//   "#6633FF",
//   "#FF9900",
//   "#49A9EE",
//   "#31CE8F",
//   "#f73234",
//   "#5c5c5c",
// ];

const colorMAP = {
  可再生能源: "color1",
  节能改造: "color3",
  植树造林: "color2",
};
const props = defineProps({
  projectId: { type: Number },
});
const option = ref(LINE_OPT2);
const state = reactive({
  groups: [],
});

const query = async () => {
  const { data } = await queryCarbonMethod({ projectId: props.projectId });
  if (data?.data) {
    const first = data.data[0];
    const xAxis = first.dataList.map((item) => formatXAxis(item.createTime));
    const legend = data.data.map((item) => item.name);
    const seriesData = data.data.map((item, index) => {
      return {
        name: item.name,
        type: "line",
        smooth: false,
        data: item.dataList.map((v) => v.data),
        lineStyle: {
          type: index % 2 === 0 ? "dashed" : "solid",
        },
        areaStyle: {
          opacity: 0.2,
        },
      };
    });
    option.value.xAxis[0].data = xAxis;
    option.value.legend.data = legend;
    option.value.series = seriesData;
    state.groups = data.data.map((item) => ({
      id: item.id,
      name: item.name,
      groupName: item.groupName,
    }));
  }
};
query();
watch(
  () => props.projectId,
  () => {
    query();
  }
);
</script>
<style lang="scss" scoped>
.content {
  height: 343px;

  .cs-right-wrap3 {
    display: flex;
    flex-wrap: wrap;
    margin-top: 12px;
  }

  .cs-right-wrap3 .cs-info-wrap {
    height: 20px;
    line-height: 18px;
    border-radius: 3px;
    margin-right: 6px;
    margin-bottom: 6px;
    font-size: 12px;
    border: 1px solid #acabb4;
  }

  .cs-right-wrap3 .cs-info-wrap .cs-info-label {
    display: inline-block;
    width: 68px;
    text-align: center;
    color: #fff;
  }

  .cs-right-wrap3 .cs-info-wrap .cs-info-detail {
    display: inline-block;
    width: 51px;
    text-align: center;
    color: #acabb4;
  }

  .cs-right-wrap3 .cs-info-wrap.color1 {
    border-color: rgba(41, 133, 247, 0.6);
    background-color: rgba(41, 133, 247, 0.2);
  }

  .cs-right-wrap3 .cs-info-wrap.color1 .cs-info-label {
    background-color: rgba(41, 133, 247, 0.3);
  }

  .cs-right-wrap3 .cs-info-wrap.color2 {
    border-color: rgba(0, 176, 80, 0.6);
    background-color: rgba(0, 176, 80, 0.2);
  }

  .cs-right-wrap3 .cs-info-wrap.color2 .cs-info-label {
    background-color: rgba(0, 176, 80, 0.3);
  }

  .cs-right-wrap3 .cs-info-wrap.color3 {
    border-color: rgba(235, 158, 5, 0.6);
    background-color: rgba(235, 158, 5, 0.2);
  }

  .cs-right-wrap3 .cs-info-wrap.color3 .cs-info-label {
    background-color: rgba(235, 158, 5, 0.3);
  }

  .cs-right-wrap4 {
    width: 100%;
    height: 150px;
  }
}
</style>
