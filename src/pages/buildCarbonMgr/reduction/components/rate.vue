<template>
  <el-row class="rate-container" :gutter="15">
    <el-col :span="12" v-for="item in state.staData" :key="item.id">
      <MainContentContainer class="result-container">
        <div class="title-content">
          <div class="title-left">
            <span>{{ item.title }}</span>
            <span>单位：万元</span>
          </div>
          <div class="title-right">
            <el-tabs v-show="item?.hasTab" v-model="state.searchFormData.duration" @tab-click="handleOnSearch" @change="handleOnSearch">
              <el-tab-pane
                v-for="n in tabs"
                :key="n.value"
                :label="n.label"
                :name="n.value"
              ></el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div class="content">
          <div class="content-left" :style="{ width: item.width }">
            <div class="content-title">
              <span>{{ item.title }}</span>
              <span
                >{{ item.value }}<label>{{ item.unit }}</label>
              </span>
            </div>
            <img class="content-bg" :src="item.img" />
          </div>
          <div class="content-right">
            <div
              class="content-inner"
              v-for="(child, index) in item.children"
              :key="`child_${index}`"
            >
              <div
                class="content-data"
                v-for="(dataItem, i) in child.data"
                :key="`child_data_${i}`"
              >
                <img :src="dataItem.img" />
                <div class="content-right-data">
                  <span>{{ dataItem.title }}</span>
                  <span>{{ dataItem.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainContentContainer>
    </el-col>
  </el-row>
</template>
<script setup name="Rate">
import { onMounted, reactive, watch } from "vue";
import MainContentContainer from "@/components/MainContentContainer.vue";
import u18834 from "@/assets/img/carbon/u18834.png";
import u18811 from "@/assets/img/carbon/u18811.png";
import u18815 from "@/assets/img/carbon/u18815.png";
import u18813 from "@/assets/img/carbon/u18813.png";
import u18829 from "@/assets/img/carbon/u18829.png";
import { getRewardData } from '@/api/buildCarbon/reduce.js';
// import { getCarbonStandardList } from '@/api/common.js';
import { storeToRefs } from 'pinia';
import appStore from '@/store/index.js';
// import Income from "./income.vue";

const { globalState } = storeToRefs(appStore.global);

const tabs = [
  { label: "近一年", value: 1 },
  { label: "近三年", value: 3 },
  { label: "近五年", value: 5 },
];
const testData = (data) => [
  {
    id: 0,
    title: "年均投资回报率",
    unit: "%",
    value: data?.annualRewardRate,
    width: "35%",
    img: u18834,
    children: [
      {
        data: [
          {
            title: "年均减碳收益",
            value: data?.annualCarbonProfit,
            img: u18811,
          },
          {
            title: "年均节能收益",
            value: data?.annualEnergyProfit,
            img: u18815,
          },
        ],
      },
      {
        data: [
          {
            title: "累计减碳收益",
            value: data?.sumCarbonProfit,
            img: u18811,
          },
          {
            title: "累计节能收益",
            value: data?.sumEnergyProfit,
            img: u18813,
          },
        ],
      },
    ],
  },
  {
    id: 1,
    title: "预期投资回报年",
    unit: "年",
    value: data?.predictYear,
    width: "44%",
    img: u18829,
    hasTab: true,
  },
];

const props = defineProps({
  searchData: {
    type: Object,
  },
});

const state = reactive({
  searchFormData: {
    projectId: globalState.value.projectId,
    standardId: 1,
    duration: 1,
  },
  staData: [],
});

const handleOnSearch = (e) => {
  state.searchFormData.duration = e?.props?.name;
  searchChange();
}

const searchChange = async () => {
  const res = await getRewardData(state.searchFormData);
  if (res?.code === 200) {
    state.staData = testData(res?.data);
  }
}

onMounted(async () => {
  state.searchFormData = props.searchData;
  searchChange();
})

watch(
  () => props.searchData.standardId,
  (standardId) => {
    state.searchFormData.standardId = standardId;
    searchChange();
  }
);

</script>
<style lang="scss" scoped>
.rate-container {
  flex-direction: row !important;
  .result-container {
    background: #fff;
    padding: 15px;
    height: auto;
    .title-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .title-left {
        padding-left: 30px;
        > span:first-child {
          color: #333333;
          font-size: 16px;
          font-weight: 700;
          margin-right: 10px;
        }
        > span:last-child {
          color: #656565;
          font-size: 14px;
        }
      }
      .title-right {
        position: relative;
        top: -5px;
        :deep() {
          .el-tabs__header {
            padding: 0;
            margin: 0;
          }
          .el-tabs__item {
            height: 30px;
            line-height: normal;
          }
          .el-tabs__item {
            font-size: 14px;
          }
          .el-tabs__nav-wrap::after {
            visibility: hidden;
          }
        }
      }
    }
    .content {
      display: flex;
      justify-content: space-between;
      .content-left {
        border-radius: 20px;
        background: rgba(169, 192, 249, 0.2);
        padding: 15px 22px;
        width: 34%;
        .content-title {
          > span {
            display: block;
          }
          > span:first-child {
            color: #333333;
            font-size: 16px;
            font-weight: 700;
            margin-right: 14px;
          }
          > span:last-child {
            font-size: 30px;
            color: #2b3eb1;
            font-weight: 700;
            font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑";
            label {
              font-size: 16px;
              font-weight: normal;
            }
          }
        }
        .content-bg {
          width: 128px;
          height: 117px;
          float: right;
        }
      }
      .content-right {
        display: flex;
        justify-content: space-around;
        height: auto;
        position: relative;
        left: -12px;
        // margin-left: 12px;
        flex: 1;
        .content-inner {
          display: flex;
          flex-direction: column;
          .content-data {
            display: flex;
            flex: 1;
            // align-items: center;
            img {
              width: 44px;
              height: 44px;
              margin-right: 5px;
            }
            .content-right-data {
              > span {
                display: block;
              }
              > span:first-child {
                color: #959ba7;
                font-size: 14px;
              }
              > span:last-child {
                font-size: 24px;
                color: #333;
                font-weight: 700;
              }
            }
            &:first-child {
              margin-top: 28px;
            }
            // &:last-child {
            //   margin-top: 32px;
            // }
          }
        }
      }
    }
  }
}
</style>
