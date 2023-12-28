<template>
  <div style="height: 100%">
    <ProSearchContainer
      class="search"
      buttonContent="搜索"
      :form-info="searchFormCfg"
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
            <el-col :span="4">
              <el-button
                :disabled="!state.selectRows.length"
                @click="batchExport"
                v-auth="'devicelog_batch_export'"
                >批量导出</el-button
              >
            </el-col>
            <el-col :span="20">
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
  </div>
</template>
<script lang="jsx" setup name="DeviceLog">
import { reactive, ref } from "vue";

const COMMON_DATA_MAPS = [
  {
    checkBox: "",
    name: "张婷婷",
    project: "项目名称项目名称",
    type: 1,
    time: "2020-04-23 10:10:10",
    desc: "操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录",
  },
  {
    checkBox: "",
    name: "林雪",
    project: "项目名称项目名称",
    type: 2,
    time: "2020-04-23 10:10:10",
    desc: "操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录",
  },
  {
    checkBox: "",
    name: "唐峰",
    project: "项目名称项目名称",
    type: 3,
    time: "2020-04-23 10:10:10",
    desc: "操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录",
  },
  {
    checkBox: "",
    name: "张婷婷",
    project: "项目名称项目名称",
    type: 1,
    time: "2020-04-23 10:10:10",
    desc: "操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录操作记录",
  },
];
const searchFormCfg = [
  {
    label: "操作时间范围",
    prop: "timeRange",
    type: "datetimerange",
    value: "",
  },
  { label: "关键词搜索", prop: "keyWord", type: "input", value: "" },
];

const state = reactive({
  searchFormData: {
    type: "all",
  },
  names: [{ id: "all", text: "全部项目名称" }],
  dataSource: [],
  loading: true,
  selectRows: [],
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
    label: "操作用户",
    width: 110,
  },
  {
    prop: "project",
    label: "所属项目",
    width: 180,
  },
  {
    prop: "type",
    label: "用户类型",
    width: 140,
    render: (scope) => {
      const level = scope.row.type;
      let type = "";
      let name = "一般用户";
      if (level === 1) {
        type = "warning";
        name = "超级管理员";
      } else if (level === 2) {
        type = "success";
        name = "管理员";
      }
      return <ElTag type={type}>{name}</ElTag>;
    },
  },
  {
    prop: "time",
    label: "操作时间",
    width: 180,
  },
  {
    prop: "desc",
    label: "操作内容",
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
