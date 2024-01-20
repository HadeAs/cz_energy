/*
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:00:59
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-20 13:10:50
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
    key: "backend",
    label: "后台管理",
    disabled: true,
    children: [
      {
        key: "project",
        label: "项目管理",
        authKey: 20,
        type: "page",
        children: [
          { key: "project_add", authKey: 201, label: "新增", type: "component" },
          { key: "project_edit", authKey: 201, label: "编辑", type: "component" },
          { key: "project_delete", authKey: 202, label: "删除", type: "component" },
          { key: "project_batch_delete", label: "批量删除", type: "component" },
          { key: "project_upload_img", authKey: 205, label: "项目图片", type: "component" },
          { key: "project_price_config", authKey: 204, label: "费用配置", type: "component" },
          { key: "project_search", authKey: 203, label: "查询项目", type: "component" },
        ],
      },
      {
        key: "account",
        label: "账号管理",
        authKey: 21,
        type: "page",
        children: [
          { key: "account_add", authKey: 211, label: "新增", type: "component" },
          { key: "account_edit", authKey: 211, label: "编辑", type: "component" },
          { key: "account_delete", authKey: 213, label: "删除", type: "component" },
          { key: "account_search", authKey: 212, label: "查询", type: "component" },
        ],
      },
      {
        key: "auth",
        label: "权限管理",
        authKey: 22,
        type: "page",
        children: [
          { key: "auth_add", authKey: 221, label: "新增", type: "component" },
          { key: "auth_edit", authKey: 221, label: "编辑", type: "component" },
          { key: "auth_delete", authKey: 224, label: "删除", type: "component" },
          { key: "auth_batch_delete", label: "批量删除", type: "component" },
          { key: "auth_distribute", authKey: 223, label: "分配", type: "component" },
          { key: "auth_search", authKey: 222, label: "查询", type: "component" },
        ],
      },
      {
        key: "systemlog",
        label: "系统日志管理",
        authKey: 23,
        type: "page",
        children: [
          {
            key: "systemlog_login_search",
            authKey: 231,
            label: "登陆日志_搜索",
            type: "component",
          },
          {
            key: "systemlog_operation_search",
            authKey: 232,
            label: "用户操作日志_搜索",
            type: "component",
          },
          {
            key: "systemlog_alarm_search",
            authKey: 233,
            label: "报警信息日志_搜索",
            type: "component",
          },
        ],
      },
      {
        key: "platform",
        label: "平台配置",
        authKey: 25,
        type: "page",
        children: [
          {
            key: "platform_unit",
            authKey: 251,
            label: "单位管理",
            type: "component",
          },
          {
            key: "platform_unit_add",
            label: "单位管理_新增",
            type: "component",
          },
          {
            key: "platform_unit_edit",
            label: "单位管理_编辑",
            type: "component",
          },
          {
            key: "platform_unit_delete",
            label: "单位管理_删除",
            type: "component",
          },
          {
            key: "platform_variable",
            authKey: 253,
            label: "变量管理",
            type: "component",
          },
          {
            key: "platform_variable_add",
            label: "变量管理_新增",
            type: "component",
          },
          {
            key: "platform_variable_edit",
            label: "变量管理_编辑",
            type: "component",
          },
          {
            key: "platform_variable_delete",
            label: "变量管理_删除",
            type: "component",
          },
          {
            key: "platform_build",
            authKey: 254,
            label: "建筑类型管理",
            type: "component",
          },
          {
            key: "platform_build_add",
            label: "建筑类型管理_新增",
            type: "component",
          },
          {
            key: "platform_build_delete",
            label: "建筑类型管理_删除",
            type: "component",
          },
          {
            key: "platform_energy",
            authKey: 252,
            label: "用能系统分类管理",
            type: "component",
          },
          {
            key: "platform_energy_add",
            label: "用能系统分类管理_新增",
            type: "component",
          },
          {
            key: "platform_energy_delete",
            label: "用能系统分类管理_删除",
            type: "component",
          },
        ],
      },
      {
        key: "comm",
        label: "通信配置",
        authKey: 24,
        type: "page",
        children: [
          { key: "comm_add", authKey: 242, label: "新增", type: "component" },
          { key: "comm_edit", authKey: 242, label: "编辑", type: "component" },
          { key: "comm_delete", authKey: 243, label: "删除", type: "component" },
          { key: "comm_search", authKey: 241, label: "查询", type: "component" },
        ],
      },
    ],
  },
  {
    key: "statistics",
    label: "数据统计",
    disabled: true,
    children: [
      {
        key: "carbon",
        label: "能源数据",
        authKey: 30,
        type: "page",
        children: [
          {
            key: "carbon_history_search",
            authKey: 302,
            label: "历史数据_查询",
            type: "component",
          },
          {
            key: "carbon_history_export",
            authKey: 303,
            label: "历史数据_导出",
            type: "component",
          },
          {
            key: "carbon_device_search",
            authKey: 302,
            label: "单类设备数据_查询",
            type: "component",
          },
          {
            key: "carbon_device_export",
            authKey: 304,
            label: "单类设备数据_导出",
            type: "component",
          },
        ],
      },
      {
        key: "cost",
        label: "费用数据",
        authKey: 31,
        type: "page",
        children: [
          {
            key: "cost_compare_search",
            authKey: 311,
            label: "费用对比_查询",
            type: "component",
          },
          {
            key: "cost_compare_export",
            authKey: 312,
            label: "费用对比_导出",
            type: "component",
          },
          {
            key: "cost_detail_batch_export",
            label: "费用明细_批量导出",
            type: "component",
          },
        ],
      },
    ],
  },
  {
    key: "device",
    label: "设备管理",
    disabled: true,
    children: [
      {
        key: "ledger",
        label: "设备台账",
        authKey: 10,
        type: "page",
        children: [
          { key: "ledger_add", authKey: 101, label: "新增", type: "component" },
          { key: "ledger_edit", authKey: 101, label: "编辑", type: "component" },
          { key: "ledger_delete", authKey: 102, label: "删除", type: "component" },
          { key: "ledger_batch_import", authKey: 103, label: "批量导出", type: "component" },
          { key: "ledger_search", authKey: 104, label: "查询搜索设备台账", type: "component" },
        ],
      },
      {
        key: "alarm",
        label: "设备报警",
        type: "page",
        authKey: 13,
        children: [
          {
            key: "alarm_actual_add",
            authKey: 135,
            label: "实时报警_新增",
            type: "component",
          },
          {
            key: "alarm_actual_deal",
            authKey: 132,
            label: "实时报警_立即处理",
            type: "component",
          },
          {
            key: "alarm_actual_batch_export",
            label: "实时报警_批量导出",
            type: "component",
          },
          {
            key: "alarm_actual_search",
            authKey: 131,
            label: "实时报警_搜索",
            type: "component",
          },
          {
            key: "alarm_work_add",
            label: "运行报警_数据补录",
            type: "component",
          },
          {
            key: "alarm_work_search",
            authKey: 134,
            label: "运行报警_搜索",
            type: "component",
          },
        ],
      },
      {
        key: "group",
        label: "设备组管理",
        type: "page",
        authKey: 11,
        children: [
          {
            key: "group_index_add",
            authKey: 111,
            label: "设备组管理_新增",
            type: "component",
          },
          {
            key: "group_index_edit",
            authKey: 111,
            label: "设备组管理_编辑",
            type: "component",
          },
          {
            key: "group_index_delete",
            authKey: 112,
            label: "设备组管理_删除",
            type: "component",
          },
          {
            key: "group_index_batch_delete",
            authKey: 114,
            label: "设备组管理_批量删除",
            type: "component",
          },
          {
            key: "group_index_search",
            authKey: 115,
            label: "设备组管理_查询搜索设备",
            type: "component",
          },
          {
            key: "group_index_connect",
            authKey: 116,
            label: "设备组管理_关联设备参数",
            type: "component",
          },
          {
            key: "group_work_batch_export",
            authKey: 113,
            label: "设备运行_批量导出",
            type: "component",
          },
          {
            key: "group_work_recycle",
            label: "设备运行_回收站",
            type: "component",
          },
          {
            key: "group_work_recycle_restore",
            label: "设备运行_回收站_恢复",
            type: "component",
          },
          {
            key: "group_work_delete",
            label: "设备运行_删除",
            type: "component",
          },
        ],
      },
      {
        key: "point",
        label: "点位管理",
        authKey: 12,
        type: "page",
        children: [
          { key: "point_add", authKey: 121, label: "新增", type: "component" },
          { key: "point_edit", authKey: 121, label: "编辑", type: "component" },
          { key: "point_delete", authKey: 122, label: "删除", type: "component" },
          { key: "point_batch_delete", authKey: 123, label: "批量删除", type: "component" },
        ],
      },
      {
        key: "devicelog",
        label: "设备日志",
        authKey: 14,
        type: "page",
        children: [
          {
            key: "devicelog_batch_export",
            authKey: 142,
            label: "批量导出",
            type: "component",
          },
          {
            key: "devicelog_export",
            authKey: 141,
            label: "查询",
            type: "component",
          },
        ],
      },
    ],
  },
  {
    key: "operation",
    label: "运维管理",
    disabled: true,
    children: [
      {
        key: "monitor",
        label: "运行监测",
        authKey: 40,
        type: "page",
        children: [
          {
            key: "monitor_electric_export",
            label: "配电监测_导出",
            type: "component",
          },
          {
            key: "monitor_water_export",
            label: "用水监测_导出",
            type: "component",
          },
          {
            key: "monitor_exception_search",
            label: "用水异常_搜索",
            type: "component",
          },
          {
            key: "monitor_exception_deal",
            label: "用水异常_立即处理",
            type: "component",
          },
        ],
      },
      {
        key: "maintain",
        label: "设备保养",
        authKey: 41,
        type: "page",
        children: [
          { key: "maintain_search", authKey: 411, label: "查询", type: "component" },
          { key: "maintain_edit", label: "编辑", type: "component" },
          { key: "maintain_detail", label: "详情", type: "component" },
          {
            key: "maintain_device_detail",
            label: "单个设备_详情",
            type: "component",
          },
          {
            key: "maintain_device_maintenance",
            label: "单个设备_保养",
            type: "component",
          },
          {
            key: "maintain_device_add",
            label: "单个设备_添加保养计划",
            type: "component",
          },
          {
            key: "maintain_device_upload",
            label: "单个设备_上传文件",
            type: "component",
          },
          {
            key: "maintain_device_edit",
            label: "5年保养计划_编辑",
            type: "component",
          },
          {
            key: "maintain_device_plan_get",
            // authKey: 412,
            label: "获取某型号的最新保养计划",
            type: "component",
          },
          {
            key: "maintain_device_plan_delete",
            // authKey: 413,
            label: "删除一个保养计划",
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
export const COMMON_DATE_TIME_FORMAT = `${COMMON_DATE_FORMAT} HH:mm:ss`;

export const COMMON_IMAGE_TYPES = ['.jpg', '.jpeg', '.png', '.bmp', '.JPG', '.JPEG', '.PNG', '.BMP', '.gif', '.GIF'];

export const COMMON_FILE_TYPES = ['.rar', '.zip', '.doc', '.docx'];

export const COMMON_FUNCTION_LIST = [
  { id: "null", name: "无" },
  { id: "sum", name: "求和" },
  { id: "avg", name: "均值" },
  { id: "max", name: "最大值" },
  { id: "min", name: "最小值" },
];

export const COMMON_TIME_TYPE_LIST = [
  // { id: "hour", name: "时能耗"},
  { id: "day", name: "天能耗" },
  { id: "month", name: "月能耗" },
  { id: "year", name: "年能耗" }
]