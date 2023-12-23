<template>
  <div class="cs-left-wrapper">
    <Back />
    <Summary />
    <Measure />
    <Analyse />
  </div>
  <div class="cs-center-wrapper">
    <Trend />
  </div>
  <div class="cs-right-wrapper">
    <Warning />
    <List />
    <Manage />
  </div>
</template>
<script lang="ts" setup name="MainB">
import { Back, Summary, Measure, Analyse, Trend, Warning, List, Manage } from "./components";
</script>
<style lang="scss">
.cs-right-tab {
  list-style: none;
  padding: 0;
  display: flex;
}

.cs-right-tab li {
  height: 28px;
  line-height: 26px;
  border-bottom: 2px solid transparent;
  color: #7A7886;
  text-align: center;
  cursor: pointer;
}

.cs-right-tab li.active {
  border-color: #2985f7;
  color: #fff;
  font-weight: bold;
}

.cs-right-tab li:first-child {
  width: 22%;
}

.cs-right-tab li:nth-child(2) {
  width: 28%;
}

.cs-right-tab li:nth-child(3) {
  width: 28%;
}

.cs-right-tab li:nth-child(4) {
  width: 22%;
}
</style>
<style lang="scss" scoped>
.cs-left-wrapper {
  width: 542px;
  flex-shrink: 0;
}
.cs-center-wrapper {
  flex: 1;
  margin: 0 20px;
}
.cs-right-wrapper {
  width: 526px;
  flex-shrink: 0;
}
</style>