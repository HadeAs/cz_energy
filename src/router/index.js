/*
 * @Author: Zhicheng Huang
 * @Date: 2023-12-19 18:40:40
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-26 22:17:32
 * @Description:
 */
import { createRouter, createWebHistory } from "vue-router";
import appStore from "@/store";
import BasicRouter from "./basicRouter";
import Layout from "@/layouts/index.vue";
import ScreenLayout from "@/layouts/screenLayout.vue";

const routesArray = [
  {
    path: "/",
    redirect: "/projectMgr",
    component: Layout,
    children: [
      {
        path: "/404",
        name: "404",
        hidden: true,
        component: () =>
          import(/* webpackChunkName: "404" */ "@/pages/error/404.vue"),
      },
      {
        path: "/projectMgr",
        name: "projectMgr",
        meta: { title: "项目管理", auth: "project" },
        component: () =>
          import(
            /* webpackChunkName: "projectMgr" */ "@/pages/backendMgr/projectMgr/index.vue"
          ),
      },
      {
        path: "/accountMgr",
        name: "accountMgr",
        meta: { title: "账号管理", auth: "account" },
        component: () =>
          import(
            /* webpackChunkName: "accountMgr" */ "@/pages/backendMgr/accountMgr/index.vue"
          ),
      },
      {
        path: "/authMgr",
        name: "authMgr",
        meta: { title: "权限管理", auth: "auth" },
        component: () =>
          import(
            /* webpackChunkName: "authMgr" */ "@/pages/backendMgr/authMgr/index.vue"
          ),
      },
      {
        path: "/sysLogMgr",
        name: "sysLogMgr",
        meta: { title: "系统日志管理", auth: "systemlog" },
        component: () =>
          import(
            /* webpackChunkName: "sysLogMgr" */ "@/pages/backendMgr/sysLogMgr/index.vue"
          ),
      },
      {
        path: "/platformCfg",
        name: "platformCfg",
        meta: { title: "平台配置", auth: "platform" },
        component: () =>
          import(
            /* webpackChunkName: "platformCfg" */ "@/pages/backendMgr/platformCfg/index.vue"
          ),
      },
      {
        path: "/commCfg",
        name: "commCfg",
        meta: { title: "通信配置", auth: "comm" },
        component: () =>
          import(
            /* webpackChunkName: "commCfg" */ "@/pages/backendMgr/commCfg/index.vue"
          ),
      },
      {
        path: "/carbonData",
        name: "carbonData",
        meta: { title: "能碳数据", auth: "carbon" },
        component: () =>
          import(
            /* webpackChunkName: "carbonData" */ "@/pages/statistics/carbonData/index.vue"
          ),
      },
      {
        path: "/costData",
        name: "costData",
        meta: { title: "费用数据", auth: "cost" },
        component: () =>
          import(
            /* webpackChunkName: "costData" */ "@/pages/statistics/costData/index.vue"
          ),
      },
      {
        path: "/deviceLedger",
        name: "deviceLedger",
        meta: { title: "设备台账", auth: "ledger" },
        component: () =>
          import(
            /* webpackChunkName: "deviceLedger" */ "@/pages/deviceMgr/deviceLedger/index.vue"
          ),
      },
      {
        path: "/deviceAlarm",
        name: "deviceAlarm",
        meta: { title: "设备报警", auth: "alarm" },
        component: () =>
          import(
            /* webpackChunkName: "deviceAlarm" */ "@/pages/deviceMgr/deviceAlarm/index.vue"
          ),
      },
      {
        path: "/deviceGroupMgr",
        name: "deviceGroupMgr",
        meta: { title: "设备组管理", auth: "group" },
        component: () =>
          import(
            /* webpackChunkName: "deviceGroupMgr" */ "@/pages/deviceMgr/deviceGroupMgr/index.vue"
          ),
      },
      {
        path: "/pointMgr",
        name: "pointMgr",
        meta: { title: "点位管理", auth: "point" },
        component: () =>
          import(
            /* webpackChunkName: "pointMgr" */ "@/pages/deviceMgr/pointMgr/index.vue"
          ),
      },
      {
        path: "/deviceLog",
        name: "deviceLog",
        meta: { title: "设备日志", auth: "devicelog" },
        component: () =>
          import(
            /* webpackChunkName: "deviceLog" */ "@/pages/deviceMgr/deviceLog/index.vue"
          ),
      },
      {
        path: "/workMonitor",
        name: "workMonitor",
        meta: { title: "运行监测", auth: "monitor" },
        component: () =>
          import(
            /* webpackChunkName: "workMonitor" */ "@/pages/operationMgr/workMonitor/index.vue"
          ),
      },
      {
        path: "/deviceMaintain",
        name: "deviceMaintain",
        meta: { title: "设备保养", auth: "maintain" },
        component: () =>
          import(
            /* webpackChunkName: "deviceMaintain" */ "@/pages/operationMgr/deviceMaintain/index.vue"
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
            /* webpackChunkName: "404" */ "@/pages/screen/mainA/index.vue"
          ),
      },
      {
        path: "/mainB",
        name: "MainB",
        component: () =>
          import(
            /* webpackChunkName: "404" */ "@/pages/screen/mainB/index.vue"
          ),
      },
    ],
  },
  ...BasicRouter,
];

const router = createRouter({
  history: createWebHistory(),
  routes: routesArray,
});

router.beforeEach((to, from) => {
  const userRole = appStore.global.userRole;
  const roleAuth = appStore.global.roleAuth;
  const whitelist = ["404", "Login", "MainA", "MainB"];
  if (whitelist.includes(to.name)) {
    return true;
  }
  //没有页面权限且不是超级管理员
  if (!roleAuth.includes(to.meta.auth) && userRole !== "1") {
    return {
      path: "/404",
    };
  }
});

export default router;
