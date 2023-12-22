<template>
  <span class="cs-right-text">{{ state.currentTime }}</span>
  <span class="cs-right-text">{{ state.currentDate }}</span>
  <span class="cs-right-text">{{ state.currentWeek }}</span>
</template>
<script lang="ts" setup name="IntervalTime">
import { reactive, onUnmounted } from "vue";
import dayjs from "dayjs";
let interval;

const weeks = ["天", "一", "二", "三", "四", "五", "六"];
const state = reactive({
  currentDate: "",
  currentWeek: "",
  currentTime: "",
});

const getDate = () => {
  const date = dayjs(new Date());
  state.currentDate = `${date["$y"]}-${date["$M"] + 1}-${date["$D"]}`
};

const getWeek = () => {
  const week = dayjs().day();
  state.currentWeek = `星期${weeks[week]}`;
};

const getTime = () => {
  const h = dayjs().hour();
  const m = dayjs().minute();
  const s = dayjs().second();
  const arr = [h, m, s].map((item: any) =>
    String(item).length < 2 ? `0${item}` : item
  );
  state.currentTime = arr.join(":");
};
const init = () => {
  getTime();
  getWeek();
  getDate();

  interval = setInterval(() => {
    getTime();
  }, 1000);
};

onUnmounted(() => {
  clearInterval(interval);
});
init();
</script>
<style lang="scss" scoped>
.cs-right-text {
  color: #A9C5E7;
  margin-right: 10px;
}
</style>