/*
 * @Author: Zhicheng Huang
 * @Date: 2023-12-19 18:40:40
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-16 22:48:20
 * @Description:
 */
import { createRouter, createWebHistory } from "vue-router";
import appStore from "@/store";
import BasicRouter from "./basicRouter";
import Layout from "@/layouts/index.vue";
import ScreenLayout from "@/layouts/screenLayout.vue";
import { checkToken, logout } from "@/api/login";

const routesArray = [
  {
    path: "/",
    redirect: "/projectMgr",
    component: Layout,
    children: [
      {
        path: "/401",
        name: "401",
        hidden: true,
        component: () =>
          import(/* webpackChunkName: "401" */ "@/pages/error/401.vue"),
      },
      {
        path: "/projectMgr",
        name: "projectMgr",
        meta: { title: "项目管理", auth: 20 },
        component: () =>
          import(
            /* webpackChunkName: "projectMgr" */ "@/pages/backendMgr/projectMgr/index.vue"
          ),
      },
      {
        path: "/accountMgr",
        name: "accountMgr",
        meta: { title: "账号管理", auth: 21 },
        component: () =>
          import(
            /* webpackChunkName: "accountMgr" */ "@/pages/backendMgr/accountMgr/index.vue"
          ),
      },
      {
        path: "/authMgr",
        name: "authMgr",
        meta: { title: "权限管理", auth: 22 },
        component: () =>
          import(
            /* webpackChunkName: "authMgr" */ "@/pages/backendMgr/authMgr/index.vue"
          ),
      },
      {
        path: "/sysLogMgr",
        name: "sysLogMgr",
        meta: { title: "系统日志管理", auth: 23 },
        component: () =>
          import(
            /* webpackChunkName: "sysLogMgr" */ "@/pages/backendMgr/sysLogMgr/index.vue"
          ),
      },
      {
        path: "/platformCfg",
        name: "platformCfg",
        meta: { title: "平台配置", auth: 25 },
        component: () =>
          import(
            /* webpackChunkName: "platformCfg" */ "@/pages/backendMgr/platformCfg/index.vue"
          ),
      },
      {
        path: "/commCfg",
        name: "commCfg",
        meta: { title: "通信配置", auth: 24 },
        component: () =>
          import(
            /* webpackChunkName: "commCfg" */ "@/pages/backendMgr/commCfg/index.vue"
          ),
      },
      {
        path: "/carbonData",
        name: "carbonData",
        meta: { title: "能源数据", auth: 30 },
        component: () =>
          import(
            /* webpackChunkName: "carbonData" */ "@/pages/statistics/carbonData/index.vue"
          ),
      },
      {
        path: "/costData",
        name: "costData",
        meta: { title: "费用数据", auth: 31 },
        component: () =>
          import(
            /* webpackChunkName: "costData" */ "@/pages/statistics/costData/index.vue"
          ),
      },
      {
        path: "/deviceLedger",
        name: "deviceLedger",
        meta: { title: "设备台账", auth: 10 },
        component: () =>
          import(
            /* webpackChunkName: "deviceLedger" */ "@/pages/deviceMgr/deviceLedger/index.vue"
          ),
      },
      {
        path: "/deviceAlarm",
        name: "deviceAlarm",
        meta: { title: "设备报警", auth: 13 },
        component: () =>
          import(
            /* webpackChunkName: "deviceAlarm" */ "@/pages/deviceMgr/deviceAlarm/index.vue"
          ),
      },
      {
        path: "/deviceGroupMgr",
        name: "deviceGroupMgr",
        meta: { title: "设备组管理", auth: 11 },
        component: () =>
          import(
            /* webpackChunkName: "deviceGroupMgr" */ "@/pages/deviceMgr/deviceGroupMgr/index.vue"
          ),
      },
      {
        path: "/pointMgr",
        name: "pointMgr",
        meta: { title: "点位管理", auth: 12 },
        component: () =>
          import(
            /* webpackChunkName: "pointMgr" */ "@/pages/deviceMgr/pointMgr/index.vue"
          ),
      },
      {
        path: "/deviceLog",
        name: "deviceLog",
        meta: { title: "设备日志", auth: 14 },
        component: () =>
          import(
            /* webpackChunkName: "deviceLog" */ "@/pages/deviceMgr/deviceLog/index.vue"
          ),
      },
      {
        path: "/workMonitor",
        name: "workMonitor",
        meta: { title: "运行监测", auth: 40 },
        component: () =>
          import(
            /* webpackChunkName: "workMonitor" */ "@/pages/operationMgr/workMonitor/index.vue"
          ),
      },
      {
        path: "/deviceMaintain",
        name: "deviceMaintain",
        meta: { title: "设备保养", auth: 41 },
        component: () =>
          import(
            /* webpackChunkName: "deviceMaintain" */ "@/pages/operationMgr/deviceMaintain/index.vue"
          ),
      },
      {
        path: "/carbonEmission",
        name: "carbonEmission",
        meta: { title: "碳排放", auth: "emission" },
        component: () =>
          import(
            /* webpackChunkName: "deviceMaintain" */ "@/pages/buildCarbonMgr/emission/index.vue"
          ),
      },
      {
        path: "/carbonReduction",
        name: "carbonReduction",
        meta: { title: "碳减排", auth: "reduction" },
        component: () =>
          import(
            /* webpackChunkName: "deviceMaintain" */ "@/pages/buildCarbonMgr/reduction/index.vue"
          ),
      },
      {
        path: "/carbonNeutral",
        name: "carbonNeutral",
        meta: { title: "碳中和", auth: "neutral" },
        component: () =>
          import(
            /* webpackChunkName: "deviceMaintain" */ "@/pages/buildCarbonMgr/neutral/index.vue"
          ),
      },
    ],
  },
  {
    path: "/screen",
    redirect: "/mainA",
    component: ScreenLayout,
    children: [
      {
        path: "/mainA",
        name: "MainA",
        component: () =>
          import(
            /* webpackChunkName: "MainA" */ "@/pages/screen/mainA/index.vue"
          ),
      },
      {
        path: "/mainB",
        name: "MainB",
        component: () =>
          import(
            /* webpackChunkName: "MainB" */ "@/pages/screen/mainB/index.vue"
          ),
      },
    ],
  },
  ...BasicRouter,
  {
    path: "/:pathMatch(.*)",
    component: () =>
      import(/* webpackChunkName: "404" */ "@/pages/error/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routesArray,
});

// 碳建筑暂时放开
const temporaryWhiteList = ["carbonEmission", "carbonReduction", "carbonNeutral"]

router.beforeEach(async (to, from) => {
  const whitelist = ["401", "404", "Login", "MainA", "MainB", ...temporaryWhiteList, ...BasicRouter.map(item => item.name)];
  if (whitelist.includes(to.name)) {
    if (to.name === "Login") {
      logout();
    }
    return true;
  }
  const { code, data } = await checkToken();
  // 判断是否有 Token，没有重定向到 login 页面
  if (code !== 200) {
    appStore.useUserStore.clear();
    return { path: "/login", replace: true };
  }
  appStore.useUserStore.setUserInfo(data.data);
  if (!appStore.global.globalState.authInit) {
    await appStore.global.getResources();
  }
  //没有页面权限
  const roleAuth = appStore.global.globalState.authList;
  if (roleAuth.length && !roleAuth.includes(to.meta.auth)) {
    return {
      path: "/401",
    };
  }
  return true;
});

export default router;
