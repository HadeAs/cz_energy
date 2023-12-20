/*
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:00:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-20 10:00:10
 * @Description:
 */
export const MENU_DATA = [
  {
    name: "后台管理",
    path: "/backendMgr",
    icon: "message",
    children: [
      {
        name: "项目管理",
        path: "/projectMgr",
      },
      {
        name: "账号管理",
        path: "/accountMgr",
      },
      {
        name: "权限管理",
        path: "/authMgr",
      },
      {
        name: "系统日志管理",
        path: "/sysLogMgr",
      },
      {
        name: "平台配置",
        path: "/platformCfg",
      },
      {
        name: "通信配置",
        path: "/commCfg",
      },
    ],
  },
  {
    name: "数据统计",
    path: "/statistics",
    icon: "menu",
    children: [
      {
        name: "能碳数据",
        path: "/carbonData",
      },
      {
        name: "费用数据",
        path: "/costData",
      },
    ],
  },
  {
    name: "设备管理",
    path: "/deviceMgr",
    icon: "setting",
    children: [
      {
        name: "设备台账",
        path: "/deviceLedger",
      },
      {
        name: "设备报警",
        path: "/deviceAlarm",
      },
      {
        name: "设备组管理",
        path: "/deviceGroupMgr",
      },
      {
        name: "点位管理",
        path: "/pointMgr",
      },
      {
        name: "设备日志",
        path: "/deviceLog",
      },
    ],
  },
  {
    name: "运维管理",
    path: "/operationMgr",
    icon: "setting",
    children: [
      {
        name: "运行监测",
        path: "/workMonitor",
      },
      {
        name: "设备保养",
        path: "/deviceMaintain",
      },
    ],
  },
];
