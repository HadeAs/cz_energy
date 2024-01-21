<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-17 22:24:20
 * @Description: 
-->
<template>
  <div class="detail-container">
    <div class="dashboard-bar">
      <div>
        <img :src="totalImg" alt="" />
        <div>
          <div class="price-title">整体用能费用（万元）</div>
          <div class="price-num">{{ staData.total }}</div>
        </div>
      </div>
      <div>
        <img :src="electricImg" alt="" />
        <div>
          <div class="price-title">电费（万元）</div>
          <div class="price-num">{{ staData.electric }}</div>
        </div>
      </div>
      <div>
        <img :src="gasImg" alt="" />
        <div>
          <div class="price-title">燃气（万元）</div>
          <div class="price-num">{{ staData.gasBill }}</div>
        </div>
      </div>
      <div>
        <img :src="waterImg" alt="" />
        <div>
          <div class="price-title">水费（万元）</div>
          <div class="price-num">{{ staData.water }}</div>
        </div>
      </div>
    </div>
    <MainContentContainer style="height: calc(100vh - 219px)">
      <ProTable
        row-key="key"
        :multiple="true"
        :hasPagination="false"
        :column="column"
        :datasource="datasource"
        @selection-change="selectionChange"
      >
        <template #toolbar>
          <el-row align="middle" :gutter="12">
            <el-col :span="3">
              <el-button
                :disabled="!selectRows.length"
                v-auth="'cost_detail_batch_export'"
                @click="batchExport"
                >批量导出</el-button
              >
            </el-col>
            <el-col :offset="6" :span="7">
              <el-date-picker
                v-model="timeRange"
                type="datetimerange"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                :value-format="COMMON_DATE_TIME_FORMAT"
                @change="handleSearch"
              />
            </el-col>
            <el-col :span="4">
              <el-select
                v-model="sysClassId"
                style="width: 100%"
                @change="handleSearch"
                placeholder="全部所属系统分类"
              >
                <el-option
                  v-for="item in sysCategory"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-input
                clearable
                v-model="projName"
                placeholder="用能系统名称"
                :suffix-icon="Search"
                @keyup.enter="handleSearch"
              />
            </el-col>
          </el-row>
        </template>
      </ProTable>
    </MainContentContainer>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { Search } from "@element-plus/icons-vue";
import ProTable from "@/components/ProTable.vue";
import gasImg from "@/assets/img/gas_price.jpg";
import totalImg from "@/assets/img/total_price.jpg";
import waterImg from "@/assets/img/water_price.jpg";
import electricImg from "@/assets/img/electric_price.jpg";
// import { ElMessage, ElMessageBox } from "element-plus";
import MainContentContainer from "@/components/MainContentContainer.vue";
import { exportInBatch, queryCostDetail } from "@/api/staMng/statistics.js";
import { storeToRefs } from "pinia";
import appStore from "@/store/index.js";
import { getSysClass } from "@/api/common.js";
import { exportWithExcel } from "@/utils/index.js";
import { COMMON_DATE_TIME_FORMAT } from "@/constant";

const { globalState } = storeToRefs(appStore.global);

const projName = ref("");
const timeRange = ref([]);
const sysClassId = ref("");
// const loading = ref(false);
const datasource = ref([]);
const selectRows = ref([]);
const sysCategory = ref([]);
const staData = ref({});

const state = reactive({
  searchFormData: {
    projectId: globalState.value.projectId,
  },
});

const renderData = (list) => {
  return list.map((i, index) => {
    return {
      ...i,
      key: String(index),
      children: i?.children
        ? i?.children?.map((child, ind) => ({
            ...child,
            energyStatisticsName: child?.sysClassName,
            key: `${index}-${ind}`,
          }))
        : i,
    };
  });
};

const reloadTable = async (params) => {
  const res = await queryCostDetail(params);
  datasource.value = renderData(res);
  const staBase = {};
  res.forEach((i) => {
    if (i?.energyStatisticsName === "用电量") {
      staBase.electric = i?.totalCost;
    }
    if (i?.energyStatisticsName === "用气量") {
      staBase.gasBill = i?.totalCost;
    }
    if (i?.energyStatisticsName === "用水量") {
      staBase.water = i?.totalCost;
    }
  });
  staData.value = {
    electric: staBase.electric.toFixed(2),
    total: Object.values(staBase)
      .reduce((last, next) => last + next, 0)
      .toFixed(2),
    gasBill: staBase.electric.toFixed(2),
    water: staBase.electric.toFixed(2),
  };
};

const handleSearch = () => {
  const param = {
    startDate: timeRange.value?.[0],
    endDate: timeRange.value?.[1],
  };
  reloadTable({
    sysClassId: sysClassId.value,
    energyStatisticsName: projName.value,
    projectId: globalState.value.projectId,
    ...param,
  });
};

const selectionChange = (data) => {
  selectRows.value = data;
};

const batchExport = async () => {
  const param = {
    startDate: timeRange.value?.[0],
    endDate: timeRange.value?.[1],
  };
  ElMessageBox.confirm("确认导出选中数据吗？", "警告", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    const res = await exportInBatch({
      sysClassId: sysClassId.value,
      energyStatisticsName: projName.value,
      projectId: globalState.value.projectId,
      ...param,
    });
    if (res) {
      exportWithExcel(res, '费用明细');
      ElMessage({
        type: "success",
        message: "导出成功",
      });
    }
  });
};

const column = [
  {
    prop: "energyStatisticsName",
    label: "用能系统名称",
  },
  {
    prop: "tag",
    label: "单位",
  },
  {
    prop: "cost",
    label: "费用单价",
  },
  {
    prop: "totalEnergyAmount",
    label: "用能总量",
  },
  {
    prop: "totalCost",
    label: "费用总计(元)",
  },
];

onMounted(async () => {
  const res = await getSysClass();
  if (res) {
    sysCategory.value = res;
    sysClassId.value = res?.[0]?.id;
    handleSearch();
  }
});

watch(
  () => globalState.value.projectId,
  (id) => {
    state.searchFormData.projectId = id;
    handleSearch();
  }
);
</script>
<style lang="scss" scoped>
.detail-container {
  .dashboard-bar {
    display: flex;
    margin-bottom: 10px;
    > div {
      width: 25%;
      padding: 15px 20px 0px;
      display: flex;
      background-color: #ffffff;
      border-radius: 0px 50px 50px 0px;
      overflow: hidden;
      &:not(:last-child) {
        margin-right: 10px;
      }
      img {
        width: 60px;
        height: 60px;
        margin-right: 15px;
      }
      .price-title {
        color: #878d99;
        font-size: 14px;
      }
      .price-num {
        color: #333333;
        font-size: 30px;
        font-weight: bold;
      }
    }
  }
}
</style>
