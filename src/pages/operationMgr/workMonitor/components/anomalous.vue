<!--
 * @Author: ymZhang
 * @Date: 2023-12-23 17:52:10
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-27 13:46:36
 * @Description: 
-->
<template>
  <div>
    <ProSearchContainer
      class="search"
      buttonContent="搜索"
      :form-info="searchFormCfg"
      @button-click="onSearch"
      authKey="monitor_exception_search"
    />
    <MainContentContainer>
      <ProTable
        :column="column"
        :pageInfo="pageInfo"
        :datasource="state.dataSource"
        v-loading="state.loading"
        @page-change="pageChange"
      >
        <template #operation="scope">
          <a
            class="table-operator-btn"
            v-if="!scope.row.time2"
            v-auth="'monitor_exception_deal'"
            @click="handle(scope.row)"
            >立即处理</a
          >
          <span class="table-operator-btn disabled" v-else>已处理</span>
        </template>
      </ProTable>
    </MainContentContainer>
    <ProDrawer title="立即处理" ref="drawerRef" @confirm="confirmAddVar">
      <el-form
        ref="formRef"
        v-bind="COMMON_FORM_CONFIG"
        :model="state.formData"
        :rules="rules"
      >
        <el-form-item label="报警名称" prop="name">
          <el-input v-model="state.formData.name" />
        </el-form-item>
        <el-form-item label="处理人" prop="user">
          <el-input v-model="state.formData.user" />
        </el-form-item>
        <el-form-item label="处理详情" prop="desc">
          <el-input
            v-model="state.formData.desc"
            type="textarea"
            placeholder="请输入至少5个字符"
          />
        </el-form-item>
      </el-form>
    </ProDrawer>
  </div>
</template>

<script setup lang="jsx">
import { reactive, ref } from "vue";
import MainContentContainer from "@/components/MainContentContainer.vue";
import ProDrawer from "@/components/ProDrawer.vue";
import { COMMON_FORM_CONFIG } from "@/constant/formConfig";

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
};
const STATUS_MAP = {
  0: "停用",
  1: "启用",
};

const rules = {
  name: { required: true, message: "请输入报警名称", trigger: "blur" },
  user: { required: true, message: "请输入处理人", trigger: "blur" },
  desc: [
    { required: true, message: "请输入至少5个字符", trigger: "blur" },
    { min: 5, message: "请输入至少5个字符", trigger: "blur" },
  ],
};

const searchFormCfg = [
  {
    label: "时间范围",
    prop: "timeRange",
    type: "datetimerange",
    value: "",
  },
  { label: "报警设备", prop: "deviceName", type: "input", value: "" },
];

const onSearch = (data) => {
  console.log(data);
};

const drawerRef = ref();
const formRef = ref();
const state = reactive({
  formData: {
    name: "",
    user: "",
    desc: "",
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
      return (
        <div className="text-overflow" title={scope.row.name}>
          <b>{scope.row.name}</b>
        </div>
      );
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

const pageChange = (currentPage, pageSize) => {
  console.log(currentPage, pageSize);
};

const pageInfo = reactive({
  total: 100,
  currentPage: 1,
  pageSize: 10,
  pageSizes: [10, 15, 20, 50],
});

const getList = async () => {
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      state.loading = false;
      resolve([
        {
          id: 0,
          name: "空气源热泵1",
          info: "用水异常",
          deviceType: 0,
          category: 1,
          time1: "2023-12-20 18:09:45",
          status: 0,
          time2: null,
        },
        {
          id: 1,
          name: "空气源热泵2",
          info: "空气源热泵维护",
          deviceType: 0,
          category: 1,
          time1: "2023-12-20 18:09:45",
          status: 1,
          time2: null,
        },
        {
          id: 2,
          name: "冷却水泵1",
          info: "水泵维护",
          deviceType: 1,
          category: 1,
          time1: "2023-12-20 18:09:45",
          status: 1,
          time2: null,
        },
        {
          id: 3,
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

const handle = (row) => {
  state.formData.name = row.name;
  state.formData.user = row.user;
  state.formData.desc = row.desc;
  drawerRef.value.open();
};
const confirmAddVar = () => {
  formRef.value
    .validate()
    .then(() => {
      console.log("success");
      drawerRef.value.close();
    })
    .catch(() => {
      console.log("fail");
    });
};
</script>
<style lang="scss" scoped>
.search {
  margin-bottom: 10px;
}
</style>
