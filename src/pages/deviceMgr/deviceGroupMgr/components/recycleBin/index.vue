<!--
 * @Author: ymZhang
 * @Date: 2023-12-26 17:28:58
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-08 23:17:26
 * @Description: 
-->
<template>
  <div class="cs-detail-container">
    <div class="cs-header">设备运行回收站</div>
    <div class="cs-main-wrap">
      <MainContentContainer class="main-container">
        <ProTable
          :column="column"
          :pageInfo="pageInfo"
          :default-sort="state.sortInfo"
          :datasource="dataSource"
          v-loading="loading"
          @page-change="pageChange"
          @sort-change="sortChange"
        >
          <template #toolbar>
            <el-row align="middle" :gutter="5">
              <el-col :span="24">
                <el-form
                  class="search-form"
                  :inline="true"
                  :model="state.searchFormData"
                >
                  <el-form-item>
                    <el-select
                      v-model="state.searchFormData.projectId"
                      placeholder="选择项目"
                      @change="handleSearchChange"
                    >
                      <el-option
                        v-for="item in state.projectList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-input
                      v-model="state.searchFormData.textQuery"
                      placeholder="设备名称/资产编号"
                      :suffix-icon="Search"
                      @change="handleSearchChange"
                    />
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </template>
          <template #operation="scope">
            <ProPopConfirm
              title="你确定要恢复该内容吗?"
              :icon="CircleCloseFilled"
              iconColor="red"
              @confirm="recoverRow(scope.row)"
            >
              <a class="table-operator-btn" v-auth="'group_work_delete'"
                >恢复</a
              >
            </ProPopConfirm>
          </template>
        </ProTable>
      </MainContentContainer>
    </div>
  </div>
</template>
<script lang="jsx" setup name="Group">
import { reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { Search, CircleCloseFilled } from "@element-plus/icons-vue";
import { ElPopover } from "element-plus";
import useTable from "@/hooks/useTable";
import { getList, recoverDevice, getInfo } from "@/api/deviceMgr/deviceGroup";
import { getCollectList } from "@/api/deviceMgr";
import { getProjectList } from "@/api/common";

const route = useRoute();
const { projectId } = route.params;
const state = reactive({
  searchFormData: {
    projectId: Number(projectId),
    textQuery: "",
    isDeleted: 1,
  },
  sortInfo: { prop: "openTime", order: "descending" },
  collectList: [],
  relateList: [],
  projectList: [],
});

const column = [
  {
    prop: "name",
    label: "设备名称",
    width: 110,
    fixed: true,
    sortable: "custom",
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.name}>
          <span className="table-first-col">{scope.row.name}</span>
        </div>
      );
    },
  },
  {
    prop: "projectName",
    label: "所属项目",
    width: 180,
    render: () => {
      const target = state.projectList.find(
        (item) => item.id === state.searchFormData.projectId
      );
      return target?.name;
    },
  },
  {
    prop: "sysClassName",
    label: "所属系统",
    // width: 180,
    render: (scope) => {
      const data = scope.row.sysClassName;
      let type;
      if (data) {
        if (data.indexOf("空调") > -1) {
          type = "";
        } else if (data.indexOf("供配电") > -1) {
          type = "success";
        } else if (data.indexOf("照明") > -1) {
          type = "warning";
        } else if (data.indexOf("动力") > -1) {
          type = "danger";
        } else {
          type = "info";
        }
      }
      return <ElTag type={type}>{data}</ElTag>;
    },
  },
  {
    prop: "openTime",
    label: "启用时间",
    width: 180,
    sortable: "custom",
  },
  {
    prop: "status",
    label: "运行状态",
    sortable: "custom",
    render: (scope) => {
      const status = scope.row.status;
      return (
        <div className="badge">
          <span
            style={{ fontSize: "5px" }}
            className={status === "启用" ? "success" : "danger"}
          >
            ●
          </span>
          {status}
        </div>
      );
    },
  },
  {
    prop: "num",
    label: "关联设备参数",
    width: 120,
    align: "center",
    render: (scope) => {
      const relate = state.relateList.find((item) => item.id === scope.row.id);
      if (!relate) return null;
      const { deviceIds = [] } = relate;
      if (!deviceIds.length) return "--";
      const relateCollects = state.collectList.filter((item) =>
        deviceIds.includes(item.id)
      );
      return (
        <ElPopover
          placement="right"
          title="关联设备参数:"
          width={200}
          trigger="click"
          v-slots={{
            default: () =>
              relateCollects.map((item) => (
                <div key={item.id}>{item.name}</div>
              )),
            reference: () => {
              return (
                <ElButton text type="primary">
                  {deviceIds.length}
                </ElButton>
              );
            },
          }}
        ></ElPopover>
      );
    },
  },
  {
    prop: "time",
    label: "参数信息",
    width: 150,
  },
];

const getProList = async () => {
  const { data } = await getProjectList();
  if (data?.data) {
    state.projectList = data.data;
  }
};
getProList();
const {
  dataSource,
  loading,
  pageInfo,
  pageChange,
  sortChange,
  searchChange,
  getTableList,
} = useTable(getList, state.searchFormData, state.sortInfo);

getTableList();

const getCollectionList = async () => {
  const { data } = await getCollectList({
    projectId: state.searchFormData.projectId,
  });
  if (data?.data) {
    state.collectList = data.data;
  }
};

getCollectionList();

const getRelateList = async (source) => {
  const relates = [];
  for (let i = 0; i < source.length; i += 1) {
    const item = source[i];
    const { data } = await getInfo({
      projectId: state.searchFormData.projectId,
      id: item.id,
    });
    if (data?.data) {
      relates.push(data.data);
    }
  }
  state.relateList = relates;
};

const handleSearchChange = () => {
  searchChange(state.searchFormData);
};
const recoverRow = async (row) => {
  const { code } = await recoverDevice(state.searchFormData.projectId, {
    id: row.id,
  });
  if (code === 200) {
    ElMessage.success("恢复成功");
    getTableList();
  }
};
watch(
  () => dataSource.value,
  (val) => {
    getRelateList(val);
  }
);
</script>
<style lang="scss" scoped>
.main-container {
  padding: 12px 14px !important;
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
<style lang="scss">
.badge {
  display: flex;
  align-items: center;
  span {
    margin-right: 6px;
  }
  .success {
    color: #00b000;
  }
  .danger {
    color: #ff3333;
  }
}
</style>
