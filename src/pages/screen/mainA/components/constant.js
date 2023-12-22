export const PIE_OPT = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} tCO₂ ({d}%)',
  },
  legend: {
    orient: 'horizontal',
    bottom: 10,
    left: 40,
    icon: 'circle',
    textStyle: {
      rich: {
        a: {
          color: '#7a7886',
          fontSize: 14,
          lineHeight: 20,
        },
        b: {
          color: '#00ffff',
          fontSize: 16,
          lineHeight: 20,
        },
      },
    },
  },
  series: [
    {
      name: '本月碳排量',
      type: 'pie',
      radius: ['50%', '70%'],
      center: ['30%', '40%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: 'center',
        formatter: ['{a|111.54}', '{b|本月碳排量}'].join('\n'),

        rich: {
          a: {
            color: '#fff',
            fontSize: 28,
            fontWeight: 'bold',
            lineHeight: 32,
          },
          b: {
            color: '#acabb4',
            fontSize: 14,
            lineHeight: 18,
          },
        },
        label: {
          show: true,
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        {
          value: 102.65,
          name: '电力',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#16CFFF', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#216DF5', // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            },
          },
        },
        {
          value: 88.8,
          name: '燃气',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#B02EE3', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#6E30EE', // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            },
          },
        },
        {
          value: 0,
          name: '市政热力',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#19D375', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#08B051', // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            },
          },
        },
        {
          value: 0,
          name: '石油',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#B1B7C1', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#9AA1AF', // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            },
          },
        },
      ],
    },
  ],
}

export const LINE_OPT = {
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    show: false,
  },
  grid: {
    left: 10,
    right: 10,
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
        color: '#acabb4',
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
        color: '#acabb4',
      },
    },
  ],
  series: [
    {
      name: '碳排放总量',
      type: 'line',
      lineStyle: {
        normal: {},
      },
      areaStyle: {
        normal: {
          opacity: 0,
        },
      },
      data: [435, 552, 453, 230, 210, 211, 120, 132, 101, 134, 90, 110],
    },
  ],
  color: ['#459bda'],
}

export const MAP_OPT = (mapPointData, mapData) => {
  return {
    geo: {
      map: 'jsMap',
      show: true,
      roam: false,
      aspectScale: 1, //长宽比
      layoutCenter: ['48%', '55%'],
      layoutSize: '100%',
      itemStyle: {
        areaColor: '#1f4366',
        borderColor: '#1f4366',
        borderWidth: 0,
        opacity: 0.8,
        shadowColor: '#1f4366',
        shadowBlur: 10,
        emphasis: {
          areaColor: '#1f4366',
        },
      },
    },
    tooltip: {
      show: false,
    },
    series: [
      {
        type: 'map',
        map: 'jsMap',
        geoIndex: 1,
        aspectScale: 1, //长宽比
        layoutCenter: ['50%', '53%'],
        layoutSize: '100%',
        showLegendSymbol: false, // 存在legend时显示
        tooltip: {
          show: false,
        },
        label: {
          show: true,
          color: '#fff',
          emphasis: {
            show: false,
          },
        },
        roam: false,
        itemStyle: {
          areaColor: '#1C4E8B',
          borderColor: '#02d4fb',
          borderWidth: 2,
          shadowColor: '#50f1ff',
          shadowBlur: 6,
          emphasis: {
            areaColor: '#112e40',
          },
        },
        markPoint: {
          symbol: 'circle',
          symbolSize: 100,
          // symbolOffset: [18, 20],
          itemStyle: {
            color: '#00FFF6',
            shadowColor: '#00FFF6',
            shadowBlur: 10,
          },
        },
        data: mapData,
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        tooltip: {
          show: false,
        },
        label: {
          normal: {
            show: true,
            formatter: function (params) {
              const name = params.name
              return name
            },
            position: 'insideTopLeft',
            color: '#fff',
            fontWeight: '800',
            fontSize: 14,
            lineHeight: 20,
          },
          emphasis: {
            show: true,
          },
        },
        itemStyle: {
          color: '#00FFF6',
        },
        symbol: 'image://../../images/u59.png',
        symbolSize: [100, 50],
        symbolOffset: [20, 0],
        z: 999,
        data: mapPointData,
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        tooltip: {
          show: false,
        },
        label: {
          normal: {
            show: false,
          },
          emphasis: {
            show: false,
          },
        },
        itemStyle: {
          normal: {
            color: '#00FFF6',
            shadowColor: '#00FFF6',
            shadowBlur: 10,
          },
          emphasis: {
            color: '#FFCC00',
            shadowColor: '#FFCC00',
            shadowBlur: 15,
          },
        },
        symbol: 'circle',
        symbolSize: 10,
        symbolOffset: [18, 20],
        z: 1000,
        data: mapPointData,
      },
    ],
    visualMap: {
      type: 'piecewise',
      show: false,
      realtime: false,
      calculable: true,
      inRange: {
        color: [
          '#87cae7',
          '#519ed3',
          '#87cae7',
          '#4179b1',
          '#1f6dc4',
          '#1f4366',
        ],
      },
      splitList: [
        { start: 1, end: 10 },
        { start: 11, end: 15 },
        { start: 16, end: 20 },
        { start: 21, end: 25 },
        { start: 26, end: 30 },
        { start: 31, end: 40 },
      ],
      outOfRange: {
        color: ['#0470DD'],
      },
    },
  }
}

export const COLUM_OPT = (imageDom1, imageDom2, imageDom3, imageDom4, imageDom5, imageDom6) => {
  // const imageDom1 = new Image()
  // imageDom1.src = '@/assets/img/screen/mainA/bar1.png'
  // const imageDom2 = new Image()
  // imageDom2.src = '@/assets/img/screen/mainA/bar2.png'
  // const imageDom3 = new Image()
  // imageDom3.src = '@/assets/img/screen/mainA/bar3.png'
  // const imageDom4 = new Image()
  // imageDom4.src = '@/assets/img/screen/mainA/bar4.png'
  // const imageDom5 = new Image()
  // imageDom5.src = '@/assets/img/screen/mainA/bar5.png'
  // const imageDom6 = new Image()
  // imageDom6.src = '@/assets/img/screen/mainA/bar6.png'
  return {
    tooltip: {
      show: false,
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: function (params) {
        let tar
        if (params[1].value != '-') {
          tar = params[1]
        } else {
          tar = params[0]
        }
        return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value
      },
    },
    grid: {
      left: 20,
      right: 20,
      top: 10,
      bottom: 10,
      containLabel: true,
    },

    xAxis: [
      {
        type: 'category',
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#303644',
          },
        },
        axisLabel: {
          color: '#acabb4',
          formatter: function (value) {
            const start = value.slice(0, 5)
            const end = value.slice(5)
            return start + '\n' + end
          },
        },
        data: [
          '碳排基准',
          '能源使用量减少',
          '电网碳排因子降低',
          '碳排放',
          '碳信用抵消',
          '净排放',
        ],
      },
    ],
    yAxis: {
      type: 'value',
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      splitNumber: 4,
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#303644',
        },
      },
    },
    series: [
      {
        name: '辅助',
        type: 'bar',
        stack: '总量',
        barWidth: 24,
        itemStyle: {
          normal: {
            borderColor: 'rgba(0,0,0,0)',
            color: 'rgba(0,0,0,0)',
          },
          emphasis: {
            borderColor: 'rgba(0,0,0,0)',
            color: 'rgba(0,0,0,0)',
          },
        },
        data: [0, 644, 507, 765, 722, 614],
      },
      {
        name: '碳中和趋势',
        type: 'bar',
        stack: '总量',
        barWidth: 24,
        label: {
          normal: {
            show: true,
            position: 'top',
            color: '#acabb4',
          },
        },
        data: [
          {
            value: 900,
            itemStyle: {
              color: {
                image: imageDom1,
                repeat: 'repeat',
              },
            },
          },
          {
            value: 256,
            itemStyle: {
              color: {
                image: imageDom2,
                repeat: 'repeat',
              },
            },
          },
          {
            value: 393,
            itemStyle: {
              color: {
                image: imageDom3,
                repeat: 'repeat',
              },
            },
          },
          {
            value: 135,
            itemStyle: {
              color: {
                image: imageDom4,
                repeat: 'repeat',
              },
            },
          },
          {
            value: 178,
            itemStyle: {
              color: {
                image: imageDom5,
                repeat: 'repeat',
              },
            },
          },
          {
            value: 286,
            itemStyle: {
              color: {
                image: imageDom6,
                repeat: 'repeat',
              },
            },
          },
        ],
      },
    ],
  }
}

export const LINE_OPT2 = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  legend: {
    show: true,
    textStyle: {
      color: '#989898',
    },
    top: 0,
    data: [
      '碳排基准',
      'BAU照常情景',
      '能源使用量减少',
      '电网碳排因子降低',
      '柴油',
      '其他',
    ],
  },
  grid: {
    left: 8,
    right: 16,
    bottom: 8,
    top: 30,
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: '#303644',
        },
      },
      axisLabel: {
        textStyle: {
          color: '#7a7886',
        },
      },
      data: ['2020', '2021', '2022', '2023', '2024', '2025'],
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
          color: '#7a7886',
        },
      },
    },
  ],
  series: [
    {
      name: '碳排基准',
      type: 'line',
      smooth: true,
      data: [250, 318, 480, 674, 884, 925],
      lineStyle: {
        normal: {
          type: 'dashed',
        },
      },
      areaStyle: {
        normal: {
          opacity: 0.2,
        },
      },
    },
    {
      name: 'BAU照常情景',
      type: 'line',
      smooth: true,
      data: [250, 268, 310, 274, 202, 123],
      areaStyle: {
        normal: {
          opacity: 0.2,
        },
      },
    },
    {
      name: '能源使用量减少',
      type: 'line',
      smooth: true,
      data: [250, 352, 501, 554, 690, 700],
      areaStyle: {
        normal: {
          opacity: 0.2,
        },
      },
    },
    {
      name: '电网碳排因子降低',
      type: 'line',
      smooth: true,
      data: [250, 332, 451, 504, 650, 650],
      areaStyle: {
        normal: {
          opacity: 0.2,
        },
      },
    },
    {
      name: '碳信用抵消',
      type: 'line',
      smooth: true,
      data: [250, 310, 460, 650, 800, 900],
      areaStyle: {
        normal: {
          opacity: 0.2,
        },
      },
    },
  ],
  color: ['#fff', '#6633FF', '#FF9900', '#49A9EE', '#31CE8F'],
}