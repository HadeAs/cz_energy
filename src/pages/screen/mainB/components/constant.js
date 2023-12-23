export const MEASURE_OPT = (chartData) => {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      right: 10,
      itemWidth: 10,
      itemHeight: 10,
      y: 'center',
      icon: 'circle',
      // data: ['空调', '动力', '照明插座', '特殊'],
      formatter: function (name) {
        let value, rate
        chartData.forEach((v) => {
          if (v.name === name) {
            value = v.value
            rate = v.rate
          }
        })
        return [
          '{a|' + name + '}',
          '{b|' + value + '}',
          '{b|' + rate + '}',
        ].join(' ')
      },
      textStyle: {
        rich: {
          a: {
            color: '#7a7886',
            fontSize: 14,
            lineHeight: 20,
            width: 80,
          },
          b: {
            color: '#fff',
            fontSize: 14,
            lineHeight: 20,
            width: 40,
          },
        },
      },
    },
    // calculable: true,
    series: [
      {
        name: '分项计量',
        type: 'pie',
        radius: [30, 90],
        center: ['30%', '50%'],
        roseType: 'radius',
        label: {
          show: false,
          emphasis: {
            show: true,
          },
        },
        lableLine: {
          show: false,
          emphasis: {
            show: true,
          },
        },
        data: chartData,
      },
    ],
    color: ['#57a435', '#fe872b', '#0fd3fc', '#1065c8'],
  }
}

export const ANALYSE_OPT = {
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    show: false,
  },
  grid: {
    left: 10,
    right: 16,
    top: 20,
    bottom: 10,
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#303644',
        },
      },
      axisLabel: {
        textStyle: {
          color: '#acabb4',
        },
      },
      data: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月',
      ],
    },
  ],
  yAxis: [
    {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#303644',
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          color: '#acabb4',
        },
      },
    },
  ],
  series: [
    {
      name: '用气总量',
      type: 'line',
      lineStyle: {
      },
      areaStyle: {
        opacity: 0,
      },
      data: [120, 132, 101, 134, 90, 230, 210, 110, 211, 435, 552, 453],
    },
  ],
  color: ['#459bda'],
}

export const TREND_OPT1 = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    formatter: function (params) {
      // console.log(params)
      return [
        params[0].name + '用电',
        params[0].marker + params[0].seriesName + '：' + params[0].value,
        params[1].marker + params[1].seriesName + '：' + params[1].value,
        params[2].marker + params[2].seriesName + '：' + params[2].value,
        params[3].marker + params[3].seriesName + '：' + params[3].value,
      ].join('<br />')
    },
  },
  legend: {
    right: 10,
    top: 10,
    itemWidth: 10,
    itemHeight: 10,
    icon: 'circle',
    textStyle: {
      color: '#7a7886',
      fontSize: 12,
    },
    data: ['空调', '照明', '动力', '其他'],
  },
  grid: {
    left: '10',
    right: '10',
    top: 56,
    bottom: '10',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      // boundaryGap: false,
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#303644',
        },
      },
      axisLabel: {
        textStyle: {
          color: '#acabb4',
        },
      },
      data: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月',
      ],
    },
  ],
  yAxis: [
    {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#303644',
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          color: '#acabb4',
        },
      },
    },
  ],
  series: [
    {
      name: '空调',
      type: 'bar',
      stack: '用电',
      barMaxWidth: 16,
      data: [320, 332, 301, 334, 390, 330, 320, 332, 301, 334, 390, 211],
    },
    {
      name: '照明',
      type: 'bar',
      stack: '用电',
      barMaxWidth: 16,
      data: [120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 210],
    },
    {
      name: '动力',
      type: 'bar',
      stack: '用电',
      barMaxWidth: 16,
      data: [220, 182, 191, 234, 290, 330, 310, 182, 191, 234, 290, 330],
    },
    {
      name: '其他',
      type: 'bar',
      stack: '用电',
      barMaxWidth: 16,
      data: [150, 232, 201, 154, 190, 330, 410, 201, 154, 190, 330, 400],
    },
  ],
  color: ['#1AA9FB', '#1065c8', '#33cc99', '#ffd86e'],
}

export const TREND_OPT2 = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    formatter: function (params) {
      // console.log(params)
      return [
        params[0].name + '用电',
        params[0].marker + params[0].seriesName + '：' + params[0].value,
        params[1].marker + params[1].seriesName + '：' + params[1].value,
        params[2].marker + params[2].seriesName + '：' + params[2].value,
        params[3].marker + params[3].seriesName + '：' + params[3].value,
      ].join('<br />')
    },
  },
  legend: {
    right: 110,
    top: 10,
    itemWidth: 10,
    itemHeight: 10,
    icon: 'circle',
    textStyle: {
      color: '#7a7886',
      fontSize: 12,
    },
    data: ['空调', '照明', '动力', '其他'],
  },
  grid: {
    left: '10',
    right: '10',
    top: 56,
    bottom: '10',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      // boundaryGap: false,
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#303644',
        },
      },
      axisLabel: {
        textStyle: {
          color: '#acabb4',
        },
      },
      data: [
        '5.1',
        '5.2',
        '5.3',
        '5.4',
        '5.5',
        '5.6',
        '5.7',
        '5.8',
        '5.9',
        '5.10',
        '5.11',
        '5.12',
        '5.13',
        '5.14',
        '5.15',
        '5.16',
        '5.17',
        '5.18',
        '5.19',
        '5.20',
        '5.21',
        '5.22',
        '5.23',
        '5.24',
        '5.25',
        '5.26',
        '5.27',
        '5.28',
        '5.29',
        '5.30',
        '5.31',
      ],
    },
  ],
  yAxis: [
    {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#303644',
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          color: '#acabb4',
        },
      },
    },
  ],
  series: [
    {
      name: '空调',
      type: 'bar',
      stack: '用电',
      barMaxWidth: 8,
      data: [
        320,
        332,
        301,
        334,
        390,
        330,
        320,
        332,
        301,
        334,
        390,
        211,
        320,
        332,
        301,
        334,
        390,
        330,
        320,
        332,
        301,
        320,
        332,
        301,
        334,
        390,
        330,
        320,
        332,
        301,
        234,
      ],
    },
    {
      name: '照明',
      type: 'bar',
      stack: '用电',
      barMaxWidth: 8,
      data: [
        120,
        132,
        101,
        134,
        90,
        230,
        210,
        101,
        134,
        90,
        230,
        210,
        120,
        132,
        101,
        134,
        90,
        230,
        210,
        101,
        134,
        90,
        120,
        132,
        101,
        134,
        90,
        230,
        210,
        101,
        134,
      ],
    },
    {
      name: '动力',
      type: 'bar',
      stack: '用电',
      barMaxWidth: 8,
      data: [
        220,
        182,
        191,
        234,
        290,
        330,
        310,
        182,
        191,
        234,
        290,
        330,
        220,
        182,
        191,
        234,
        290,
        330,
        310,
        182,
        191,
        234,
        220,
        182,
        191,
        234,
        290,
        330,
        310,
        182,
        191,
      ],
    },
    {
      name: '其他',
      type: 'bar',
      stack: '用电',
      barMaxWidth: 8,
      data: [
        150,
        232,
        201,
        154,
        190,
        330,
        410,
        201,
        154,
        190,
        330,
        400,
        150,
        232,
        201,
        154,
        190,
        330,
        410,
        201,
        154,
        190,
        150,
        232,
        201,
        154,
        190,
        330,
        410,
        201,
        154,
      ],
    },
  ],
  color: ['#1AA9FB', '#1065c8', '#33cc99', '#ffd86e'],
}

export const TREND_OPT3 = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    formatter: function (params) {
      // console.log(params)
      return [
        params[0].name + '用电',
        params[0].marker + params[0].seriesName + '：' + params[0].value,
        params[1].marker + params[1].seriesName + '：' + params[1].value,
        params[2].marker + params[2].seriesName + '：' + params[2].value,
        params[3].marker + params[3].seriesName + '：' + params[3].value,
      ].join('<br />')
    },
  },
  legend: {
    right: 110,
    top: 10,
    itemWidth: 10,
    itemHeight: 10,
    icon: 'circle',
    textStyle: {
      color: '#7a7886',
      fontSize: 12,
    },
    data: ['空调', '照明', '动力', '其他'],
  },
  grid: {
    left: '10',
    right: '10',
    top: 56,
    bottom: '10',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      // boundaryGap: false,
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#303644',
        },
      },
      axisLabel: {
        textStyle: {
          color: '#acabb4',
        },
      },
      data: [
        '0点',
        '1点',
        '2点',
        '3点',
        '4点',
        '5点',
        '6点',
        '7点',
        '8点',
        '9点',
        '10点',
        '11点',
        '12点',
        '13点',
        '14点',
        '15点',
        '16点',
        '17点',
        '18点',
        '19点',
        '20点',
        '21点',
        '22点',
        '23点',
      ],
    },
  ],
  yAxis: [
    {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#303644',
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          color: '#acabb4',
        },
      },
    },
  ],
  series: [
    {
      name: '空调',
      type: 'bar',
      stack: '用电',
      barMaxWidth: 8,
      data: [
        320,
        332,
        301,
        334,
        390,
        330,
        320,
        332,
        301,
        334,
        390,
        211,
        320,
        332,
        301,
        334,
        390,
        330,
        320,
        332,
        301,
        320,
        332,
        301,
      ],
    },
    {
      name: '照明',
      type: 'bar',
      stack: '用电',
      barMaxWidth: 8,
      data: [
        120,
        132,
        101,
        134,
        90,
        230,
        210,
        101,
        134,
        90,
        230,
        210,
        120,
        132,
        101,
        134,
        90,
        230,
        210,
        101,
        134,
        90,
        120,
        132,
      ],
    },
    {
      name: '动力',
      type: 'bar',
      stack: '用电',
      barMaxWidth: 8,
      data: [
        220,
        182,
        191,
        234,
        290,
        330,
        310,
        182,
        191,
        234,
        290,
        330,
        220,
        182,
        191,
        234,
        290,
        330,
        310,
        182,
        191,
        234,
        220,
        182,
      ],
    },
    {
      name: '其他',
      type: 'bar',
      stack: '用电',
      barMaxWidth: 8,
      data: [
        150,
        232,
        201,
        154,
        190,
        330,
        410,
        201,
        154,
        190,
        330,
        400,
        150,
        232,
        201,
        154,
        190,
        330,
        410,
        201,
        154,
        190,
        150,
        232,
      ],
    },
  ],
  color: ['#1AA9FB', '#1065c8', '#33cc99', '#ffd86e'],
}