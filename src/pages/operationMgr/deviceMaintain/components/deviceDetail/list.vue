<!--
 * @Author: ymZhang
 * @Date: 2023-12-24 18:06:45
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2024-01-05 21:09:06
 * @Description: 
-->
<template>
  <BoxContainer title="该型号设备列表（15）">
    <ProTable
      :column="column"
      :pageInfo="state.pageInfo"
      :datasource="state.dataSource"
      @page-change="pageChange"
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
          :class="scope.row.status === 1 ? '' : 'disabled'"
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
        <el-form-item label="保养时间" prop="time">
          <el-date-picker
            v-model="state.formData.time"
            type="date"
            placeholder="请选择日期"
          />
        </el-form-item>
        <el-form-item label="设备保养（最多上传5张）" prop="detailImgs">
          <ProUpload
            list-type="picture-card"
            :limit="5"
            :file-list="state.formData.detailImgs"
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item label="作业内容" prop="desc">
          <el-input
            v-model="state.formData.desc"
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

const COMMON_DATA_MAPS = [
  {
    project: "冷水机组",
    no: "AL264694",
    position: "空调主机一一楼主机机房",
    status: 1,
    time: "2023-02-15",
  },
  {
    project: "冷水机组",
    no: "AL264694",
    position: "空调主机一一楼主机机房",
    status: 0,
    time: "2023-02-15",
  },
  {
    project: "冷水机组",
    no: "AL264694",
    position: "空调主机一一楼主机机房",
    status: 1,
    time: "2023-02-15",
  },
  {
    project: "冷水机组",
    no: "AL264694",
    position: "空调主机一一楼主机机房",
    status: 0,
    time: "2023-02-15",
  },
];

const router = useRouter();
const rules = {
  time: { required: true, message: "请选择设备保养时间", trigger: "blur" },
  detailImgs: { required: true, message: "请上传设备保养图", trigger: "blur" },
};

const drawerRef = ref();
const formRef = ref();

const state = reactive({
  pageInfo: {
    total: 30,
    currentPage: 1,
    pageSize: 5,
    pageSizes: [5, 10, 15, 30, 50],
  },
  dataSource: [],
  formData: {
    time: "",
    detailImgs: [],
    desc: "",
  },
});

const column = [
  {
    prop: "project",
    label: "设备名称",
    // width: 110,
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.project}>
          <span className="table-first-col">{scope.row.project}</span>
        </div>
      );
    },
  },
  {
    prop: "no",
    label: "资产编号",
    width: 140,
  },
  {
    prop: "position",
    label: "设备位置",
    width: 200,
  },
  {
    prop: "status",
    label: "启用状态",
    width: 100,
    render: (scope) => {
      const ifOpen = scope.row.status === 1;
      return (
        <>
          <span
            style={{
              color: ifOpen ? "#00B050" : "#FA5555",
              marginRight: "5px",
              fontSize: "5px",
            }}
          >
            ●{" "}
          </span>
          {ifOpen ? "启用" : "停用"}
        </>
      );
    },
  },
  {
    prop: "time",
    label: "保养状态",
    // width: 150,
    render: (scope) => {
      const ifMaintain = scope.row.status === 1;
      return (
        <>
          <ElTag type={ifMaintain ? "success" : "warning"}>
            {ifMaintain ? "已保养" : "未保养"}
          </ElTag>
          {ifMaintain ? scope.row.time : "--"}
        </>
      );
    },
  },
];

const getList = async () => {
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      state.loading = false;
      const data = new Array(5).fill("").map((num, index) => {
        const i = index % 4;
        return {
          ...COMMON_DATA_MAPS[i],
          id: index,
          project: `${COMMON_DATA_MAPS[i].project}00${index}`,
        };
      });
      resolve(data);
    }, 600);
  });
  state.dataSource = res;
};
getList();

const pageChange = (currentPage, pageSize) => {
  console.log(currentPage, pageSize);
};

const editRow = (row) => {
  state.formData.time = row.time;
  state.formData.detailImgs = [];
  state.formData.desc = row.desc;
  drawerRef.value.open();
};

const viewDetail = (row) => {
  const { id } = row;
  const path = router.resolve({
    name: "equipmentDetail",
    params: {
      id,
    },
  }).href;
  window.open(path, "_blank");
};

const handleChange = (fileList) => {
  console.log(fileList);
  state.formData.detailImgs = fileList;
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
.preview-img {
  width: 100%;
  height: 100%;
}
</style>
