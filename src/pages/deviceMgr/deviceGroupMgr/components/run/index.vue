<!--
 * @Author: ymZhang
 * @Date: 2023-12-26 17:28:58
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-12 22:02:04
 * @Description: 
-->
<template>
  <MainContentContainer>
    <ProTable
      multiple
      :column="column"
      :pageInfo="pageInfo"
      :default-sort="state.sortInfo"
      :datasource="dataSource"
      v-loading="loading"
      @page-change="pageChange"
      @selection-change="selectionChange"
      @sort-change="sortChange"
    >
      <template #toolbar>
        <el-row align="middle" :gutter="5">
          <el-col :span="6">
            <el-button
              :disabled="!selectRows.length"
              @click="batchExport"
              v-auth="'group_work_batch_export'"
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
                <el-select
                  v-model="state.searchFormData.projectId"
                  placeholder="选择项目"
                  @change="handleSearchChange"
                >
                  <el-option
                    v-for="item in globalState.projects"
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
                  clearable
                  @change="handleSearchChange"
                />
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </template>
      <template #operation="scope">
        <ProPopConfirm
          title="你确定要删除该项目嘛?"
          :icon="CircleCloseFilled"
          iconColor="red"
          @confirm="deleteRow(scope.row)"
        >
          <a class="table-operator-btn" v-auth="'group_work_delete'">删除</a>
        </ProPopConfirm>
      </template>
    </ProTable>
  </MainContentContainer>
</template>
<script lang="jsx" setup name="Group">
import { reactive, watch } from "vue";
import { Search, CircleCloseFilled } from "@element-plus/icons-vue";
import { ElPopover } from "element-plus";
import { storeToRefs } from "pinia";
import appStore from "@/store";
import useTable from "@/hooks/useTable";
import {
  getList,
  batchExportDevice,
  deleteDevice,
  getInfo,
} from "@/api/deviceMgr/deviceGroup";
import { getInfo as getEquipmentInfo } from "@/api/deviceMgr/deviceLedger";
import { getCollectList } from "@/api/deviceMgr";
import { exportWithExcel } from "@/utils";

const { globalState } = storeToRefs(appStore.global);
const state = reactive({
  searchFormData: {
    projectId: globalState.value.projectId,
    textQuery: "",
  },
  sortInfo: { prop: "openTime", order: "descending" },
  collectList: [],
  relateList: [],
  equipmentInfo: {},
});

const column = [
  {
    prop: "name",
    label: "设备名称",
    width: 110,
    sortable: "custom",
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
    prop: "projectName",
    label: "所属项目",
    width: 180,
    render: () => {
      const target = globalState.value.projects.find(
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
    render: (scope) => {
      const relate = state.relateList.find((item) => item.id === scope.row.id);
      if (!relate) return null;
      const { equipmentModelId } = relate;
      if (!state.equipmentInfo[equipmentModelId]) return null;
      const list = state.equipmentInfo[equipmentModelId] || [];
      return (
        <div style="display: flex;">
          {list.map((item) => (
            <span>
              {item.name}: {item.value};{" "}
            </span>
          ))}
        </div>
      );
    },
  },
];

const {
  dataSource,
  loading,
  pageInfo,
  selectRows,
  pageChange,
  sortChange,
  searchChange,
  selectionChange,
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

const getEqpInfo = async (modelId) => {
  const { data } = await getEquipmentInfo({
    projectId: state.searchFormData.projectId,
    id: modelId,
  });
  if (data?.data) {
    const { equipmentModelParamList = [] } = data.data;
    return equipmentModelParamList;
  }
  return [];
};

const getRelateList = async (source) => {
  const relates = [];
  const equipmentMap = {};
  for (let i = 0; i < source.length; i += 1) {
    const item = source[i];
    const { data } = await getInfo({
      projectId: state.searchFormData.projectId,
      id: item.id,
    });
    if (data?.data) {
      relates.push(data.data);
      if (!state.equipmentInfo[data.data.equipmentModelId]) {
        const eqpInfo = await getEqpInfo(data.data.equipmentModelId);
        equipmentMap[data.data.equipmentModelId] = eqpInfo;
      }
    }
  }
  state.relateList = relates;
  state.equipmentInfo = equipmentMap;
};

const handleSearchChange = () => {
  searchChange(state.searchFormData);
};

const batchExport = () => {
  ElMessageBox.confirm("确认导出选中的内容？", "警告", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      const ids = selectRows.value.map((item) => item.id);
      const data = await batchExportDevice(state.searchFormData.projectId, ids);
      if (data && !data.code) {
        exportWithExcel(data, "设备运行");
        ElMessage({
          type: "success",
          message: "导出成功",
        });
      }
    })
    .catch(() => {});
};
const deleteRow = async (row) => {
  const { code } = await deleteDevice(state.searchFormData.projectId, {
    id: row.id,
  });
  if (code === 200) {
    ElMessage.success("删除成功");
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
