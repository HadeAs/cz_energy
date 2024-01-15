/*
 * @Author: ymZhang
 * @Date: 2023-12-23 17:58:16
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-15 01:06:01
 * @Description: 
 */
export const colorArr = ['#55c5f7', '#7dc856', '#f9bf00', '#fa5555', '#6666ff']

export const yAxisName = 'kWh';

export const UNIT_MAP = {
  0: { unit: ":00", num: 24 },
  1: { unit: "日", num: 31 },
  2: { unit: "月", num: 12 },
  3: { unit: "年", num: 11 }
}

export const TYPES_MAP = {
  hour: 0,
  day: 1,
  month: 2,
  year: 3
}

export const POWER_TREE_DATA = [
  {
    id: 1,
    label: "电能质量参数",
    children: [
      {
        id: 11,
        label: "电压偏差",
        unit: "%"
      },
      {
        id: 12,
        label: "电压波动"
      },
      {
        id: 13,
        label: "电压闪变"
      }
    ]
  },
  {
    id: 2,
    label: "电流参数",
    children: [
      {
        id: 21,
        label: "电缆电流",
        unit: "A"
      },
      {
        id: 22,
        label: "主变压器电流",
        unit: "A"
      },
      {
        id: 23,
        label: "母线电流",
        unit: "A"
      }
    ]
  },
  {
    id: 3,
    label: "电压参数",
    children: [
      {
        id: 31,
        label: "电压合格率",
        unit: "%"
      }
    ]
  },
  {
    id: 4,
    label: "功率因数",
    children: [
      {
        id: 41,
        label: "光伏"
      },
      {
        id: 42,
        label: "风力发电"
      }
    ]
  }
];

export const POWER_ECHART_OPT = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  legend: {
    top: 12,
    right: 24,
  },
  grid: {
    left: '24',
    right: '24',
    bottom: '24',
    top: '40',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: '#cad3e2',
        },
      },
      axisLabel: {
        color: '#2D2F33',
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: '单位：kWh',
      nameTextStyle: {
        color: '#2D2F33',
        fontSize: 14,
        padding: [0, 0, 0, 30]
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#cad3e2',
        },
      },
      axisLabel: {
        color: '#2D2F33',
      },
      splitLine: {
        show: false,
      },
    },
  ],
  color: colorArr,
}

export const WATER_TREE_DATA = [
  {
    id: 1,
    label: "生活用水",
    children: [
      {
        id: 11,
        label: "生活用水量"
      },
      {
        id: 12,
        label: "生活用水限额"
      }
    ]
  },
  {
    id: 2,
    label: "消防用水",
    children: [
      {
        id: 21,
        label: "消防用水量"
      },
      {
        id: 22,
        label: "消防用水限额"
      }
    ]
  },
  {
    id: 3,
    label: "空调用水",
    children: [
      {
        id: 31,
        label: "空调用水量"
      },
      {
        id: 32,
        label: "空调用水限额"
      }
    ]
  },
  {
    id: 4,
    label: "灌溉用水",
    children: [
      {
        id: 41,
        label: "灌溉用水量"
      },
      {
        id: 42,
        label: "灌溉用水限额"
      }
    ]
  }
];

export const WATER_X_MAP = ['电费', '燃气费', '水费'];