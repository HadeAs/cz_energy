<template>
  <div>
    <ProSearchContainer
      class="search"
      buttonContent="搜索"
      :form-info="searchFormCfg"
      @button-click="onSearch"
      authKey="alarm_work_search"
    />
    <MainContentContainer>
      <ProTable
        :column="column"
        :pageInfo="pageInfo"
        :datasource="state.dataSource"
        v-loading="state.loading"
        @page-change="pageChange"
      >
        <template #toolbar>
          <el-row align="middle" :gutter="5">
            <el-col :span="6">
              <el-button
                type="primary"
                @click="addRow"
                v-auth="'alarm_work_add'"
                >数据补录</el-button
              >
            </el-col>
            <el-col :span="18">
              <el-form
                class="search-form"
                :inline="true"
                :model="state.searchFormData"
              >
                <el-form-item>
                  <el-select v-model="state.searchFormData.type">
                    <el-option
                      v-for="item in state.names"
                      :key="item.id"
                      :label="item.text"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </template>
      </ProTable>
    </MainContentContainer>
    <AddDetail ref="addRef" @submit="addSubmit" />
  </div>
</template>
<script lang="jsx" setup name="Run">
import { reactive, ref } from "vue";
import AddDetail from "./addDetail.vue";

const COMMON_DATA_MAPS = [
  {
    name: "监测点位名称监测点位名称00145130",
    project: "项目001",
    time: "2020-04-23 10:10:10",
    currentData: "0",
    num: "00",
    desc: "操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录",
    status: 1,
  },
  {
    name: "监测点位名称监测点位名称00145130",
    project: "项目001",
    time: "2020-04-23 10:10:10",
    currentData: "0",
    num: "00",
    desc: "操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录",
    status: 0,
  },
  {
    name: "监测点位名称监测点位名称00145130",
    project: "项目001",
    time: "2020-04-23 10:10:10",
    currentData: "0",
    num: "00",
    desc: "操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录",
    status: 1,
  },
  {
    name: "监测点位名称监测点位名称00145130",
    project: "项目001",
    time: "2020-04-23 10:10:10",
    currentData: "0",
    num: "00",
    desc: "操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录",
    status: 0,
  },
];
const searchFormCfg = [
  {
    label: "报警时间范围",
    prop: "timeRange",
    type: "datetimerange",
    value: "",
  },
  { label: "关键词搜索", prop: "keyWord", type: "input", value: "" },
];

const addRef = ref();
const state = reactive({
  searchFormData: {
    type: "all",
  },
  names: [{ id: "all", text: "全部项目名称" }],
  dataSource: [],
  loading: true,
  currentData: {},
});
const pageInfo = reactive({
  total: 100,
  currentPage: 1,
  pageSize: 10,
  pageSizes: [10, 15, 20, 50],
});

const column = [
  {
    prop: "name",
    label: "监测点位名称",
    width: 200,
    fixed: true,
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.name}>
          <span className="table-first-col">{scope.row.name}</span>
        </div>
      );
    },
  },
  {
    prop: "project",
    label: "所属项目",
    width: 100,
  },
  {
    prop: "time",
    label: "监控时间",
    width: 180,
  },
  {
    prop: "num",
    label: "最大阈值",
    width: 100,
  },
  {
    prop: "num",
    label: "最小阈值",
    width: 100,
  },
  {
    prop: "status",
    label: "报警状态",
    render: (scope) => {
      const status = scope.row.status;
      let type = "";
      let name = "";
      if (status === 1) {
        type = "success";
        name = "正常";
      } else {
        type = "danger";
        name = "异常";
      }
      return <ElTag type={type}>{name}</ElTag>;
    },
  },
  {
    prop: "desc",
    label: "操作记录",
    width: 220,
  },
];

const getList = async () => {
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      state.loading = false;
      const data = new Array(10).fill("").map((num, index) => {
        const i = index % 4;
        return {
          ...COMMON_DATA_MAPS[i],
          project: COMMON_DATA_MAPS[i].project + "00" + index,
          id: index,
        };
      });
      resolve(data);
    }, 600);
  });
  state.dataSource = res;
};
getList();

const onSearch = (data) => {
  console.log(data);
};
const pageChange = (currentPage, pageSize) => {
  console.log(currentPage, pageSize);
};

const addRow = () => {
  addRef.value.open();
};
const addSubmit = (data) => {};
</script>
<style lang="scss" scoped>
.search {
  margin-bottom: 10px;
}
.search-form {
  text-align: right;
  :deep() {
    .el-form-item {
      margin-right: 15px;
      margin-bottom: 0;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
