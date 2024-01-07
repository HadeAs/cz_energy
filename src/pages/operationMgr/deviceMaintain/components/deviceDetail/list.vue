<!--
 * @Author: ymZhang
 * @Date: 2023-12-24 18:06:45
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-07 16:58:57
 * @Description: 
-->
<template>
  <BoxContainer title="该型号设备列表（15）">
    <ProTable
      :column="column"
      :pageInfo="pageInfo"
      :default-sort="state.sortInfo"
      :datasource="dataSource"
      v-loading="loading"
      @page-change="pageChange"
      @sort-change="sortChange"
    >
      <template #operation="scope">
        <a
          class="table-operator-btn"
          v-auth="'maintain_device_detail'"
          @click="viewDetail(scope.row)"
          >详情</a
        >
        <span
          class="table-operator-btn"
          :class="scope.row.maintainState === '未保养' ? '' : 'disabled'"
          v-auth="'maintain_device_maintenance'"
          @click="editRow(scope.row)"
          >设备保养</span
        >
      </template>
    </ProTable>
    <ProDrawer
      class="maintain-container"
      :size="480"
      title="设备保养"
      ref="drawerRef"
      @confirm="confirmAddVar"
    >
      <el-form
        ref="formRef"
        v-bind="COMMON_FORM_CONFIG"
        :model="state.formData"
        :rules="rules"
      >
        <el-form-item label="保养人" prop="maintainUser">
          <el-input
            v-model="state.formData.maintainUser"
            placeholder="请输入保养人"
          />
        </el-form-item>
        <el-form-item label="保养时间" prop="maintainDate">
          <el-date-picker
            v-model="state.formData.maintainDate"
            type="datetime"
            placeholder="请选择日期"
            value-format="YYYY-MM-DD hh:mm:ss"
          />
        </el-form-item>
        <el-form-item label="设备保养（最多上传5张）" prop="images">
          <ProUpload
            list-type="picture-card"
            :limit="5"
            :file-list="state.formData.images"
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item label="作业单号" prop="jobNumber">
          <el-input
            v-model="state.formData.jobNumber"
            placeholder="请输入保养人"
          />
        </el-form-item>
        <el-form-item label="作业内容" prop="jobContent">
          <el-input
            v-model="state.formData.jobContent"
            type="textarea"
            placeholder="请输入至少5个字符"
          />
        </el-form-item>
      </el-form>
    </ProDrawer>
  </BoxContainer>
</template>
<script setup lang="jsx" name="List">
import { ElTag } from "element-plus";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import ProDrawer from "@/components/ProDrawer.vue";
import BoxContainer from "../boxContainer.vue";
import { COMMON_FORM_CONFIG } from "@/constant/formConfig";
import ProUpload from "@/components/ProUpload.vue";
import useTable from "@/hooks/useTable";
import {
  getDevicePlanList,
  addDeviceMaintainPlan,
} from "@/api/operationMgr/deviceMaintain";

const props = defineProps({
  deviceId: { type: String },
  projectId: { type: Number },
});

const router = useRouter();
const rules = {
  maintainDate: {
    required: true,
    message: "请选择设备保养时间",
    trigger: "blur",
  },
  images: [
    {
      type: "array",
      required: true,
      message: "请上传设备保养图",
      trigger: "change",
    },
  ],
  jobContent: [
    { required: true, message: "请输入作业内容", trigger: "blur" },
    { min: 5, message: "请输入至少5个字符", trigger: "blur" },
  ],
};

const drawerRef = ref();
const formRef = ref();

const state = reactive({
  searchFormData: {
    projectId: props.projectId,
    equipmentModelId: props.deviceId,
  },
  sortInfo: { prop: "id", order: "descending" },
  pageInfo: {
    pageSize: 5,
    pageSizes: [5, 10, 15, 20],
  },
  formData: {
    maintainUser: "",
    maintainDate: "",
    jobNumber: "",
    jobContent: "",
    images: [],
  },
});

const column = [
  {
    prop: "name",
    label: "设备名称",
    // width: 180,
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.name}>
          <span className="table-first-col">{scope.row.name}</span>
        </div>
      );
    },
  },
  {
    prop: "propertyNum",
    label: "资产编号",
    width: 140,
  },
  {
    prop: "location",
    label: "设备位置",
    width: 200,
  },
  {
    prop: "status",
    label: "启用状态",
    width: 100,
    render: (scope) => {
      const ifOpen = scope.row.status === "启用";
      return (
        <>
          <span
            style={{
              color: ifOpen ? "#00B050" : "#FA5555",
              marginRight: "5px",
              fontSize: "12px",
            }}
          >
            ●{" "}
          </span>
          {scope.row.status}
        </>
      );
    },
  },
  {
    prop: "maintainState",
    label: "保养状态",
    render: (scope) => {
      const ifMaintain = scope.row.maintainState !== "未保养";
      return (
        <>
          <ElTag type={ifMaintain ? "success" : "warning"}>
            {scope.row.maintainState}
          </ElTag>
          {ifMaintain ? scope.row.maintainDate : " --"}
        </>
      );
    },
  },
];

const { dataSource, loading, pageInfo, pageChange, sortChange, getTableList } =
  useTable(
    getDevicePlanList,
    state.searchFormData,
    state.sortInfo,
    state.pageInfo
  );

getTableList();

const editRow = (row) => {
  if (row.maintainState === "未保养") {
    state.formData.equipmentId = row.id;
    drawerRef.value.open();
  }
};

const viewDetail = (row) => {
  const { id } = row;
  const path = router.resolve({
    name: "equipmentDetail",
    params: {
      id,
      equipmentModelId: props.deviceId,
    },
  }).href;
  window.open(path, "_blank");
};

const handleChange = (fileList) => {
  state.formData.images = fileList;
};
const confirmAddVar = () => {
  formRef.value
    .validate()
    .then(async () => {
      const { code } = await addDeviceMaintainPlan(props.projectId, {
        ...state.formData,
        images: state.formData.images.map((item) => item.row),
      });
      if (code === 200) {
        ElMessage.success("设备保养添加成功");
        drawerRef.value.close();
        getTableList();
      }
    })
    .catch(() => {
      console.log("fail");
    });
};
</script>
<style lang="scss" scoped>
.preview-img {
  width: 100%;
  height: 100%;
}
</style>
