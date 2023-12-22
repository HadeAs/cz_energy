/*
 * @Author: Zhicheng Huang
 * @Date: 2023-12-19 18:40:40
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-20 10:04:46
 * @Description:
 */
import { createRouter, createWebHistory } from "vue-router";
import BasicRouter from "./basicRouter";
import Layout from "@/layouts/index.vue";
import ScreenLayout from "@/layouts/screenLayout.vue"

const routesArray = [
  {
    path: "/",
    redirect: "/projectMgr",
    component: Layout,
    children: [
      {
        path: "/projectMgr",
        name: "projectMgr",
        component: () =>
          import(
            /* webpackChunkName: "projectMgr" */ "@/pages/backendMgr/projectMgr/index.vue"
          ),
      },
      {
        path: "/accountMgr",
        name: "accountMgr",
        component: () =>
          import(
            /* webpackChunkName: "accountMgr" */ "@/pages/backendMgr/accountMgr/index.vue"
          ),
      },
      {
        path: "/authMgr",
        name: "authMgr",
        component: () =>
          import(
            /* webpackChunkName: "authMgr" */ "@/pages/backendMgr/authMgr/index.vue"
          ),
      },
      {
        path: "/sysLogMgr",
        name: "sysLogMgr",
        component: () =>
          import(
            /* webpackChunkName: "sysLogMgr" */ "@/pages/backendMgr/sysLogMgr/index.vue"
          ),
      },
      {
        path: "/platformCfg",
        name: "platformCfg",
        component: () =>
          import(
            /* webpackChunkName: "platformCfg" */ "@/pages/backendMgr/platformCfg/index.vue"
          ),
      },
      {
        path: "/commCfg",
        name: "commCfg",
        component: () =>
          import(
            /* webpackChunkName: "commCfg" */ "@/pages/backendMgr/commCfg/index.vue"
          ),
      },
      {
        path: "/carbonData",
        name: "carbonData",
        component: () =>
          import(
            /* webpackChunkName: "carbonData" */ "@/pages/statistics/carbonData/index.vue"
          ),
      },
      {
        path: "/costData",
        name: "costData",
        component: () =>
          import(
            /* webpackChunkName: "costData" */ "@/pages/statistics/costData/index.vue"
          ),
      },
      {
        path: "/deviceLedger",
        name: "deviceLedger",
        component: () =>
          import(
            /* webpackChunkName: "deviceLedger" */ "@/pages/deviceMgr/deviceLedger/index.vue"
          ),
      },
      {
        path: "/deviceAlarm",
        name: "deviceAlarm",
        component: () =>
          import(
            /* webpackChunkName: "deviceAlarm" */ "@/pages/deviceMgr/deviceAlarm/index.vue"
          ),
      },
      {
        path: "/deviceGroupMgr",
        name: "deviceGroupMgr",
        component: () =>
          import(
            /* webpackChunkName: "deviceGroupMgr" */ "@/pages/deviceMgr/deviceGroupMgr/index.vue"
          ),
      },
      {
        path: "/pointMgr",
        name: "pointMgr",
        component: () =>
          import(
            /* webpackChunkName: "pointMgr" */ "@/pages/deviceMgr/pointMgr/index.vue"
          ),
      },
      {
        path: "/deviceLog",
        name: "deviceLog",
        component: () =>
          import(
            /* webpackChunkName: "deviceLog" */ "@/pages/deviceMgr/deviceLog/index.vue"
          ),
      },
      {
        path: "/workMonitor",
        name: "workMonitor",
        component: () =>
          import(
            /* webpackChunkName: "workMonitor" */ "@/pages/operationMgr/workMonitor/index.vue"
          ),
      },
      {
        path: "/deviceMaintain",
        name: "deviceMaintain",
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
          import(/* webpackChunkName: "404" */ "@/pages/screen/mainA/index.vue"),
      },
      {
        path: "/mainB",
        name: "MainB",
        component: () =>
          import(/* webpackChunkName: "404" */ "@/pages/screen/mainB/index.vue"),
      },
    ]
  },
  ...BasicRouter,
];

const router = createRouter({
  history: createWebHistory(),
  routes: routesArray,
});

export default router;
