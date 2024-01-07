<!--
 * @Author: ymZhang
 * @Date: 2023-12-26 15:52:16
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-06 21:01:33
 * @Description: 
-->
<template>
  <ProDrawer title="新增" ref="handleDrawerRef" @confirm="confirmDetail">
    <el-form
      ref="formRef"
      v-bind="COMMON_FORM_CONFIG"
      :model="state.form"
      :rules="rules"
    >
      <el-form-item label="报警设备名称" prop="equipmentId">
        <el-select
          v-model="state.form.equipmentId"
          placeholder="请选择报警设备"
        >
          <el-option
            v-for="item in state.opts"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="报警内容" prop="content">
        <el-input
          v-model="state.form.content"
          type="textarea"
          placeholder="请输入至少5个字符"
        />
      </el-form-item>
      <el-form-item label="报警等级" prop="level">
        <el-select v-model="state.form.level" placeholder="请选择报警等级">
          <el-option
            v-for="item in ALARM_LEVELS"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </ProDrawer>
</template>
<script setup name="Handle">
import { ref, reactive } from "vue";
import ProDrawer from "@/components/ProDrawer.vue";
import { COMMON_FORM_CONFIG } from "@/constant/formConfig";
import { getEquipmentList } from "@/api/deviceMgr";
import { ALARM_LEVELS } from "@/constant";

const props = defineProps({
  projectId: {
    type: Number,
  },
});

const rules = {
  equipmentId: { required: true, message: "请选择报警设备", trigger: "change" },
  content: [
    { required: true, message: "请输入报警内容", trigger: "blur" },
    { min: 5, message: "请输入至少5个字符", trigger: "blur" },
  ],
  level: { required: true, message: "请选择报警等级", trigger: "change" },
};
const initData = {
  equipmentId: "",
  level: "",
  content: "",
};
const emits = defineEmits(["submit"]);
const handleDrawerRef = ref();
const formRef = ref();
const state = reactive({
  form: { ...initData },
  opts: [],
});
const confirmDetail = async () => {
  await formRef.value.validate((valid) => {
    if (valid) {
      emits("submit", state.form);
    }
  });
};
const getList = async () => {
  const { data } = await getEquipmentList({ projectId: props.projectId });
  state.opts = data.data;
};
const open = () => {
  getList();
  handleDrawerRef.value.open();
};
const close = () => {
  handleDrawerRef.value.close();
};
defineExpose({ open, close });
</script>
