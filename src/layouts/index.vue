<template>
  <el-container class="basic-layout-container">
    <el-aside width="240px">
      <div class="logo-container">
        <el-image style="width: 70px; height: 53px" :src="logoUrl" fit="fill" />
        <el-image
          style="width: 154px; height: 31px"
          :src="logoTextUrl"
          fit="fill"
        />
      </div>
      <el-scrollbar style="height: calc(100% - 95px)">
        <el-menu :default-active="defaultMenuKey">
          <el-sub-menu v-for="item in MENU_DATA" :index="item.path">
            <template #title>
              <el-icon>
                <span style="width: 16px; height: 16px"
                  ><i :class="item.icon"></i
                ></span>
              </el-icon>
              <span style="font-size: 16px">{{ item.name }}</span>
            </template>
            <el-menu-item
              v-for="v in item.children"
              :index="v.path"
              @click="handleMenuClick(v)"
            >
              <span style="margin-left: 9px">{{ v.name }}</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header class="header-content-container">
        <el-row :gutter="30" align="middle">
          <el-col :span="7">
            <div class="menu-container">
              <div class="current-menu">{{ route.meta.title }}</div>
              <el-select
                v-if="SHOW_PROJ_CHANGE_PATH.includes(route.path)"
                v-model="globalState.projectId"
                @change="projectChange"
                placeholder="选择项目"
              >
                <el-option
                  v-for="item in globalState.projects"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </div>
          </el-col>
          <el-col :span="5" :offset="12">
            <div class="menu-container flex-end">
              <el-button class="custom-btn" type="primary" @click="gotoScreen"
                >主页大屏</el-button
              >
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
                    <el-dropdown-item @click="logout">退出</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </el-col>
        </el-row>
      </el-header>

      <el-main class="main-container" v-if="state.initSuccess">
        <el-scrollbar>
          <router-view />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { reactive } from "vue";
import appStore from "@/store";
import { storeToRefs } from "pinia";
import { MENU_DATA, SHOW_PROJ_CHANGE_PATH } from "@/constant";
import imgUrl from "@/assets/img/user.png";
import logoUrl from "@/assets/img/logo.png";
import logoTextUrl from "@/assets/img/logo-text.png";
import { useRoute, useRouter } from "vue-router";

const { globalState } = storeToRefs(appStore.global);
const route = useRoute();
const router = useRouter();
const defaultMenuKey = route.path;
const state = reactive({
  initSuccess: false,
});

const projectChange = (val) => {
  appStore.global.changeName(val);
};

const handleMenuClick = (item) => {
  router.push({ path: item.path });
};

const gotoScreen = () => {
  router.push({ path: "/mainA" });
};

const logout = () => {
  appStore.useUserStore.userLogout();
  router.push({ path: "/login" });
};

const init = async () => {
  // 获取项目列表
  await appStore.global.getProList();
  // 获取角色列表
  await appStore.global.getRoleList();
  state.initSuccess = true;
};
init();
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
    background-color: var(--menu-color);
    color: var(--el-text-color-primary);
  }
  .el-menu {
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
    padding: 0px 15px 10px;
  }
  .logo-container {
    height: 95px;
    padding: 15px;
    border-bottom: 1px solid #d9d9d9;
    background-color: var(--menu-color);
    border-radius: 0px 50px 0px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .header-content-container {
    padding: 15px 15px 20px;
    .menu-container {
      display: flex;
      align-items: center;
      :deep() {
        .el-select {
          .el-input__wrapper {
            background-color: var(--highlight-color) !important;
          }
          .el-input__inner,
          .el-input .el-select__caret,
          .el-input__inner::placeholder {
            color: #ffffff !important;
          }
        }
      }
    }
    .flex-end {
      justify-content: flex-end;
    }
    .current-menu {
      font-weight: 700;
      font-style: normal;
      font-size: 20px;
      color: #3142b4;
      margin-right: 15px;
    }
    .custom-btn {
      border: 2px solid rgba(43, 62, 177, 1);
      background-color: rgba(43, 62, 177, 0.2) !important;
      font-weight: 700;
      font-style: normal;
      color: #2b3eb1;
      text-align: center;
      height: 30px;
      margin-right: 15px;
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
  .main-container {
    :deep() {
      .el-scrollbar__view {
        height: 100%;
      }
    }
  }
}
</style>
