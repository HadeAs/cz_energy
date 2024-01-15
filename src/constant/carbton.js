/*
 * @Author: ymZhang
 * @Date: 2024-01-11 15:57:56
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-15 00:03:53
 * @Description: 
 */
export const colorArr = ['#29b7f4', '#7dc856', '#f9bf03', '#fa5555', '#6666ff']
export const CARBTON_TREE_DATA = [
  {
    id: 1,
    label: "碳排放量类别",
    children: [
      {
        parentId: 1,
        id: 11,
        label: "电压偏电力差"
      },
      {
        parentId: 1,
        id: 12,
        label: "燃气"
      },
      {
        parentId: 1,
        id: 13,
        label: "市政热力"
      },
      {
        parentId: 1,
        id: 14,
        label: "石油"
      },
      {
        parentId: 1,
        id: 15,
        label: "其他"
      }
    ]
  },
  {
    id: 2,
    label: "统计指标",
    children: [
      {
        parentId: 2,
        id: 21,
        label: "总碳排放量"
      }
    ]
  },
  {
    id: 3,
    label: "统计指标",
    children: [
      {
        parentId: 3,
        id: 31,
        label: "碳排放强度"
      }
    ]
  },
  {
    id: 4,
    label: "统计指标",
    children: [
      {
        parentId: 4,
        id: 41,
        label: "人均碳排放量"
      }
    ]
  },
  {
    id: 5,
    label: "统计指标",
    children: [
      {
        parentId: 5,
        id: 51,
        label: "用能人数"
      }
    ]
  }
];

export const SUB_SYSTEM_TREE_DATA = [
  {
    id: 1,
    label: "碳排放量类别",
    children: [
      {
        id: 11,
        label: "照明与插座"
      },
      {
        id: 12,
        label: "空调系统"
      },
      {
        id: 13,
        label: "供配电系统"
      },
      {
        id: 14,
        label: "动力系统"
      },
      {
        id: 15,
        label: "特殊用电"
      },
      {
        id: 16,
        label: "燃气系统"
      }
    ]
  },
  {
    id: 2,
    label: "可再生能源",
    children: [
      {
        id: 21,
        label: "太阳能系统",
      },
      {
        id: 22,
        label: "光伏系统",
      },
      {
        id: 23,
        label: "风力发电系统",
      }
    ]
  }
];

export const CARBTON_CALCULATE_TREE_DATA = [
  {
    id: 1,
    label: "碳减排量",
    children: [
      {
        id: 11,
        label: "碳排基准",
        color: "#e1e1e1",
        borderColor: "#3b3b3b",
        borderType: "dashed"
      },
      {
        id: 12,
        label: "碳减排总量",
        color: "#e4d8c4",
        borderColor: "#f7ac56",
        borderType: "solid"
      },
      {
        id: 13,
        label: "实际碳排放量",
        color: "#d9c7cb",
        borderColor: "#8c62ef",
        borderType: "solid"
      },
    ]
  },
  {
    id: 2,
    label: "碳减排举措类别",
    children: [
      {
        id: 21,
        label: "光伏发电",
        color: "#e1e1e1",
        borderColor: "#3b3b3b",
        borderType: "dashed"
      },
      {
        id: 22,
        label: "光热",
        color: "#e4d8c4",
        borderColor: "#f7ac56",
        borderType: "solid"
      },
      {
        id: 23,
        label: "风力发电",
        color: "#d9c7cb",
        borderColor: "#8c62ef",
        borderType: "solid"
      },
      {
        id: 24,
        label: "节能改造",
        color: "#e1e1e1",
        borderColor: "#3b3b3b",
        borderType: "dashed"
      },
      {
        id: 25,
        label: "植树造林",
        color: "#e4d8c4",
        borderColor: "#8c62ef",
        borderType: "solid"
      }
    ]
  }
];

export const CARBON_NETURAL_CALCULATE_TREE_DATA = [
  {
    id: 1,
    label: "碳排基准",
    children: [
      {
        id: 11,
        label: "能源使用减少",
        color: "rgba(33, 109, 245, 1)"
      },
      {
        id: 12,
        label: "绿色能源",
        color: "rgba(0, 161, 171, 1)"
      },
      {
        id: 13,
        label: "碳汇(植树等）",
        color: "rgba(10, 209, 100, 1)"
      },
      {
        id: 14,
        label: "电网碳排因子降低",
        color: "rgba(190, 175, 158, 1)"
      }
    ]
  },
  {
    id: 2,
    label: "碳排放",
    children: [
      {
        id: 21,
        label: "碳信用抵消(碳交易)",
        color: "rgba(228, 163, 3, 1)"
      },
      {
        id: 22,
        label: "绿电购买抵消",
        color: "rgba(148, 125, 99, 1)"
      },
      {
        id: 23,
        label: "净排放",
        color: "rgba(255, 136, 115, 1)"
      }
    ]
  }
]

export const UNIT_MAP = {
  1: { unit: "tCO₂", num: 24 },
  2: { unit: "tCO₂", num: 24 },
  3: { unit: "kgCO₂/（m·a）", num: 24 },
  4: { unit: "kgCO₂", num: 24 },
  5: { unit: "个", num: 24 }
}

export const COMMON_SERIES_DATA = [
  {
    name: "辅助",
    type: "bar",
    stack: "总量",
    barWidth: 40,
    itemStyle: {
      borderColor: "rgba(0,0,0,0)",
      color: "rgba(0,0,0,0)",
    },
    tooltip: {
      show: false,
    },
    emphasis: {
      itemStyle: {
        borderColor: "rgba(0,0,0,0)",
        color: "rgba(0,0,0,0)",
      },
    },

    data: [],
  },
  {
    name: "碳中和趋势",
    type: "bar",
    stack: "总量",
    barWidth: 40,
    label: {
      show: true,
      position: "bottom",
      color: "#acabb4",
    },
    data: []
  }
]