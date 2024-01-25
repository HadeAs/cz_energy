<template>
  <div class="cs-box-content content">
    <div class="cs-header-content">
      <img src="@/assets/img/screen/mainB/u5.png" />设备能耗列表
    </div>
    <ul class="cs-table-wrap cs-right-table">
      <li class="cs-table-header">
        <span>设备名称</span>
        <span>能源消耗量（kWh）</span>
        <span>是否重点用能</span>
      </li>
      <li
        class="cs-table-info"
        v-for="item in state.list"
        :key="item.equipmentId"
      >
        <span> {{ item.equipmentName }}</span>
        <span>{{ item.data.toLocaleString() }}</span>
        <span
          ><el-icon class="check-circle-outline"><CircleCheck /></el-icon
        ></span>
      </li>
    </ul>
  </div>
</template>
<script setup name="List">
import { reactive, watch } from "vue";
import { CircleCheck } from "@element-plus/icons-vue";
import { queryPowerRank } from "@/api/screen/mainb";
const props = defineProps({
  projectId: { type: Number },
});

const state = reactive({
  tag: "kWh",
  list: [],
});
const queryList = async () => {
  const { data } = await queryPowerRank({ projectId: props.projectId });
  if (data?.rankList) {
    state.list = data.rankList;
    state.tag = data.tag;
  }
};
queryList();
watch(
  () => props.projectId,
  () => {
    queryList();
  }
);
</script>
<style lang="scss" scoped>
.content {
  height: 314px;

  .cs-table-wrap {
    list-style: none;
    padding: 0;
    margin-top: 12px;
  }

  .cs-table-wrap .cs-table-header {
    height: 40px;
    line-height: 38px;
    background-color: #2d2837;
    border-bottom: 1px solid #485468;
    font-weight: bold;
    color: #7a7886;
    display: flex;
  }

  .cs-table-wrap .cs-table-info {
    height: 40px;
    line-height: 38px;
    border-bottom: 1px solid #485468;
    color: #a9c5e7;
    display: flex;
  }

  .cs-table-wrap .cs-table-info:hover {
    background-color: #2d2837;
  }

  .cs-table-wrap .cs-table-info i {
    font-size: 18px;
    position: relative;
    top: 4px;
  }

  .cs-table-wrap .cs-table-info .close-circle-outline {
    color: #ff6600;
  }

  .cs-table-wrap .cs-table-info .check-circle-outline {
    color: #63fb96;
  }

  .cs-table-wrap span {
    padding: 0 16px;
  }

  .cs-table-wrap span:first-child {
    width: 35%;
  }

  .cs-table-wrap span:nth-child(2) {
    width: 40%;
  }

  .cs-table-wrap span:last-child {
    width: 25%;
  }
}
</style>
