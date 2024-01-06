<!--
 * @Author: ymZhang
 * @Date: 2023-12-21 18:17:35
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-06 13:38:22
 * @Description: 
-->
<template>
  <MainContentContainer>
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
          <el-col :span="6">
            <el-button type="primary" v-auth="'ledger_add'" @click="addRow"
              >新增</el-button
            >
            <el-button @click="imports" v-auth="'ledger_batch_import'"
              >批量导入</el-button
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
import Import from "./components/import.vue";
import {
  getList,
  deleteModel,
  updateModel,
} from "@/api/deviceMgr/deviceLedger";
import { getEquipmentModelList } from "@/api/deviceMgr";
import appStore from "@/store";
import useTable from "@/hooks/useTable";

const { globalState } = storeToRefs(appStore.global);

const detailDrawerRef = ref();
const commDetailRef = ref();
const importDrawerRef = ref();
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
    width: 150,
  },
  // {
  //   prop: "no",
  //   label: "资产编号", // 无
  //   width: 150,
  // },
  {
    prop: "typeName",
    label: "设备类型",
    width: 100,
    render: (scope) => {
      const type = scope.row.typeName;
      // let tagType = "";
      // if (type === "空调") {
      //   tagType = "";
      // } else if (type === "供配电") {
      //   tagType = "success";
      // } else if (type === "照明") {
      //   tagType = "warning";
      // } else if (type === "动力") {
      //   tagType = "danger";
      // } else {
      //   tagType = "info";
      // }
      return <ElTag type="success">{type}</ElTag>;
    },
  },
  {
    prop: "desc",
    label: "技术参数",
    width: 210,
  },
  {
    prop: "openTime",
    label: "安装时间",
    sortable: true,
    // width: 100,
  },
];

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

const getEqpList = async () => {
  const { data } = await getEquipmentModelList({
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
  state.initDetailData = null;
  detailDrawerRef.value.open();
};

const imports = () => {
  importDrawerRef.value.open();
};

const editRow = (data) => {
  state.operateType = "edit";
  state.detailDrawerTitle = "编辑设备台帐";
  state.initDetailData = data;
  detailDrawerRef.value.open();
};

const deleteRow = (row) => {
  deleteModel(state.searchFormData.projectId, { id: row.id });
};

const confirmDetail = async () => {
  const res = await commDetailRef.value.validate();
  if (res) {
    // 配置新增/编辑逻辑
    // if (state.operateType === "add") {
    //   // state.dataSource.push(res);
    // } else {
    //   const { data } = await updateModel(state.searchFormData.projectId, res);
    // }
    const { data } = await updateModel(state.searchFormData.projectId, res);
    detailDrawerRef.value.close();
    getTableList();
  }
};
const confirmImport = async () => {
  importDrawerRef.value.close();
};
</script>
<style lang="scss">
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
