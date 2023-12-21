<template>
  <el-config-provider :locale="zhCn">
    <el-container class="basic-layout-container">
      <el-aside width="240px">
        <el-menu router :default-active="defaultMenuKey">
          <el-sub-menu v-for="item in MENU_DATA" :index="item.path">
            <template #title>
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <span style="font-size: 16px">{{ item.name }}</span>
            </template>
            <el-menu-item
              v-for="v in item.children"
              :index="v.path"
              @click="handleMenuClick(v)"
              >{{ v.name }}</el-menu-item
            >
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header-content-container">
          <el-row :gutter="30" align="middle">
            <el-col :span="6">
              <div class="current-menu">{{ currentMenu }}</div>
            </el-col>
            <el-col :span="3" :offset="12">
              <el-button class="custom-btn" type="primary">主页大屏</el-button>
            </el-col>
            <el-col :span="3">
              <el-dropdown>
                <span class="el-dropdown-link">
                  <el-avatar size="small" :src="imgUrl" />
                  <span class="user-name">管理员</span>
                  <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>退出</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-header>

        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </el-config-provider>
</template>

<script setup>
import { ref } from "vue";
import { MENU_DATA } from "@/constant";
import imgUrl from "@/assets/img/user.png";
import { useRoute } from "vue-router";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

const route = useRoute();
const defaultMenuKey = route.path;

//查找当前url对应的菜单
let defaultMenu = "";
MENU_DATA.forEach((v) => {
  v.children.forEach((item) => {
    if (item.path === defaultMenuKey) {
      defaultMenu = item.name;
    }
  });
});
const currentMenu = ref(defaultMenu);

const handleMenuClick = (item) => {
  currentMenu.value = item.name;
};
</script>

<style scoped lang="scss">
.basic-layout-container {
  height: 100%;
  width: 100%;
  .el-header {
    height: 60px;
    position: relative;
    color: var(--el-text-color-primary);
  }
  .el-aside {
    color: var(--el-text-color-primary);
  }
  .el-menu {
    height: 100%;
    border-right: none;
    background-color: var(--menu-color);
    :deep() {
      .el-menu {
        background-color: var(--menu-color);
      }
      .el-sub-menu.is-active {
        .el-sub-menu__title {
          font-weight: 700;
          color: #2b3eb1;
        }
      }
      .el-sub-menu__title {
        color: var(--menu-text-color);
      }
    }
    .el-menu-item {
      color: var(--menu-text-color);
      &.is-active {
        background-color: rgba(43, 62, 177, 1);
        color: #ffffff;
        font-weight: 700;
      }
    }
  }
  .el-main {
    padding: 0px 20px 10px;
  }
  .header-content-container {
    padding: 15px 20px 20px;
    .current-menu {
      font-weight: 700;
      font-style: normal;
      font-size: 20px;
      color: #3142b4;
    }
    .custom-btn {
      border: 2px solid rgba(43, 62, 177, 1);
      background-color: rgba(43, 62, 177, 0.2) !important;
      font-weight: 700;
      font-style: normal;
      color: #2b3eb1;
      text-align: center;
      height: 30px;
    }
    .el-dropdown-link {
      cursor: pointer;
      display: flex;
      align-items: center;
      .user-name {
        margin-left: 10px;
        color: #000000;
      }
    }
  }
}
</style>
