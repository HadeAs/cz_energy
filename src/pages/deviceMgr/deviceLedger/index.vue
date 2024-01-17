<!--
 * @Author: ymZhang
 * @Date: 2023-12-21 18:17:35
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-16 23:52:40
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
            <el-button type="primary" v-auth="'ledger_add'" @click="addRow"
              >新增</el-button
            >
            <el-button
              @click="batchExport"
              v-auth="'ledger_batch_import'"
              :disabled="!selectRows.length"
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
                  @change="handleProjectChange"
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
                <el-select
                  v-model="state.searchFormData.equipmentTypeId"
                  placeholder="选择设备类型"
                  clearable
                  @change="handleTypeChange"
                >
                  <el-option
                    v-for="item in state.equipmentTypes"
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
                  @change="handleTypeChange"
                />
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </template>
      <template #operation="scope">
        <a
          class="table-operator-btn"
          @click="editRow(scope.row)"
          v-auth="'ledger_edit'"
          >编辑</a
        >
        <a
          class="table-operator-btn"
          @click="editParam(scope.row)"
          v-auth="'ledger_edit'"
          >技术参数</a
        >
        <ProPopConfirm
          title="你确定要删除该配置吗?"
          :icon="CircleCloseFilled"
          iconColor="red"
          @confirm="deleteRow(scope.row)"
        >
          <a class="table-operator-btn" v-auth="'ledger_delete'">删除</a>
        </ProPopConfirm>
      </template>
    </ProTable>
    <ProDrawer
      :title="state.detailDrawerTitle"
      ref="detailDrawerRef"
      @confirm="confirmDetail"
    >
      <Detail
        ref="commDetailRef"
        :opts="state.equipmentTypes"
        :initData="state.initDetailData"
      />
    </ProDrawer>
    <ProDrawer
      title="编辑技术参数"
      ref="paramDrawerRef"
      @confirm="confirmParam"
    >
      <Param
        ref="commonParamRef"
        :params="state.initDetailData.equipmentModelParamList"
      />
    </ProDrawer>
    <ProDrawer title="批量导入" ref="importDrawerRef" @confirm="confirmImport">
      <Import ref="importRef" />
    </ProDrawer>
  </MainContentContainer>
</template>

<script setup lang="jsx">
import { reactive, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import MainContentContainer from "@/components/MainContentContainer.vue";
import ProDrawer from "@/components/ProDrawer.vue";
import ProPopConfirm from "@/components/ProPopConfirm.vue";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import { ElTag } from "element-plus";
import { storeToRefs } from "pinia";
import Detail from "./components/detail.vue";
import Param from "./components/param.vue";
import Import from "./components/import.vue";
import {
  getList,
  deleteModel,
  updateModel,
  getInfo,
  delDeviceParam,
  addDeviceParam,
  batchExportDevice,
} from "@/api/deviceMgr/deviceLedger";
import { getEquipmentTypeList } from "@/api/deviceMgr";
import appStore from "@/store";
import useTable from "@/hooks/useTable";
import { exportWithExcel } from "@/utils";

const TAGS_MAP = ["", "success", "info", "warning", "danger"];
const { globalState } = storeToRefs(appStore.global);

const detailDrawerRef = ref();
const commDetailRef = ref();
const importDrawerRef = ref();
const paramDrawerRef = ref();
const commonParamRef = ref();
const importRef = ref();
const state = reactive({
  searchFormData: {
    projectId: globalState.value.projectId,
    equipmentTypeId: "",
    textQuery: "",
  },
  sortInfo: { prop: "openTime", order: "descending" },
  initDetailData: {},
  equipmentTypes: [],
  detailDrawerTitle: "",
  operateType: "",
});

const column = [
  {
    prop: "name",
    label: "设备型号名称",
    width: 160,
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
    prop: "modelNum",
    label: "型号规格",
    sortable: "custom",
    width: 150,
  },
  {
    prop: "typeName",
    label: "设备类型",
    width: 100,
    render: (scope) => {
      const type = scope.row.typeName;
      const tagType = TAGS_MAP[Math.floor(Math.random() * 5)];
      return <ElTag type={tagType}>{type}</ElTag>;
    },
  },
  {
    prop: "equipmentModelParamList",
    label: "技术参数",
    width: 210,
    // showOverflowTooltip: false,
    render: (scope) => {
      const { equipmentModelParamList = [] } = scope.row;
      if (equipmentModelParamList.length) {
        return (
          <div style="display: flex;">
            {equipmentModelParamList.map((item) => (
              <ElTag class="param-tag" effect="dark">
                {item.name}: {item.value}
              </ElTag>
            ))}
          </div>
        );
      }
      return null;
    },
  },
  {
    prop: "openTime",
    label: "安装时间",
    sortable: "custom",
    // width: 100,
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
  getTableList,
  selectionChange,
} = useTable(getList, state.searchFormData, state.sortInfo, {}, 104);

getTableList();

const getDeviceInfo = async (id) => {
  const { data } = await getInfo({
    projectId: state.searchFormData.projectId,
    id,
  });
  return data?.data || {};
};

const getEqpList = async () => {
  const { data } = await getEquipmentTypeList({
    projectId: state.searchFormData.projectId,
  });
  state.equipmentTypes = data.data;
};
getEqpList();

const handleProjectChange = () => {
  getEqpList();
  searchChange(state.searchFormData);
};

const handleTypeChange = () => {
  searchChange(state.searchFormData);
};

const addRow = () => {
  state.operateType = "add";
  state.detailDrawerTitle = "新增设备台帐";
  detailDrawerRef.value.open();
  state.initDetailData = null;
};

const batchExport = () => {
  // importDrawerRef.value.open();
  ElMessageBox.confirm("确认导出选中的内容？", "警告", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      const ids = selectRows.value.map((item) => item.id);
      const data = await batchExportDevice(state.searchFormData.projectId, ids);
      if (data && !data.code) {
        exportWithExcel(data, "设备台账");
        ElMessage({
          type: "success",
          message: "导出成功",
        });
      }
    })
    .catch(() => {});
};

const editRow = async (data) => {
  const detail = await getDeviceInfo(data.id);
  state.operateType = "edit";
  state.detailDrawerTitle = "编辑设备台帐";
  detailDrawerRef.value.open();
  state.initDetailData = {
    ...data,
    equipmentTypeId: detail.equipmentTypeId,
  };
};

const editParam = async (data) => {
  const detail = await getDeviceInfo(data.id);
  paramDrawerRef.value.open();
  state.initDetailData = {
    ...data,
    ...detail,
  };
};

const deleteRow = async (row) => {
  const { code } = await deleteModel(state.searchFormData.projectId, {
    id: row.id,
  });
  if (code === 200) {
    ElMessage.success("删除成功");
    getTableList();
  }
};

const confirmDetail = async () => {
  const res = await commDetailRef.value.validate();
  if (res) {
    const { code } = await updateModel(state.searchFormData.projectId, res);
    if (code === 200) {
      ElMessage.success(
        `${state.operateType === "add" ? "新增" : "修改"}设备台账成功`
      );
      detailDrawerRef.value.close();
      getTableList();
    }
  }
};

const handleParams = async (params, fetchFunc) => {
  for (let i = 0; i < params.length; i += 1) {
    await fetchFunc(state.searchFormData.projectId, params[i]);
  }
};

const confirmParam = async () => {
  try {
    const res = await commonParamRef.value.getValue();
    if (res) {
      const { addParams, deleteParams } = res;
      let changeFlag = false;
      if (addParams.length) {
        changeFlag = true;
        await handleParams(
          addParams.map((item) => ({
            ...item,
            equipmentModelId: state.initDetailData.id,
          })),
          addDeviceParam
        );
      }
      if (deleteParams.length) {
        changeFlag = true;
        await handleParams(
          deleteParams.map((item) => ({
            id: item.id,
            equipmentModelId: item.equipmentModelId,
          })),
          delDeviceParam
        );
      }
      paramDrawerRef.value.close();
      if (changeFlag) {
        ElMessage.success("设备型号参数修改成功");
        getTableList();
      }
    }
  } catch (error) {
    ElMessage.error("设备型号参数设置异常");
    console.log("设备型号参数设置异常,", error);
  }
};
const confirmImport = async () => {
  importDrawerRef.value.close();
};
</script>
<style lang="scss">
.param-tag {
  margin-right: 4px;
}
span.warn {
  color: rgba(255, 48, 0, 0.898039215686275);
}
</style>
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
