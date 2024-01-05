<!--
 * @Author: ymZhang
 * @Date: 2023-12-26 14:56:02
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2024-01-05 18:49:24
 * @Description: 
-->
<template>
  <div>
    <ProSearchContainer
      class="search"
      buttonContent="搜索"
      :form-info="searchFormCfg"
      authKey="alarm_actual_search"
      @button-click="onSearch"
    />
    <MainContentContainer>
      <ProTable
        multiple
        :column="column"
        :pageInfo="pageInfo"
        :datasource="state.dataSource"
        v-loading="state.loading"
        @page-change="pageChange"
        @selection-change="selectionChange"
      >
        <template #toolbar>
          <el-row align="middle" :gutter="5">
            <el-col :span="6">
              <el-button
                type="primary"
                @click="addRow"
                v-auth="'alarm_actual_add'"
                >新增</el-button
              >
              <el-button
                :disabled="!state.selectRows.length"
                @click="batchExport"
                v-auth="'alarm_actual_batch_export'"
                >批量导出</el-button
              >
            </el-col>
            <el-col :span="18">
              <el-form
                class="search-form"
                :inline="true"
                :model="state.searchFormData"
              >
                <el-form-item>
                  <el-select v-model="state.searchFormData.level">
                    <el-option
                      v-for="item in state.levels"
                      :key="item.id"
                      :label="item.text"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
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
        <template #operation="scope">
          <a
            class="table-operator-btn"
            :class="scope.row.status === 1 ? '' : 'disabled'"
            @click="handleRow(scope.row)"
            v-auth="'alarm_actual_deal'"
            >{{ scope.row.status === 1 ? "立即处理" : "已处理成功" }}</a
          >
        </template>
      </ProTable>
    </MainContentContainer>
    <AddDetail ref="addRef" @submit="addSubmit" />
    <Handle ref="handleRef" :data="state.currentData" @submit="handleSubmit" />
  </div>
</template>
<script lang="jsx" setup name="Live">
import { reactive, ref } from "vue";
import AddDetail from "./addDetail.vue";
import Handle from "./handle.vue";

const COMMON_DATA_MAPS = [
  {
    checkBox: "",
    name: "报警设备名称",
    project: "项目001",
    type: "冷水机组",
    admin: "admin",
    time1: "2020-04-23 10:10:10",
    time2: "2020-04-23 10:10:10",
    desc: "操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录",
    status: 1,
    level: 1,
  },
  {
    checkBox: "",
    name: "报警设备名称",
    project: "项目001",
    type: "冷水机组",
    admin: "admin",
    time1: "2020-04-23 10:10:10",
    time2: "2020-04-23 10:10:10",
    desc: "操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录",
    status: 0,
    level: 1,
  },
  {
    checkBox: "",
    name: "报警设备名称",
    project: "项目001",
    type: "冷水机组",
    admin: "admin",
    time1: "2020-04-23 10:10:10",
    time2: "2020-04-23 10:10:10",
    desc: "操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录",
    status: 1,
    level: 1,
  },
  {
    checkBox: "",
    name: "报警设备名称",
    project: "项目001",
    type: "冷水机组",
    admin: "admin",
    time1: "2020-04-23 10:10:10",
    time2: "2020-04-23 10:10:10",
    desc: "操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录",
    status: 0,
    level: 2,
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
const handleRef = ref();
const state = reactive({
  searchFormData: {
    level: "all",
    type: "all",
  },
  levels: [{ id: "all", text: "报警等级" }],
  names: [{ id: "all", text: "全部项目名称" }],
  dataSource: [],
  loading: true,
  selectRows: [],
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
    label: "报警设备名称",
    width: 110,
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
    prop: "time1",
    label: "报警时间",
    width: 180,
  },
  {
    prop: "level",
    label: "处理等级",
    width: 100,
    render: (scope) => {
      const level = scope.row.level;
      let type = "success";
      let name = "三级";
      if (level === 1) {
        type = "danger";
        name = "一级";
      } else if (level === 2) {
        type = "warning";
        name = "二级";
      }
      return <ElTag type={type}>{name}</ElTag>;
    },
  },
  {
    prop: "admin",
    label: "处理人",
    width: 80,
  },
  {
    prop: "time2",
    label: "处理时间",
  },
  {
    prop: "status",
    label: "处理过程",
    render: (scope) => {
      const status = scope.row.status;
      const type = status === 1 ? "danger" : "success";
      return <ElTag type={type}>{status === 1 ? "未处理" : "已处理"}</ElTag>;
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

const batchExport = () => {
  ElMessageBox.confirm("确认导出选中的内容？", "警告", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "导出成功",
      });
    })
    .catch(() => {});
};
const onSearch = (data) => {
  console.log(data);
};
const pageChange = (currentPage, pageSize) => {
  console.log(currentPage, pageSize);
};
const selectionChange = (data) => {
  state.selectRows = data;
};

const addRow = () => {
  addRef.value.open();
};
const handleRow = (row) => {
  if (row.status === 1) {
    state.currentData = row;
    handleRef.value.open();
  }
};
const addSubmit = (data) => {};
const handleSubmit = (data) => {};
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
