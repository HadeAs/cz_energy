/*
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:00:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-22 16:40:06
 * @Description:
 */
export const SHOW_PROJ_CHANGE_PATH = [
  "/carbonData",
  "/costData",
  "workMonitor",
  "/deviceMaintain",
];
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

const minValue = 10;
const colorArr = ["#55c5f7", "#95d2f6", "#f9bf00", "#fa5555", "#6666ff"];
export const COMMON_ECHART_OPTION = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },
  legend: {
    data: [],
    top: 12,
    right: 24,
  },
  grid: {
    left: "24",
    right: "24",
    bottom: "24",
    top: "40",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: new Array(13).fill("").map((v, i) => `${i}:00`),
      axisLine: {
        lineStyle: {
          color: "#cad3e2",
        },
      },
      axisLabel: {
        color: "#2D2F33",
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      name: "单位：kWh",
      nameTextStyle: {
        color: "#2D2F33",
        fontSize: 14,
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#cad3e2",
        },
      },
      axisLabel: {
        color: "#2D2F33",
      },
      splitLine: {
        show: false,
      },
      min: minValue,
    },
  ],
  series: [],
  color: colorArr,
};

export const CARBON_CATEGORY_DATA = [
  {
    id: 1,
    label: "用电量",
    children: [
      {
        id: 8,
        label: "空调系统",
      },
      {
        id: 9,
        label: "动力系统",
      },
      {
        id: 10,
        label: "照明插座",
      },
      {
        id: 11,
        label: "特殊用电",
      },
    ],
  },
  {
    id: 2,
    label: "用气量",
    children: [
      {
        id: 12,
        label: "食堂用气",
      },
      {
        id: 13,
        label: "供热用气",
      },
      {
        id: 14,
        label: "供冷用气",
      },
      {
        id: 15,
        label: "生活热水用气",
      },
    ],
  },
  {
    id: 3,
    label: "用水量",
    children: [],
  },
  {
    id: 4,
    label: "热水量",
    children: [
      {
        id: 16,
        label: "生活热水量",
      },
    ],
  },
  {
    id: 5,
    label: "供冷量",
    children: [],
  },
  {
    id: 6,
    label: "供热量",
    children: [],
  },
  {
    id: 7,
    label: "可再生能源",
    children: [
      {
        id: 17,
        label: "光伏",
      },
      {
        id: 18,
        label: "风力发电",
      },
    ],
  },
];
