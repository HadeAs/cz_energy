<!--
 * @Author: ymZhang
 * @Date: 2023-12-23 17:52:10
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-24 00:05:01
 * @Description: 
-->
<template>
  <div>
    <MainContentContainer class="search">
      <el-form :inline="true" :model="state.formData">
        <el-form-item label="时间范围">
          <el-date-picker
            v-model="state.formData.timeRange"
            type="datetimerange"
            start-placeholder="请选择开始时间"
            end-placeholder="请选择结束时间"
            value-format="YYYY-MM-DD hh:mm:ss"
          />
        </el-form-item>
        <el-form-item label="报警设备">
          <el-input v-model="state.formData.deviceName" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">搜索</el-button>
        </el-form-item>
      </el-form>
    </MainContentContainer>
    <MainContentContainer>
      <ProTable
        :column="column"
        :pageInfo="pageInfo"
        :datasource="state.dataSource"
        v-loading="state.loading"
        @page-change="pageChange"
        @page-prev-click="pagePrevClick"
        @page-next-click="pageNextClick"
      >
        <template #operation="scope">
          <a class="table-operator-btn handle" v-if="!scope.row.time2">立即处理</a>
          <span class="table-operator-btn disabled" v-else>已处理</span>
        </template>
      </ProTable>
    </MainContentContainer>
  </div>
</template>

<script setup lang="jsx">
import { reactive, onMounted } from "vue";
import MainContentContainer from "@/components/MainContentContainer.vue";

const DEVICE_MAP = {
  0: "空气源热泵",
  1: "水泵",
  2: "水箱",
  3: "灯具",
  4: "电梯",
};
const category_MAP = {
  0: "空调系统",
  1: "照明插座",
  2: "动力系统",
  3: "动力系统",
  4: "照明插座",
};
const STATUS_MAP = {
  0: "停用",
  1: "启用",
};
const state = reactive({
  formData: {
    deviceName: "",
    timeRange: "",
  },
  dataSource: [],
  loading: true,
});

const column = [
  {
    prop: "name",
    label: "报警设备名称",
    width: 110,
    render: (scope) => {
      return <b>{scope.row.name}</b>;
    },
  },
  {
    prop: "info",
    label: "报警信息",
    // width: 100,
  },
  {
    prop: "deviceType",
    label: "设备类型",
    // width: 100,
    render: (scope) => {
      return DEVICE_MAP[scope.row.deviceType];
    },
  },
  {
    prop: "category",
    label: "所属系统分类",
    width: 110,
    render: (scope) => {
      return category_MAP[scope.row.deviceType];
    },
  },
  {
    prop: "time1",
    label: "报警时间",
    width: 170,
  },
  {
    prop: "status",
    label: "设备状态",
    // width: 100,
    render: (scope) => {
      return STATUS_MAP[scope.row.deviceType];
    },
  },
  {
    prop: "time2",
    label: "处理时间",
    width: 170,
  },
];

const onSearch = () => {
  console.log(state.formData);
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

const pageInfo = {
  total: 100,
  currentPage: 1,
  pageSize: 10,
  pageSizes: [10, 15, 20, 50],
};

const getList = async () => {
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      state.loading = false;
      resolve([
        {
          name: "空气源热泵1",
          info: "用水异常",
          deviceType: 0,
          category: 1,
          time1: "2023-12-20 18:09:45",
          status: 0,
          time2: null,
        },
        {
          name: "空气源热泵2",
          info: "空气源热泵维护",
          deviceType: 0,
          category: 1,
          time1: "2023-12-20 18:09:45",
          status: 1,
          time2: null,
        },
        {
          name: "冷却水泵1",
          info: "水泵维护",
          deviceType: 1,
          category: 1,
          time1: "2023-12-20 18:09:45",
          status: 1,
          time2: null,
        },
        {
          name: "水箱",
          info: "水箱维护",
          deviceType: 1,
          category: 1,
          time1: "2018-03-03  15:20:40",
          status: 0,
          time2: "2018-03-03  15:20:40",
        },
      ]);
    }, 600);
  });
  state.dataSource = res;
};
getList();
</script>
<style lang="scss" scoped>
.search {
  margin-bottom: 10px;
}
.handle {
  color: rgba(255, 48, 0, 0.898039215686275);
  cursor: pointer;
}
.disabled {
  color: #959BA7;
}
</style>
