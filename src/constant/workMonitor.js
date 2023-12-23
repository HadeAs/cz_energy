export const colorArr = ['#55c5f7', '#7dc856', '#f9bf00', '#fa5555', '#6666ff']

export const yAxisName = 'kWh';

export const UNIT_MAP = {
  0: { unit: ":00", num: 24 },
  1: { unit: "日", num: 31 },
  2: { unit: "月", num: 12 },
  3: { unit: "年", num: 11 }
}

export const POWER_TREE_DATA = [
  {
    id: 1,
    label: "电能质量参数",
    children: [
      {
        id: 11,
        label: "电压偏差"
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
        label: "电缆电流"
      },
      {
        id: 22,
        label: "主变压器电流"
      },
      {
        id: 23,
        label: "母线电流"
      }
    ]
  },
  {
    id: 3,
    label: "电压参数",
    children: [
      {
        id: 31,
        label: "电压合格率"
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
    // data: ['电压偏差', '电压波动', '电压闪变'],
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
      // data: xArr,
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
      name: '单位：KWh',
      nameTextStyle: {
        color: '#2D2F33',
        fontSize: 14,
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
  // series: [
  //   {
  //     name: '电压偏差',
  //     type: 'line',
  //     smooth: true,
  //     // data: yArr1,
  //   },
  //   {
  //     name: '电压波动',
  //     type: 'line',
  //     smooth: true,
  //     // data: yArr2,
  //   },
  //   {
  //     name: '电压闪变',
  //     type: 'line',
  //     smooth: true,
  //     // data: yArr3,
  //   },
  // ],
  color: colorArr,
}