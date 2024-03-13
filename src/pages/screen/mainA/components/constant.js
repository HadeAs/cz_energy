export const TAG_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAsCAYAAADRqm7CAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk4RjBCQUUyNEIwOTExRUVBRjUxODQ2MkI4ODI5MEY3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk4RjBCQUUzNEIwOTExRUVBRjUxODQ2MkI4ODI5MEY3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OThGMEJBRTA0QjA5MTFFRUFGNTE4NDYyQjg4MjkwRjciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OThGMEJBRTE0QjA5MTFFRUFGNTE4NDYyQjg4MjkwRjciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4MkgW6AAAClUlEQVR42uyZz08TQRTHX9ttqRETSkhAggQRT1QT4tEEwsUL1GCInvwL4N/Ro3rxIFEIphflhyZ4E0RIGw9gQKTUloBAMFEpdXnPvDbtUqHUmV2WmW/y7Tb74+3sJzP73sx6zs9+7wGAR+h6UFNJ9KAHQaS660NFEHaSCYiNPofs3u8zT8FsaAKzu2fDsPaEnbVViL0kCHtKdAdPKgEmQJ1RuHM78RXiBCGTUW585EFsr65gT3gBf/YzSr4o/oLYWlmGeHREWQh5EPHoMELYB5XlpR/VIeRBaGkQGoQGoUFoEBqEBqFBVDD79Pk0CK9hQDjSrzYIr+GHdoRQ29JaPA1XDUL4dj+EmluKZ5+qQbjWdxdqmpoPvSzXzYuXlIDg8wfg+p17hyCg0rR4G8E/j9F1ir4uUugBT++aKSRatBEu4CZMGcmGxsciSdgVmkZN82Qgqj9u/fPYj47QVdzIHmcJbMNCpRdjG8WAOG4YojvR5yz7zTJ7SuF5pa75iZ5CZ0XTFZ01qIGf0Dcl9YYPMiDISp9p9Df0ZcFxv3BscAsI0iyDCAqK94tjgttA0EfT9+hbguK9YxiuA0H6jG5HX/nPOEvoRdn5WHaJ/Qbdhq6q8Hr6Ej1pR1UlG8Qup7tILl1zWiyZykscm+AYrgdBmkHfQLeWAcOaJaZtm4zZcA966BEutoI8TILHmM4dLhOYa0CQ1tHjZQDIeVJmzeAkCGAQae4RR5nOeW37OoWN98rydN+wPHiAXcXHnsgqo08LCNIy+lXBwwcsQMa4boCzDoI0hN4sMSRo3zOnVmecAEFF0gMeBn42/X/IpbkyIEjzPAxyIKhwmgMHJXph5iSqRj/lAuu+XRXkaQRB6uJe+RYc1oEAAwD0+aWlAIXMsQAAAABJRU5ErkJggg==";
export const PIE_OPT = {
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b}: {c} tCO₂ ({d}%)",
  },
  legend: {
    orient: "horizontal",
    bottom: 10,
    left: 40,
    icon: "circle",
    textStyle: {
      rich: {
        a: {
          color: "#7a7886",
          fontSize: 14,
          lineHeight: 20,
        },
        b: {
          color: "#00ffff",
          fontSize: 16,
          lineHeight: 20,
        },
      },
    },
  },
  series: [
    {
      name: "本月碳排量",
      type: "pie",
      radius: ["50%", "70%"],
      center: ["30%", "40%"],
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: "center",
        formatter: ["{a|111.54}", "{b|本月碳排量}"].join("\n"),

        rich: {
          a: {
            color: "#fff",
            fontSize: 28,
            fontWeight: "bold",
            lineHeight: 32,
          },
          b: {
            color: "#acabb4",
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
          name: "电力",
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#16CFFF", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#216DF5", // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            },
          },
        },
        {
          value: 88.8,
          name: "燃气",
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#B02EE3", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#6E30EE", // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            },
          },
        },
        {
          value: 0,
          name: "市政热力",
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#19D375", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#08B051", // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            },
          },
        },
        {
          value: 0,
          name: "石油",
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#B1B7C1", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#9AA1AF", // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            },
          },
        },
      ],
    },
  ],
};

export const LINE_OPT = {
  tooltip: {
    trigger: "axis",
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
      type: "category",
      boundaryGap: false,
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "#303644",
        },
      },
      axisLabel: {
        color: "#acabb4",
      },
      data: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
    },
  ],
  yAxis: [
    {
      type: "value",
      splitLine: {
        lineStyle: {
          type: "dashed",
          color: "#303644",
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: "#acabb4",
      },
    },
  ],
  series: [
    {
      name: "碳排放总量",
      type: "line",
      lineStyle: {},
      areaStyle: {
        opacity: 0,
      },
      data: [435, 552, 453, 230, 210, 211, 120, 132, 101, 134, 90, 110],
    },
  ],
  color: ["#459bda"],
};
export const mapData = [
  { value: 4, name: "徐州市" },
  { value: 6, name: "南京市" },
  { value: 12, name: "泰州市" },
  { value: 16, name: "镇江市" },
  { value: 21, name: "连云港市" },
  { value: 21, name: "扬州市" },
  { value: 21, name: "常州市" },
  { value: 21, name: "南通市" },
  { value: 26, name: "苏州市" },
  { value: 26, name: "淮安市" },
  { value: 32, name: "宿迁市" },
  { value: 32, name: "盐城市" },
  { value: 32, name: "无锡市" },
];

export const MAP_OPT = (mapPointData) => {
  return {
    geo: {
      map: "jsMap",
      show: true,
      roam: false,
      aspectScale: 1, //长宽比
      layoutCenter: ["48%", "55%"],
      layoutSize: "100%",
      itemStyle: {
        areaColor: "#1f4366",
        borderColor: "#1f4366",
        borderWidth: 0,
        opacity: 0.8,
        shadowColor: "#1f4366",
        shadowBlur: 10,
      },
      emphasis: {
        itemStyle: {
          areaColor: "#1f4366",
        },
      },
    },
    tooltip: {
      show: false,
    },
    series: [
      {
        type: "map",
        map: "jsMap",
        geoIndex: 1,
        aspectScale: 1, //长宽比
        layoutCenter: ["50%", "53%"],
        layoutSize: "100%",
        showLegendSymbol: false, // 存在legend时显示
        tooltip: {
          show: false,
        },
        label: {
          show: true,
          color: "#fff",
        },
        emphasis: {
          label: {
            show: false,
          },
          itemStyle: {
            areaColor: "#112e40",
          },
        },
        roam: false,
        itemStyle: {
          areaColor: "#1C4E8B",
          borderColor: "#02d4fb",
          borderWidth: 2,
          shadowColor: "#50f1ff",
          shadowBlur: 6,
        },
        markPoint: {
          symbol: "circle",
          symbolSize: 100,
          // symbolOffset: [18, 20],
          itemStyle: {
            color: "#00FFF6",
            shadowColor: "#00FFF6",
            shadowBlur: 10,
          },
        },
        data: mapData,
      },
      {
        type: "scatter",
        coordinateSystem: "geo",
        tooltip: {
          show: false,
        },
        label: {
          show: true,
          formatter: function (params) {
            const name = params.name;
            return name;
          },
          position: "insideTopLeft",
          color: "#fff",
          fontWeight: "800",
          fontSize: 14,
          lineHeight: 20,
          offset: [0, 3],
        },
        emphasis: {
          label: {
            show: true,
          },
        },
        itemStyle: {
          color: "#00FFF6",
        },
        symbol: TAG_IMAGE,
        symbolSize: [135, 35],
        symbolOffset: [20, -10],
        z: 999,
        data: mapPointData,
      },
      {
        type: "scatter",
        coordinateSystem: "geo",
        tooltip: {
          show: false,
        },
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: false,
          },
          itemStyle: {
            color: "#FFCC00",
            shadowColor: "#FFCC00",
            shadowBlur: 15,
          },
        },
        itemStyle: {
          color: "#00FFF6",
          shadowColor: "#00FFF6",
          shadowBlur: 10,
        },
        symbol: "circle",
        symbolSize: 10,
        symbolOffset: [18, 20],
        z: 1000,
        data: mapPointData,
      },
    ],
    visualMap: {
      type: "piecewise",
      show: false,
      realtime: false,
      calculable: true,
      inRange: {
        color: ["#87cae7", "#519ed3", "#87cae7", "#4179b1", "#1f6dc4", "#1f4366"],
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
        color: ["#0470DD"],
      },
    },
  }
};

export const mapPointData2 = [
  { value: ["119.33", "31.43"], name: "溧阳市", num: 14 },
  { value: ["119.43", "31.77"], name: "金坛市", num: 25 },
  { value: ["119.92", "31.70"], name: "武进区", num: 35 },
  { value: ["119.86", "31.97"], name: "新北区", num: 26 },
  { value: ["119.86", "31.88"], name: "钟楼区", num: 4 },
  { value: ["119.95", "31.86"], name: "天宁区", num: 6 },
  { value: ["120.02", "31.83"], name: "戚墅堰区", num: 8 },
];

export const mapData2 = [
  { value: 14, name: "溧阳市" },
  { value: 25, name: "金坛市" },
  { value: 35, name: "武进区" },
  { value: 26, name: "新北区" },
  { value: 4, name: "钟楼区" },
  { value: 6, name: "天宁区" },
  { value: 8, name: "戚墅堰区" },
];

export const MAP_OPT2 = {
  geo: {
    map: "czMap",
    show: true,
    roam: false,
    aspectScale: 1, //长宽比
    layoutCenter: ["47%", "53%"],
    layoutSize: "100%",
    itemStyle: {
      normal: {
        areaColor: "#1f4366",
        borderColor: "#2ADAFA",
        borderWidth: 0,
        opacity: 0.8,
        shadowColor: "#1f4366",
        shadowBlur: 10,
      },
      emphasis: {
        areaColor: "#1f4366",
      },
    },
  },
  tooltip: {
    show: false,
  },
  series: [
    {
      type: "map",
      map: "czMap",
      geoIndex: 1,
      aspectScale: 1, //长宽比
      layoutCenter: ["50%", "50%"],
      layoutSize: "100%",
      showLegendSymbol: false, // 存在legend时显示
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
      roam: false,
      itemStyle: {
        normal: {
          areaColor: "#1C4E8B",
          borderColor: "#02d4fb",
          borderWidth: 3,
        },
        emphasis: {
          areaColor: "#4179b1",
        },
      },
      markPoint: {
        symbol: "circle",
        symbolSize: 100,
        // symbolOffset: [18, 20],
        itemStyle: {
          normal: {
            color: "#00FFF6",
            shadowColor: "#00FFF6",
            shadowBlur: 10,
          },
        },
      },
      data: mapData2,
    },
    {
      type: "scatter",
      coordinateSystem: "geo",
      tooltip: {
        show: false,
      },
      label: {
        normal: {
          show: true,
          formatter: function (params) {
            var name = params.name + "(" + params.data.num + ")";
            return name;
          },
          position: "insideTopLeft",
          color: "#fff",
          fontWeight: "800",
          fontSize: 14,
          lineHeight: 20,
        },
        emphasis: {
          show: true,
        },
      },
      symbol: "image://src/assets/img/screen/mainA/u59.png",
      symbolSize: [80, 48],
      symbolOffset: [20, 0],
      z: 999,
      data: mapPointData2,
    },
    {
      type: "scatter",
      coordinateSystem: "geo",
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
          color: "#bafffb",
          shadowColor: "#bafffb",
          shadowBlur: 10,
        },
        emphasis: {
          color: "#FFCC00",
          shadowColor: "#FFCC00",
          shadowBlur: 15,
        },
      },
      symbol: "circle",
      symbolSize: 10,
      symbolOffset: [18, 20],
      z: 1000,
      data: mapPointData2,
    },
  ],
  visualMap: {
    type: "piecewise",
    show: false,
    realtime: false,
    calculable: true,
    inRange: {
      color: ["#35a2ee", "#0470dd", "#1c6bba", "#1c4e8b"],
    },
    splitList: [
      { start: 1, end: 10 },
      { start: 11, end: 20 },
      { start: 21, end: 30 },
      { start: 31, end: 40 },
    ],
    outOfRange: {
      color: ["#0470DD"],
    },
  },
};

export const COLUM_OPT = (
  imageDom1,
  imageDom2,
  imageDom3,
  imageDom4,
  imageDom5,
  imageDom6
) => {
  return {
    tooltip: {
      show: true,
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: function (params) {
        let tar;
        if (params[1].value != "-") {
          tar = params[1];
        } else {
          tar = params[0];
        }
        return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
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
        type: "category",
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "#303644",
          },
        },
        axisLabel: {
          color: "#acabb4",
          formatter: function (value, index) {
            if ([0, 4].includes(index)) {
              return value;
            }
            return null;
          },
        },
        data: [
          "碳排基准",
          "能源使用\n减少",
          "绿色能源",
          "碳汇(植树等)",
          "碳排放",
          // "电网碳排放因子降低",
          "碳信用抵消\n(碳交易)",
          "绿电购买\n抵消",
          "净排放",
        ],
      },
    ],
    yAxis: {
      type: "value",
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
          type: "dashed",
          color: "#303644",
        },
      },
    },
    series: [
      {
        name: "辅助",
        type: "bar",
        stack: "总量",
        barWidth: 24,
        itemStyle: {
          borderColor: "rgba(0,0,0,0)",
          color: "rgba(0,0,0,0)",
        },
        emphasis: {
          itemStyle: {
            borderColor: "rgba(0,0,0,0)",
            color: "rgba(0,0,0,0)",
          },
        },
        data: [0, 806.3, 656.3, 506.3, 0, 406.3, 306.3, 0],
      },
      {
        name: "碳中和趋势",
        type: "bar",
        stack: "总量",
        barWidth: 24,
        label: {
          show: true,
          position: "bottom",
          color: "#acabb4",
          formatter: (data) => {
            const { dataIndex } = data;
            if ([0, 4].includes(dataIndex)) return "";
            return data.name
          }
        },
        data: [
          {
            value: 956.3,
            itemStyle: {
              color: {
                image: imageDom1,
                repeat: "repeat",
              },
            },
          },
          {
            value: 150,
            itemStyle: {
              color: {
                image: imageDom2,
                repeat: "repeat",
              },
            },
          },
          {
            value: 150,
            itemStyle: {
              color: {
                image: imageDom3,
                repeat: "repeat",
              },
            },
          },
          {
            value: 150,
            itemStyle: {
              color: {
                image: imageDom3,
                repeat: "repeat",
              },
            },
          },
          {
            value: 506.3,
            itemStyle: {
              color: {
                image: imageDom4,
                repeat: "repeat",
              },
            },
          },
          {
            value: 100,
            itemStyle: {
              color: {
                image: imageDom5,
                repeat: "repeat",
              },
            },
          },
          {
            value: 100,
            itemStyle: {
              color: {
                image: imageDom5,
                repeat: "repeat",
              },
            },
          },
          {
            value: 306.3,
            itemStyle: {
              color: {
                image: imageDom6,
                repeat: "repeat",
              },
            },
          },
        ],
      },
      // {
      //   name: 'test',
      //   type: 'line',
      //   lineStyle: {
      //     color: "#6c6a77"
      //   },
      //   showSymbol: false,
      //   data: [956.3, 956.3]
      // },
      // {
      //   name: 'test1',
      //   type: 'line',
      //   showSymbol: false,
      //   lineStyle: {
      //     color: "#6c6a77"
      //   },
      //   data: ['-', 806.3, 806.3]
      // },
      // {
      //   name: 'test2',
      //   type: 'line',
      //   showSymbol: false,
      //   lineStyle: {
      //     color: "#6c6a77"
      //   },
      //   data: ['-', '-', 656.3, 656.3]
      // },
      // {
      //   name: 'test3',
      //   type: 'line',
      //   showSymbol: false,
      //   lineStyle: {
      //     color: "#6c6a77"
      //   },
      //   data: ['-', '-', '-', 506.3, 506.3]
      // },
      // {
      //   name: 'test4',
      //   type: 'line',
      //   showSymbol: false,
      //   lineStyle: {
      //     color: "#6c6a77"
      //   },
      //   data: ['-', '-', '-', '-', 506.3, 506.3]
      // },
      // {
      //   name: 'test5',
      //   type: 'line',
      //   showSymbol: false,
      //   lineStyle: {
      //     color: "#6c6a77"
      //   },
      //   data: ['-', '-', '-', '-', '-', 406.3, 406.3]
      // },
      // {
      //   name: 'test6',
      //   type: 'line',
      //   showSymbol: false,
      //   lineStyle: {
      //     color: "#6c6a77"
      //   },
      //   data: ['-', '-', '-', '-', '-', '-', 306.3, 306.3]
      // },
    ],
  };
};

export const LINE_OPT2 = {
  tooltip: {
    trigger: "axis",
    borderColor: "#0E1011",
    backgroundColor: "#0E1011",
    textStyle: {
      color: "#D8DCE5",
    },
    axisPointer: {
      // type: 'cross',
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },
  legend: {
    show: true,
    textStyle: {
      color: "#989898",
    },
    top: 0,
    data: [
      "碳排基准",
      "BAU照常情景",
      "能源使用量减少",
      "电网碳排因子降低",
      "碳信用抵消",
      // '柴油',
      // '其他',
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
      type: "category",
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: "#303644",
        },
      },
      axisLabel: {
        color: "#7a7886",
      },
      data: ["2020", "2021", "2022", "2023", "2024", "2025"],
    },
  ],
  yAxis: [
    {
      type: "value",
      splitLine: {
        lineStyle: {
          type: "dashed",
          color: "#303644",
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: "#7a7886",
      },
    },
  ],
  series: [
    {
      name: "碳排基准",
      type: "line",
      smooth: false,
      data: [250, 318, 480, 674, 884, 925],
      lineStyle: {
        type: "dashed",
      },
      areaStyle: {
        opacity: 0.2,
      },
    },
    {
      name: "BAU照常情景",
      type: "line",
      smooth: false,
      data: [250, 268, 310, 274, 202, 123],
      areaStyle: {
        opacity: 0.2,
      },
    },
    {
      name: "能源使用量减少",
      type: "line",
      smooth: false,
      data: [250, 352, 501, 554, 690, 700],
      areaStyle: {
        opacity: 0.2,
      },
    },
    {
      name: "电网碳排因子降低",
      type: "line",
      smooth: false,
      data: [250, 332, 451, 504, 650, 650],
      areaStyle: {
        opacity: 0.2,
      },
    },
    {
      name: "碳信用抵消",
      type: "line",
      smooth: false,
      data: [250, 310, 460, 650, 800, 900],
      areaStyle: {
        opacity: 0.2,
      },
    },
  ],
  color: ["#fff", "#6633FF", "#FF9900", "#49A9EE", "#31CE8F", "#f73234", "#5c5c5c"],
};
