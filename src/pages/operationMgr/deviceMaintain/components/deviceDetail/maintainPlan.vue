<!--
 * @Author: ymZhang
 * @Date: 2023-12-25 13:10:14
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-16 22:40:28
 * @Description: 
-->
<template>
  <BoxContainer title="保养计划" v-auth="'maintain_device_plan_get'">
    <template #extra>
      <el-button
        type="primary"
        v-auth="'maintain_device_add'"
        @click="handleAdd"
        >添加</el-button
      >
    </template>
    <el-descriptions
      class="maintain-plan-container"
      :column="1"
      size="default"
      border
    >
      <el-descriptions-item
        v-for="item in state.exclData"
        :key="item.id"
        :label="item.year + '年'"
      >
        <div class="record-content">
          {{ item.content }}
          <ProPopConfirm
            title="你确定要删除该计划吗?"
            :icon="CircleCloseFilled"
            iconColor="red"
            @confirm="deleteRecord(item)"
          >
            <el-button link type="danger" v-auth="'maintain_device_plan_delete'"
              >删除</el-button
            >
          </ProPopConfirm>
        </div>
      </el-descriptions-item>
    </el-descriptions>
    <ProDrawer title="添加保养计划" ref="drawerRef" @confirm="confirmAddVar">
      <el-form
        ref="formRef"
        v-bind="COMMON_FORM_CONFIG"
        :model="state.formData"
        :rules="rules"
      >
        <el-form-item label="保养年份" prop="year">
          <el-date-picker
            v-model="state.formData.year"
            type="year"
            placeholder="选择保养年份"
            value-format="YYYY"
          />
        </el-form-item>
        <el-form-item label="计划内容" prop="content">
          <el-input
            class="desc-inner"
            v-model="state.formData.content"
            type="textarea"
            placeholder="请输入至少5个字符"
          />
        </el-form-item>
      </el-form>
    </ProDrawer>
  </BoxContainer>
</template>
<script setup name="MainTainPlan">
import { reactive, ref } from "vue";
import BoxContainer from "../boxContainer.vue";
import {
  getLatestPlan,
  deletePlan,
  addPlan,
} from "@/api/operationMgr/deviceMaintain";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import { COMMON_FORM_CONFIG } from "@/constant/formConfig";
import { ElMessage } from "element-plus";

const props = defineProps({
  deviceId: { type: String },
  projectId: { type: String },
});
const rules = {
  year: [{ required: true, message: "请选择年份", trigger: "blur" }],
  content: [
    { required: true, message: "请输入至少5个字符", trigger: "blur" },
    { min: 5, message: "请输入至少5个字符", trigger: "blur" },
  ],
};
const drawerRef = ref();
const formRef = ref();
const state = reactive({
  exclData: [],
  formData: {
    content: "",
    year: "",
  },
});

const getList = async () => {
  const { data } = await getLatestPlan({
    projectId: props.projectId,
    equipmentModelId: props.deviceId,
  });
  if (data?.data) {
    state.exclData = data.data;
  }
};
getList();

const deleteRecord = async (row) => {
  const { code } = await deletePlan(props.projectId, {
    equipmentModelId: props.deviceId,
    maintainPlanId: row.id,
  });
  if (code === 200) {
    ElMessage.success("计划删除成功");
    getList();
  }
};

const handleAdd = () => {
  state.formData.content = "";
  state.formData.year = "";
  drawerRef.value.open();
};
const confirmAddVar = () => {
  formRef.value
    .validate()
    .then(async () => {
      const { code } = await addPlan(props.projectId, {
        equipmentModelId: props.deviceId,
        year: Number(state.formData.year),
        content: state.formData.content,
      });
      if (code === 200) {
        ElMessage.success("计划添加成功");
        getList();
        drawerRef.value.close();
      }
    })
    .catch(() => {
      console.log("fail");
    });
};
</script>
<style lang="scss" scoped>
.maintain-plan-container {
  :deep() {
    .el-descriptions__label {
      width: 100px;
    }
    .el-descriptions__body
      .el-descriptions__table.is-bordered
      .el-descriptions__cell {
      min-width: 100px;
    }
  }
  .record-content {
    position: relative;
    padding-right: 40px;
    button {
      position: absolute;
      right: 3px;
      top: 3px;
    }
  }
}
.desc-inner {
  :deep() {
    .el-textarea__inner {
      min-height: calc(100vh - 250px) !important;
    }
  }
}
</style>
