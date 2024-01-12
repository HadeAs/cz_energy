<!--
 * @Author: ymZhang
 * @Date: 2023-12-26 15:34:18
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-12 21:40:27
 * @Description: 
-->
<template>
  <ProDrawer :title="title" ref="handleDrawerRef" @confirm="confirmDetail">
    <el-form
      ref="formRef"
      v-bind="COMMON_FORM_CONFIG"
      :model="state.form"
      :rules="rules"
    >
      <el-form-item label="所属项目" required prop="projectId">
        <el-select v-model="state.form.projectId" @change="handleProjectChange">
          <el-option
            v-for="item in projectList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="设备名称" required prop="name">
        <el-input placeholder="请输入设备名称" v-model="state.form.name" />
      </el-form-item>
      <el-form-item label="资产编号" required prop="propertyNum">
        <el-input
          placeholder="请输入资产编号"
          v-model="state.form.propertyNum"
        />
      </el-form-item>
      <!-- <el-form-item label="设备种类" required prop="sysClassId">
        <el-select v-model="state.form.sysClassId">
          <el-option
            v-for="item in classifyList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item> -->
      <el-form-item label="设备位置" required prop="location">
        <el-input v-model="state.form.location" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="设备型号" required prop="equipmentModelId">
        <el-select v-model="state.form.equipmentModelId">
          <el-option
            v-for="item in state.equipmentTypes"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="管理人" required prop="managerId">
        <el-select v-model="state.form.managerId">
          <el-option
            v-for="item in state.managerList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="保养信息类别" required prop="classify">
        <el-select v-model="state.form.classify">
          <el-option
            v-for="item in state.projectOpts"
            :key="item.id"
            :label="item.text"
            :value="item.id"
          />
        </el-select>
      </el-form-item> -->
      <el-form-item label="启用时间" required prop="openTime">
        <el-date-picker
          value-format="YYYY-MM-DD hh:mm:ss"
          v-model="state.form.openTime"
          type="datetime"
          placeholder="请选择时间"
        />
      </el-form-item>
      <el-form-item label="启用状态" required prop="status">
        <el-radio-group v-model="state.form.status">
          <el-radio-button :label="true">启用</el-radio-button>
          <el-radio-button :label="false">停用</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上传设备图片" prop="image">
        <ProUpload
          ref="imageRef"
          list-type="picture-card"
          :limit="1"
          :file-list="state.form.image"
          @change="handleChange"
        />
      </el-form-item>
    </el-form>
  </ProDrawer>
</template>
<script setup name="Detail">
import { ref, reactive, watch } from "vue";
import ProDrawer from "@/components/ProDrawer.vue";
import { COMMON_FORM_CONFIG } from "@/constant/formConfig";
import ProUpload from "@/components/ProUpload.vue";
import { getInfo } from "@/api/deviceMgr/deviceGroup";
import { getEquipmentModelList, getProjectManagerList } from "@/api/deviceMgr";
import { getImageUrl } from "@/api/common";
import { transformFileToUrl } from "@/utils";

let oldRaw;
const initData = {
  projectId: "",
  name: "",
  propertyNum: "",
  equipmentModelId: "",
  location: "",
  // sysClassId: "",
  managerId: "",
  // classify: "",
  openTime: "",
  status: true,
  image: [],
};
const rules = {
  image: [
    {
      type: "array",
      required: true,
      message: "请上传设备图",
      trigger: "change",
    },
  ],
};
const emits = defineEmits(["submit"]);
const props = defineProps({
  title: { type: String },
  data: { type: Object, default: {} },
  projectList: { type: Array },
  classifyList: { type: Array },
});

const handleDrawerRef = ref();
const formRef = ref();
const state = reactive({
  form: { ...initData, ...props.data },
  projectOpts: [
    {
      id: "1",
      text: "demo1",
    },
    {
      id: "2",
      text: "demo2",
    },
    {
      id: "3",
      text: "demo3",
    },
  ],
  detailInfo: {},
  equipmentTypes: [],
  managerList: [],
});

const getEqpList = async (projectId) => {
  const { data: equipmentTypes } = await getEquipmentModelList({
    projectId,
  });
  const { data: managerList } = await getProjectManagerList({ projectId });
  state.equipmentTypes = equipmentTypes?.data || [];
  state.managerList = managerList?.data || [];
};

const parseImage = async (url) => {
  const data = await getImageUrl(url);
  oldRaw = data;
  const imageUrl = transformFileToUrl(data);
  const [fileName, fileSuffix] = url.split(".");
  return [{ name: fileName, url: imageUrl }];
};

const getDetail = async (param) => {
  const { data } = await getInfo({ projectId: param.projectId, id: param.id });
  if (data?.data) {
    state.detailInfo = data.data;
    state.form.status = data.data.status || false;
    state.form.managerId = data.data.managerId;
    state.form.equipmentModelId = data.data.equipmentModelId;
    if (data.data.image) {
      const images = await parseImage(data.data.image);
      state.form.image = images;
    }
  }
};

const handleChange = (fileList) => {
  oldRaw = null;
  state.form.image = fileList;
};

const handleProjectChange = () => {
  getEqpList(state.form.projectId);
};
const confirmDetail = async () => {
  await formRef.value.validate((valid) => {
    if (valid) {
      const { image = [], projectId, ...rest } = state.form;
      const param = { ...rest, file: image[0].raw };
      if (image[0].raw) {
        param.file = image[0].raw;
      } else if (oldRaw) {
        param.file = new File([oldRaw], `${image[0].name}.png`, {
          type: oldRaw.type,
        });
        oldRaw = null;
      }
      if (props.data?.id) {
        param.id = props.data.id;
      }
      emits("submit", param);
    }
  });
};

watch(
  () => props.data,
  (val) => {
    state.form = { ...initData, ...val };
    if (val.id) {
      getEqpList(val.projectId);
      getDetail(val);
    }
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
