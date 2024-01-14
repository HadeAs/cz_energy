<template>
  <div class="cs-box-content content">
    <div class="cs-header-content">
      <img src="@/assets/img/screen/mainB/u7.png" />实时告警
    </div>
    <ul class="cs-right-tab">
      <li
        v-for="(item, index) in tabs"
        :key="index"
        :class="state.activeTab === item.id ? 'active' : ''"
        @click="handleChangeTab(item.id)"
      >
        {{ item.name }}
      </li>
    </ul>

    <ul class="cs-right-wrap1">
      <li
        v-for="(item, index) in state[state.activeTab]"
        :key="index"
        class="cs-table-info"
      >
        <div>
          <span
            class="label label-info light label-sm"
            :class="item.status === 0 ? 'label-info' : 'label-success'"
            >{{ item.tag }}</span
          >
        </div>
        <div>
          <span class="spot"></span>
          <span class="text-overflow">{{ item.content }}</span>
        </div>
        <div>{{ item.date }}</div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { reactive } from "vue";
const tabs = [
  { id: "all", name: "全部" },
  { id: "tag1", name: "设备故障" },
  { id: "tag2", name: "耗电量超标" },
  { id: "tag3", name: "能耗超标" },
];

const values = [
  {
    tag: "待处理",
    status: 0,
    content: "编号1006压力传感器6公斤故障",
    date: "18:54:45",
  },
  {
    tag: "待处理",
    status: 0,
    content: "编号1156空气热泵机组1设备故障",
    date: "16:10:12",
  },
  {
    tag: "待处理",
    status: 0,
    content: "编号1021水箱温度升高 报警",
    date: "12:08:33",
  },
  {
    tag: "已处理",
    status: 1,
    content: "编号1014液位传感器故障处理",
    date: "10:08:33",
  },
  {
    tag: "已处理",
    status: 1,
    content: "编号1157空气源热泵机组2 清洗处理完成",
    date: "09:14:45",
  },
];
const state = reactive({
  activeTab: "all",
  all: values,
  tag1: [values[0], values[1]],
  tag2: [values[0], values[1], values[2]],
  tag3: [values[3], values[4]],
});
const handleChangeTab = (value) => {
  if (state.activeTab !== value) {
    state.activeTab = value;
  }
};
</script>
<style lang="scss" scoped>
.content {
  height: 295px;
  .light {
    color: #eb9e05;
    background-color: rgba(235, 158, 5, 0.2);
    border: rgba(1, 179, 202, 0.4);
  }
  .label-success.light {
    color: #00d400;
    background-color: rgba(0, 212, 0, 0.3);
    border: rgba(0, 212, 0, 0.4);
  }
  .cs-right-wrap1 {
    list-style: none;
    padding: 0;
  }

  .cs-right-wrap1 .cs-table-info {
    height: 38px;
    line-height: 36px;
    border-bottom: 1px solid #485468;
    color: #6ed7fe;
    display: flex;
  }

  .cs-right-wrap1 .cs-table-info:first-child {
    border-top: 1px solid #485468;
  }

  .cs-right-wrap1 .cs-table-info:hover {
    background-color: #2d2837;
  }

  .cs-right-wrap1 .cs-table-info:nth-child(3n) .spot {
    background-color: #ff6600;
  }

  .cs-right-wrap1 .cs-table-info:nth-child(3n + 1) .spot {
    background-color: #ffcc00;
  }

  .cs-right-wrap1 .cs-table-info:nth-child(3n + 2) .spot {
    background-color: #ff3000;
  }

  .cs-right-wrap1 .cs-table-info div {
    padding: 0 6px;
  }

  .cs-right-wrap1 .cs-table-info div:first-child {
    width: 80px;
    flex-shrink: 0;
  }

  .cs-right-wrap1 .cs-table-info div:nth-child(2) {
    overflow: hidden;
    flex: 1;
    display: flex;
    align-items: center;
  }

  .cs-right-wrap1 .cs-table-info div:nth-child(2) .spot {
    width: 6px;
    height: 6px;
    border-radius: 3px;
    flex-shrink: 0;
    margin-right: 6px;
  }

  .cs-right-wrap1 .cs-table-info div:nth-child(2) .text-overflow {
    height: 18px;
    line-height: 18px;
    flex: 1;
    color: #a9c5e7;
    border-right: 1px solid #485468;
    padding-right: 6px;
  }

  .cs-right-wrap1 .cs-table-info div:last-child {
    width: 80px;
    flex-shrink: 0;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
  }
}
</style>
