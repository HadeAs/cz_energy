<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-23 20:08:36
 * @Description: 
-->
<template>
  <div class="detail-container">
    <div class="dashboard-bar">
      <div>
        <img :src="totalImg" alt="" />
        <div>
          <div class="price-title">整体用能费用（万元）</div>
          <div class="price-num">1,000</div>
        </div>
      </div>
      <div>
        <img :src="electricImg" alt="" />
        <div>
          <div class="price-title">电费（万元）</div>
          <div class="price-num">600</div>
        </div>
      </div>
      <div>
        <img :src="gasImg" alt="" />
        <div>
          <div class="price-title">燃气（万元）</div>
          <div class="price-num">300</div>
        </div>
      </div>
      <div>
        <img :src="waterImg" alt="" />
        <div>
          <div class="price-title">水费（万元）</div>
          <div class="price-num">100</div>
        </div>
      </div>
    </div>
    <MainContentContainer style="height: calc(100vh - 219px)">
      <ProTable
        :multiple="true"
        :column="column"
        :pageInfo="pageInfo"
        :datasource="datasource"
        v-loading="loading"
        @page-change="pageChange"
        @page-prev-click="pagePrevClick"
        @page-next-click="pageNextClick"
        @selection-change="selectionChange"
      >
        <template #toolbar>
          <el-row align="middle" :gutter="5">
            <el-col :span="3">
              <el-button :disabled="!selectRows.length" @click="batchExport"
                >批量导出</el-button
              >
            </el-col>
            <el-col :offset="6" :span="7">
              <el-date-picker
                v-model="timeRange"
                type="datetimerange"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                value-format="YYYY-MM-DD hh:mm:ss"
              />
            </el-col>
            <el-col :span="4">
              <el-select v-model="sysClass" placeholder="全部所属系统分类">
                <el-option
                  v-for="item in sysCategory"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
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
import { ref, onMounted } from "vue";
import { Search } from "@element-plus/icons-vue";
import ProTable from "@/components/ProTable.vue";
import gasImg from "@/assets/img/gas_price.jpg";
import totalImg from "@/assets/img/total_price.jpg";
import waterImg from "@/assets/img/water_price.jpg";
import electricImg from "@/assets/img/electric_price.jpg";
import { ElMessage, ElMessageBox } from "element-plus";
import MainContentContainer from "@/components/MainContentContainer.vue";

const projName = ref("");
const timeRange = ref([]);
const sysClass = ref("");
const loading = ref(false);
const datasource = ref([]);
const selectRows = ref([]);

const sysCategory = [
  { label: "电力", value: "电力" },
  { label: "燃气", value: "燃气" },
  { label: "水", value: "水" },
  { label: "市政热力", value: "市政热力" },
  { label: "石油", value: "石油" },
];

const handleSearch = () => {
  console.log(projName.value);
};

const pageChange = (currentPage, pageSize) => {
  console.log(currentPage, pageSize);
};

const pagePrevClick = (val) => {
  console.log(val);
};

const pageNextClick = (val) => {
  console.log(val);
};

const selectionChange = (data) => {
  selectRows.value = data;
};

const batchExport = () => {
  ElMessageBox.confirm("确认删除选中的内容？", "警告", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "Delete completed",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
};

const pageInfo = {
  total: 100,
  currentPage: 3,
  pageSize: 10,
  pageSizes: [10, 15, 20, 50],
};

const column = [
  {
    prop: "sysName",
    label: "用能系统名称",
  },
  {
    prop: "unit",
    label: "单位",
  },
  {
    prop: "price",
    label: "费用单价",
  },
  {
    prop: "totalNum",
    label: "用能总量",
  },
  {
    prop: "totalPrice",
    label: "费用总计(元)",
  },
];

onMounted(async () => {
  loading.value = true;
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      loading.value = false;
      resolve([
        {
          id: 1,
          sysName: "电力",
          totalNum: "40",
          totalPrice: "200",
          unit: "kWh/元",
          price: "5",
          children: [
            {
              id: 6,
              sysName: "空调系统",
              totalNum: "10",
              totalPrice: "50",
              unit: "",
              price: "",
            },
            {
              id: 7,
              sysName: "动力系统",
              totalNum: "10",
              totalPrice: "50",
              unit: "",
              price: "",
            },
            {
              id: 8,
              sysName: "照明插座",
              totalNum: "10",
              totalPrice: "50",
              unit: "",
              price: "",
            },
            {
              id: 9,
              sysName: "特殊用电",
              totalNum: "10",
              totalPrice: "50",
              unit: "",
              price: "",
            },
          ],
        },
        {
          id: 2,
          sysName: "燃气",
          totalNum: "100",
          totalPrice: "1000",
          unit: "m³/元",
          price: "10",
          children: [
            {
              id: 10,
              sysName: "食堂用气",
              totalNum: "30",
              totalPrice: "300",
              unit: "",
              price: "",
            },
            {
              id: 11,
              sysName: "供热用气",
              totalNum: "30",
              totalPrice: "300",
              unit: "",
              price: "",
            },
            {
              id: 12,
              sysName: "供冷用气",
              totalNum: "30",
              totalPrice: "300",
              unit: "",
              price: "",
            },
            {
              id: 13,
              sysName: "生活热水用气",
              totalNum: "10",
              totalPrice: "100",
              unit: "",
              price: "",
            },
          ],
        },
        {
          id: 3,
          sysName: "水",
          totalNum: "10",
          totalPrice: "40",
          unit: "吨/元",
          price: "4",
        },
        {
          id: 4,
          sysName: "市政热力",
          totalNum: "10",
          totalPrice: "100",
          unit: "kWh/元",
          price: "10",
        },
        {
          id: 5,
          sysName: "石油",
          totalNum: "100",
          totalPrice: "1000",
          unit: "吨/元",
          price: "10",
        },
      ]);
    }, 1000);
  });
  datasource.value = res;
});
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
