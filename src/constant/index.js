/*
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:00:59
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-27 16:22:56
 * @Description:
 */
import Device from "@/assets/svg/device.svg";
import Backend from "@/assets/svg/backend.svg";
import Operation from "@/assets/svg/operation.svg";
import Statistics from "@/assets/svg/statistics.svg";

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
    icon: Backend,
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
    icon: Statistics,
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
    icon: Device,
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
    icon: Operation,
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
  { label: "办公建筑", value: "1" },
  { label: "商场建筑", value: "2" },
  { label: "宾馆饭店建筑", value: "3" },
  { label: "文化教育建筑", value: "4" },
  { label: "医疗卫生建筑", value: "5" },
  { label: "体育建筑", value: "6" },
];

export const WORK_SYSTEM = [
  { label: "照明插座用电", value: "1" },
  { label: "空调用电", value: "2" },
  { label: "动力用电", value: "3" },
  { label: "特殊用电", value: "4" },
  { label: "市政给水", value: "5" },
];

export const LOCK_STATUS = [
  { label: "正常", value: "1" },
  { label: "锁定", value: "0" },
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
        type: "page",
        children: [
          { key: "project_add", label: "新增", type: "component" },
          { key: "project_edit", label: "编辑", type: "component" },
          { key: "project_delete", label: "删除", type: "component" },
          { key: "project_batch_delete", label: "批量删除", type: "component" },
          { key: "project_upload_img", label: "项目图片", type: "component" },
          { key: "project_price_config", label: "费用配置", type: "component" },
        ],
      },
      {
        key: "account",
        label: "账号管理",
        type: "page",
        children: [
          { key: "account_add", label: "新增", type: "component" },
          { key: "account_edit", label: "编辑", type: "component" },
          { key: "account_delete", label: "删除", type: "component" },
        ],
      },
      {
        key: "auth",
        label: "权限管理",
        type: "page",
        children: [
          { key: "auth_add", label: "新增", type: "component" },
          { key: "auth_edit", label: "编辑", type: "component" },
          { key: "auth_delete", label: "删除", type: "component" },
          { key: "auth_batch_delete", label: "批量删除", type: "component" },
          { key: "auth_distribute", label: "分配", type: "component" },
        ],
      },
      {
        key: "systemlog",
        label: "系统日志管理",
        type: "page",
        children: [
          {
            key: "systemlog_login_search",
            label: "登陆日志_搜索",
            type: "component",
          },
          {
            key: "systemlog_operation_search",
            label: "用户操作日志_搜索",
            type: "component",
          },
          {
            key: "systemlog_alarm_search",
            label: "报警信息日志_搜索",
            type: "component",
          },
        ],
      },
      {
        key: "platform",
        label: "平台配置",
        type: "page",
        children: [
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
        type: "page",
        children: [
          { key: "comm_add", label: "新增", type: "component" },
          { key: "comm_edit", label: "编辑", type: "component" },
          { key: "comm_delete", label: "删除", type: "component" },
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
        label: "能碳数据",
        type: "page",
        children: [
          {
            key: "carbon_history_export",
            label: "历史数据_导出",
            type: "component",
          },
          {
            key: "carbon_device_export",
            label: "单类设备数据_导出",
            type: "component",
          },
        ],
      },
      {
        key: "cost",
        label: "费用数据",
        type: "page",
        children: [
          {
            key: "cost_compare_export",
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
        type: "page",
        children: [
          { key: "ledger_add", label: "新增", type: "component" },
          { key: "ledger_edit", label: "编辑", type: "component" },
          { key: "ledger_delete", label: "删除", type: "component" },
          { key: "ledger_batch_import", label: "批量导入", type: "component" },
        ],
      },
      {
        key: "alarm",
        label: "设备报警",
        type: "page",
        children: [
          {
            key: "alarm_actual_add",
            label: "实时报警_新增",
            type: "component",
          },
          {
            key: "alarm_actual_deal",
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
            label: "运行报警_搜索",
            type: "component",
          },
        ],
      },
      {
        key: "group",
        label: "设备组管理",
        type: "page",
        children: [
          {
            key: "group_recycle",
            label: "设备组管理_回收站",
            type: "component",
          },
          {
            key: "group_index_add",
            label: "设备组管理_新增",
            type: "component",
          },
          {
            key: "group_index_edit",
            label: "设备组管理_编辑",
            type: "component",
          },
          {
            key: "group_index_delete",
            label: "设备组管理_删除",
            type: "component",
          },
          {
            key: "group_index_batch_delete",
            label: "设备组管理_批量删除",
            type: "component",
          },
          {
            key: "group_index_connect",
            label: "设备组管理_关联设备参数",
            type: "component",
          },
          {
            key: "group_work_batch_export",
            label: "设备运行_批量导出",
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
        type: "page",
        children: [
          { key: "point_add", label: "新增", type: "component" },
          { key: "point_edit", label: "编辑", type: "component" },
          { key: "point_delete", label: "删除", type: "component" },
          { key: "point_batch_delete", label: "批量删除", type: "component" },
        ],
      },
      {
        key: "devicelog",
        label: "设备日志",
        type: "page",
        children: [
          {
            key: "devicelog_batch_export",
            label: "批量导出",
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
        type: "page",
        children: [
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
            key: "maintain_device_edit",
            label: "单个设备_编辑5年保养计划",
            type: "component",
          },
          {
            key: "maintain_device_upload",
            label: "单个设备_上传文件",
            type: "component",
          },
        ],
      },
    ],
  },
];
