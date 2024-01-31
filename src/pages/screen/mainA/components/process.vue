<template>
  <div class="cs-box-content content">
    <div class="cs-header-content">
      <img src="@/assets/img/screen/mainA/u5.png" />碳中和进程
    </div>
    <div class="cs-right-wrap1">
      <div class="cs-info-wrap">
        <div class="cs-info-box">
          <div class="cs-title-text">
            <img src="@/assets/img/screen/mainA/u311.png" />碳达峰倒计时
          </div>
          <div class="cs-main-text">
            <span class="cs-num-text">{{
              state.config.targetCarbonTopYearDiff
            }}</span>
            <span class="cs-unit-text">天</span>
          </div>
        </div>
        <div class="cs-info-box">
          <div class="cs-title-text">
            <img src="@/assets/img/screen/mainA/u311.png" />考核时间
          </div>
          <div class="cs-main-text">
            <span class="cs-num-text">{{
              state.config.targetCarbonTopYear
            }}</span>
            <span class="cs-unit-text"></span>
          </div>
        </div>
        <div class="cs-info-box">
          <div class="cs-title-text">
            <img src="@/assets/img/screen/mainA/u311.png" />碳中和倒计时
          </div>
          <div class="cs-main-text">
            <span class="cs-num-text"
              >{{ state.config.targetCarbonNtYearDiff }}
            </span>
            <span class="cs-unit-text">天</span>
          </div>
        </div>
        <div class="cs-info-box">
          <div class="cs-title-text">
            <img src="@/assets/img/screen/mainA/u311.png" />考核时间
          </div>
          <div class="cs-main-text">
            <span class="cs-num-text">{{
              state.config.targetCarbonNtYear
            }}</span>
            <span class="cs-unit-text"></span>
          </div>
        </div>
      </div>
      <div class="cs-num-wrap">
        <div class="cs-num1">
          <span class="cs-num-text">{{ state.config.progressRate }}</span>
          <span class="cs-num-unit">%</span>
        </div>
        <div class="cs-num2">碳达峰完成进度</div>
      </div>
    </div>
    <div class="cs-sub-header">
      <span class="cs-sub-header-text">碳中和趋势</span>
      <div class="cs-sub-right">
        <UnitSelect
          :default-value="state.year"
          label="单位：万t"
          @change="handleChange"
        />
      </div>
    </div>
    <!-- <div class="cs-right-wrap2" id="chart3"></div> -->
    <Echart class="cs-right-wrap2" id="chart3" :option="option" />
  </div>
</template>
<script setup name="Process">
import { ref, reactive, watch } from "vue";
import UnitSelect from "./unitSelect.vue";
import { COLUM_OPT } from "./constant";
import img1 from "@/assets/img/screen/mainA/bar1.png";
import img2 from "@/assets/img/screen/mainA/bar2.png";
import img3 from "@/assets/img/screen/mainA/bar3.png";
import img4 from "@/assets/img/screen/mainA/bar4.png";
import img5 from "@/assets/img/screen/mainA/bar5.png";
import img6 from "@/assets/img/screen/mainA/bar6.png";
import Echart from "@/components/Echart.vue";
import { queryCarbonProcess } from "@/api/screen/maina";

const props = defineProps({
  projectId: { type: Number },
});

const colors = [img1, img2, img3, img3, img4, img5, img5, img6];
const xMap = {
  碳排基准: "carbonBase",
  "能源使用\n减少": "energyReduce",
  绿色能源: "greenEnergy",
  "碳汇(植树等)": "carbonSink",
  碳排放: "carbonSummary",
  // "电网碳排放因子降低": "powerCarbonReduce",
  "碳信用抵消\n(碳交易)": "carbonCreditAmount",
  "绿店购买\n抵消": "greenPowerAmount",
  净排放: "netCarbonSummary",
};
const option = ref(COLUM_OPT(img1, img2, img3, img4, img5, img6));

const state = reactive({
  year: "2023",
  config: {
    progressRate: "68",
    targetCarbonTopYear: "2030",
    targetCarbonTopYearDiff: "2654",
    targetCarbonNtYear: "2024",
    targetCarbonNtYearDiff: "1456",
  },
});

const query = async () => {
  const { data } = await queryCarbonProcess({
    projectId: props.projectId,
    year: state.year,
  });
  if (data) {
    const { chartList, ...rest } = data;
    state.config = {
      ...rest,
      progressRate: ((data.progressRate || 0) * 100).toFixed(0),
    };
    const topArr = [];
    const bottomArr = [];
    const lineArr = [];
    Object.keys(xMap).forEach((key, index) => {
      topArr.push({
        value: data.chartList[xMap[key]],
        itemStyle: {
          color: {
            image: colors[index],
            repeat: "repeat",
          },
        },
      });
    });
    topArr.forEach((item, index) => {
      if (index === 0) {
        bottomArr.push(0);
      } else {
        const topPrefix = topArr[index - 1].value;
        const bottomPrefix = bottomArr[index - 1];
        const max = Math.max(topPrefix, bottomPrefix);
        const diff = max - item.value;
        bottomArr.push(diff < 0 ? 0 : diff);
      }
    });
    topArr.forEach((item, index) => {
      if (index < topArr.length - 1) {
        const prefix = new Array(index).fill().map((item) => "-");
        const max = Math.max(item.value, bottomArr[index]);
        lineArr.push({
          name: `test${index}`,
          type: "line",
          lineStyle: {
            color: "#6c6a77",
          },
          showSymbol: false,
          data: [...prefix, max, max],
        });
      }
    });
    const [sum1, sum2] = option.value.series;
    const newSum1 = { ...sum1, data: bottomArr };
    const newSum2 = {
      ...sum2,
      label: {
        ...sum2.label,
        formatter: ({ dataIndex, name }) => {
          if (bottomArr[dataIndex] === 0) {
            return "";
          }
          return name;
        },
      },
      data: topArr,
    };

    option.value.series = [newSum1, newSum2, ...lineArr];
    option.value.xAxis[0].data = Object.keys(xMap);
    option.value.xAxis[0].axisLabel.formatter = (value, index) => {
      if (bottomArr[index] === 0) {
        return value;
      }
      return null;
    };
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
  height: 389px;

  .cs-right-wrap1 {
    display: flex;
    height: 120px;
  }

  .cs-right-wrap1 .cs-info-wrap {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    height: 120px;
  }

  .cs-right-wrap1 .cs-info-wrap .cs-info-box {
    width: 50%;
    padding-top: 10px;
    padding-left: 10px;
  }

  .cs-right-wrap1 .cs-info-wrap .cs-info-box .cs-title-text {
    height: 20px;
    line-height: 20px;
    color: #7a7787;
  }

  .cs-right-wrap1 .cs-info-wrap .cs-info-box .cs-main-text .cs-num-text {
    color: #fff;
    font-size: 20px;
    font-weight: bold;
  }

  .cs-right-wrap1 .cs-info-wrap .cs-info-box .cs-main-text .cs-unit-text {
    color: #acabb4;
  }

  .cs-right-wrap1 .cs-num-wrap {
    width: 197px;
    height: 154px;
    flex-shrink: 0;
    background: url(@/assets/img/screen/mainA/u3896.png);
    background-size: cover;
    text-align: center;
    color: #fff;
    position: relative;
    top: -40px;
  }

  .cs-right-wrap1 .cs-num-wrap .cs-num1 {
    margin-top: 34px;
    margin-bottom: 28px;
  }

  .cs-right-wrap1 .cs-num-wrap .cs-num1 .cs-num-text {
    font-size: 28px;
    font-weight: bold;
  }

  .cs-right-wrap2 {
    width: 100%;
    height: 168px;
    margin-top: 10px;
  }
}
</style>
