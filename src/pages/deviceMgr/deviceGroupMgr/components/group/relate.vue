<!--
 * @Author: ymZhang
 * @Date: 2023-12-26 15:34:18
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-08 23:09:16
 * @Description: 
-->
<template>
  <ProDrawer
    title="关联设备参数"
    ref="handleDrawerRef"
    @confirm="confirmDetail"
  >
    <el-input
      v-model="state.search"
      placeholder="请输入设备参数名称"
      :prefix-icon="Search"
      clearable
      @keyup.enter="handleSearch"
      @clear="handleSearch"
    />
    <el-scrollbar class="down-content" height="calc(100vh - 200px)">
      <el-form
        ref="formRef"
        class="device-container"
        v-bind="COMMON_FORM_CONFIG"
        :model="state.form"
        :rules="rules"
      >
        <el-form-item prop="devices">
          <el-checkbox-group v-model="state.form.devices">
            <el-checkbox
              v-for="item in state.collectList"
              :key="item.id"
              :label="item.id"
              >{{ item.name }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </el-scrollbar>
  </ProDrawer>
</template>
<script setup name="Detail">
import { ref, reactive, watch } from "vue";
import ProDrawer from "@/components/ProDrawer.vue";
import { COMMON_FORM_CONFIG } from "@/constant/formConfig";
import { Search } from "@element-plus/icons-vue";
import { getCollectList } from "@/api/deviceMgr";
import { getInfo } from "@/api/deviceMgr/deviceGroup";
import { ElMessage } from "element-plus";

const initData = {
  devices: [],
};
const emits = defineEmits(["submit"]);
const props = defineProps({
  data: { type: Object, default: {} },
});
const handleDrawerRef = ref();
const formRef = ref();

const rules = {
  devices: [
    {
      type: "array",
      required: true,
      message: "请勾选至少一项",
      trigger: "change",
    },
  ],
};
const state = reactive({
  form: { ...initData },
  search: "",
  originCollectList: [],
  collectList: [],
});

const handleSearch = () => {
  if (state.search) {
    const filter = state.originCollectList.filter((item) =>
      item.name.toLowerCase().includes(state.search.toLowerCase())
    );
    state.collectList = filter;
  } else {
    state.collectList = [...state.originCollectList];
  }
};

const getDetail = async (param) => {
  const { data } = await getInfo({ projectId: param.projectId, id: param.id });
  if (data?.data) {
    state.form.devices = data.data.deviceIds || [];
  }
};

const getCollectionList = async () => {
  const { data } = await getCollectList({ projectId: props.data.projectId });
  if (data?.data) {
    state.originCollectList = [...data.data];
    state.collectList = data.data;
  }
};
const confirmDetail = async () => {
  await formRef.value.validate((valid) => {
    if (valid) {
      emits("submit", state.form.devices, props.data.id);
    } else {
      ElMessage.warning("请勾选至少一项");
    }
  });
};

watch(
  () => props.data,
  (val) => {
    getCollectionList();
    getDetail(val);
  }
);
const open = () => {
  handleDrawerRef.value.open();
};
const close = () => {
  handleDrawerRef.value.close();
};
defineExpose({ open, close });
</script>
<style lang="scss" scoped>
.device-container {
  :deep() {
    .el-checkbox {
      display: flex;
    }
  }
}
.down-content {
  margin-top: 10px;
}
</style>
