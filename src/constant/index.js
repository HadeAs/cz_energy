/*
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:00:59
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-15 01:40:54
 * @Description:
 */
export const SHOW_PROJ_CHANGE_PATH = [
  "/carbonData",
  "/costData",
  "workMonitor",
  "/deviceMaintain",
  "/workMonitor",
];
export const MENU_DATA = [
  {
    name: "后台管理",
    path: "/backendMgr",
    icon: "aidicon aidicon-widgets",
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
    icon: "aidicon aidicon-file-chart",
    children: [
      {
        name: "能源数据",
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
    icon: "aidicon aidicon-settings-box",
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
    icon: "aidicon aidicon-dropbox",
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
  {
    name: "建筑碳管理",
    path: "/buildCarbonMgr",
    icon: "aidicon aidicon-dropbox",
    children: [
      {
        name: "碳排放",
        path: "/carbonEmission",
      },
      {
        name: "碳减排",
        path: "/carbonReduction",
      },
      {
        name: "碳中和",
        path: "/carbonNeutral",
      },
    ],
  },
];

const minValue = 10;
const colorArr = ["#2DB7F5", "#7DC856", "#F9BF00", "#FA5555", "#6666FF"];
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
      data: [],
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
        padding: [0, 0, 0, 30]
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
        unit: "kWh"
      },
      {
        id: 9,
        label: "动力系统",
        unit: "kWh"
      },
      {
        id: 10,
        label: "照明插座",
        unit: "kWh"
      },
      {
        id: 11,
        label: "特殊用电",
        unit: "kWh"
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
        unit: "m³"
      },
      {
        id: 13,
        label: "供热用气",
        unit: "m³"
      },
      {
        id: 14,
        label: "供冷用气",
        unit: "m³"
      },
      {
        id: 15,
        label: "生活热水用气",
        unit: "m³"
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
        unit: "m³"
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
        unit: "kWh"
      },
      {
        id: 18,
        label: "风力发电",
        unit: "kWh"
      },
    ],
  },
];

export const DEVICE_CATEGORY_DATA = [
  {
    id: 1,
    label: "空调系统设备",
    children: [
      {
        id: 6,
        label: "主机用电量",
      },
      {
        id: 7,
        label: "冷冻水泵用电量",
      },
      {
        id: 8,
        label: "冷却水泵用电量",
      },
      {
        id: 9,
        label: "冷却塔用电量",
      },
      {
        id: 10,
        label: "空调箱用电量",
      },
    ],
  },
  {
    id: 2,
    label: "照明插座设备",
    children: [
      {
        id: 11,
        label: "照明用电量",
      },
      {
        id: 12,
        label: "插座用电量",
      },
    ],
  },
  {
    id: 3,
    label: "动力设备",
    children: [
      {
        id: 13,
        label: "电梯用电量",
      },
      {
        id: 14,
        label: "水泵用电量",
      },
      {
        id: 15,
        label: "通风机用电量",
      },
    ],
  },
  {
    id: 4,
    label: "特殊用电设备",
    children: [
      {
        id: 16,
        label: "信息中心",
      },
      {
        id: 17,
        label: "食堂用电量",
      },
    ],
  },
  {
    id: 5,
    label: "燃气",
    children: [
      {
        id: 18,
        label: "燃气锅炉",
      },
      {
        id: 19,
        label: "厨具",
      },
      {
        id: 19,
        label: "厨具1",
      },
    ],
  },
];

export const CHARGE_CATEGORY_DATA = [
  {
    id: 1,
    label: "总费用",
    children: [
      {
        id: 2,
        label: "电费",
      },
      {
        id: 3,
        label: "燃气费",
      },
      {
        id: 4,
        label: "水费",
      },
    ],
  },
];

export const BUILD_TYPE = [
  { label: "办公建筑", value: 1 },
  { label: "商场建筑", value: 2 },
  { label: "宾馆饭店建筑", value: 3 },
  { label: "文化教育建筑", value: 4 },
  { label: "医疗卫生建筑", value: 5 },
  { label: "体育建筑", value: 6 },
];

export const WORK_SYSTEM = [
  { label: "照明插座用电", value: 1 },
  { label: "空调用电", value: 2 },
  { label: "动力用电", value: 3 },
  { label: "特殊用电", value: 4 },
  { label: "市政给水", value: 5 },
];

export const LOCK_STATUS = [
  { label: "正常", value: 0 },
  { label: "锁定", value: 1 },
];

export const COMMON_ROLE = [
  { label: "超级管理员", value: "1" },
  { label: "企业管理员", value: "2" },
  { label: "一般用户", value: "3" },
  { label: "远程监管用户", value: "4" },
];

export const VARIABLE_TYPE = [
  { label: "用水", value: "1" },
  { label: "用电", value: "2" },
  { label: "用气", value: "3" },
];

// 权限点，暂时写死
export const AUTH_POINT_CONFIG = [
  {
    key: 1,
    label: "后台管理",
    disabled: true,
    children: [
      {
        key: 11,
        label: "项目管理",
        type: "page",
        children: [
          { key: 111, label: "新增", type: "component" },
          { key: 112, label: "编辑", type: "component" },
          { key: 113, label: "删除", type: "component" },
          { key: 114, label: "批量删除", type: "component" },
          { key: 115, label: "项目图片", type: "component" },
          { key: 116, label: "费用配置", type: "component" },
        ],
      },
      {
        key: 12,
        label: "账号管理",
        type: "page",
        children: [
          { key: 121, label: "新增", type: "component" },
          { key: 122, label: "编辑", type: "component" },
          { key: 123, label: "删除", type: "component" },
        ],
      },
      {
        key: 13,
        label: "权限管理",
        type: "page",
        children: [
          { key: 131, label: "新增", type: "component" },
          { key: 132, label: "编辑", type: "component" },
          { key: 133, label: "删除", type: "component" },
          { key: 134, label: "批量删除", type: "component" },
          { key: 135, label: "分配", type: "component" },
        ],
      },
      {
        key: 14,
        label: "系统日志管理",
        type: "page",
        children: [
          {
            key: 141,
            label: "登陆日志_搜索",
            type: "component",
          },
          {
            key: 142,
            label: "用户操作日志_搜索",
            type: "component",
          },
          {
            key: 143,
            label: "报警信息日志_搜索",
            type: "component",
          },
        ],
      },
      {
        key: 15,
        label: "平台配置",
        type: "page",
        children: [
          {
            key: 151,
            label: "单位管理_新增",
            type: "component",
          },
          {
            key: 152,
            label: "单位管理_编辑",
            type: "component",
          },
          {
            key: 153,
            label: "单位管理_删除",
            type: "component",
          },
          {
            key: 154,
            label: "变量管理_新增",
            type: "component",
          },
          {
            key: 155,
            label: "变量管理_编辑",
            type: "component",
          },
          {
            key: 156,
            label: "变量管理_删除",
            type: "component",
          },
          {
            key: 157,
            label: "建筑类型管理_新增",
            type: "component",
          },
          {
            key: 158,
            label: "建筑类型管理_删除",
            type: "component",
          },
          {
            key: 159,
            label: "用能系统分类管理_新增",
            type: "component",
          },
          {
            key: 1510,
            label: "用能系统分类管理_删除",
            type: "component",
          },
        ],
      },
      {
        key: 16,
        label: "通信配置",
        type: "page",
        children: [
          { key: 161, label: "新增", type: "component" },
          { key: 162, label: "编辑", type: "component" },
          { key: 163, label: "删除", type: "component" },
        ],
      },
    ],
  },
  {
    key: 2,
    label: "数据统计",
    disabled: true,
    children: [
      {
        key: 21,
        label: "能源数据",
        type: "page",
        children: [
          {
            key: 211,
            label: "历史数据_导出",
            type: "component",
          },
          {
            key: 212,
            label: "单类设备数据_导出",
            type: "component",
          },
        ],
      },
      {
        key: 22,
        label: "费用数据",
        type: "page",
        children: [
          {
            key: 221,
            label: "费用对比_导出",
            type: "component",
          },
          {
            key: 222,
            label: "费用明细_批量导出",
            type: "component",
          },
        ],
      },
    ],
  },
  {
    key: 3,
    label: "设备管理",
    disabled: true,
    children: [
      {
        key: 31,
        label: "设备台账",
        type: "page",
        children: [
          { key: 311, label: "新增", type: "component" },
          { key: 312, label: "编辑", type: "component" },
          { key: 313, label: "删除", type: "component" },
          { key: 314, label: "批量导入", type: "component" },
        ],
      },
      {
        key: 32,
        label: "设备报警",
        type: "page",
        children: [
          {
            key: 321,
            label: "实时报警_新增",
            type: "component",
          },
          {
            key: 322,
            label: "实时报警_立即处理",
            type: "component",
          },
          {
            key: 323,
            label: "实时报警_批量导出",
            type: "component",
          },
          {
            key: 324,
            label: "实时报警_搜索",
            type: "component",
          },
          {
            key: 325,
            label: "运行报警_数据补录",
            type: "component",
          },
          {
            key: 326,
            label: "运行报警_搜索",
            type: "component",
          },
        ],
      },
      {
        key: 33,
        label: "设备组管理",
        type: "page",
        children: [
          {
            key: 331,
            label: "设备组管理_回收站",
            type: "component",
          },
          {
            key: 332,
            label: "设备组管理_新增",
            type: "component",
          },
          {
            key: 333,
            label: "设备组管理_编辑",
            type: "component",
          },
          {
            key: 334,
            label: "设备组管理_删除",
            type: "component",
          },
          {
            key: 335,
            label: "设备组管理_批量删除",
            type: "component",
          },
          {
            key: 336,
            label: "设备组管理_关联设备参数",
            type: "component",
          },
          {
            key: 337,
            label: "设备运行_批量导出",
            type: "component",
          },
          {
            key: 338,
            label: "设备运行_回收站_恢复",
            type: "component",
          },
          {
            key: 339,
            label: "设备运行_删除",
            type: "component",
          },
        ],
      },
      {
        key: 34,
        label: "点位管理",
        type: "page",
        children: [
          { key: 341, label: "新增", type: "component" },
          { key: 342, label: "编辑", type: "component" },
          { key: 343, label: "删除", type: "component" },
          { key: 344, label: "批量删除", type: "component" },
        ],
      },
      {
        key: 35,
        label: "设备日志",
        type: "page",
        children: [
          {
            key: 351,
            label: "批量导出",
            type: "component",
          },
        ],
      },
    ],
  },
  {
    key: 4,
    label: "运维管理",
    disabled: true,
    children: [
      {
        key: 41,
        label: "运行监测",
        type: "page",
        children: [
          {
            key: 411,
            label: "配电监测_导出",
            type: "component",
          },
          {
            key: 412,
            label: "用水监测_导出",
            type: "component",
          },
          {
            key: 413,
            label: "用水异常_搜索",
            type: "component",
          },
          {
            key: 414,
            label: "用水异常_立即处理",
            type: "component",
          },
        ],
      },
      {
        key: 42,
        label: "设备保养",
        type: "page",
        children: [
          { key: 421, label: "编辑", type: "component" },
          { key: 422, label: "详情", type: "component" },
          {
            key: 423,
            label: "单个设备_详情",
            type: "component",
          },
          {
            key: 424,
            label: "单个设备_保养",
            type: "component",
          },
          {
            key: 425,
            label: "单个设备_添加保养计划",
            type: "component",
          },
          {
            key: 426,
            label: "单个设备_编辑5年保养计划",
            type: "component",
          },
          {
            key: 427,
            label: "单个设备_上传文件",
            type: "component",
          },
        ],
      },
    ],
  },
];

export const ALARM_LEVELS = [
  { id: 1, name: "一级" },
  { id: 2, name: "二级" },
  { id: 3, name: "三级" },
];

export const DEVICE_STATUS = [
  { id: true, name: "启用" },
  { id: false, name: "停用" },
];

export const COMMON_DATE_FORMAT = "YYYY-MM-DD";
export const COMMON_DATE_TIME_FORMAT = `${COMMON_DATE_FORMAT} hh:mm:ss`;

export const COMMON_IMAGE_TYPES = ['.jpg', '.jpeg', '.png', '.bmp', '.JPG', '.JPEG', '.PNG', '.BMP', '.gif', '.GIF'];

export const COMMON_FILE_TYPES = ['.rar', '.zip', '.doc', '.docx'];
