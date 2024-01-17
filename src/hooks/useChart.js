/*
 * @Author: ymZhang
 * @Date: 2024-01-16 11:29:30
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-16 19:50:08
 * @Description: 
 */
import { reactive, toRefs, onMounted } from "vue";
import dayjs from "dayjs";
import { COMMON_DATE_FORMAT } from "@/constant";


const DEFAULT_SEARCH_CONFIG = {
  type: "hour",
};

const getDefaultDate = (type) => {
  let startDate;
  const now = dayjs();
  const endDate = dayjs(now).format(COMMON_DATE_FORMAT) + " 23:59:59";
  if (type === "hour") {
    // 默认查询当前一天的数据
    startDate = dayjs(now).format(COMMON_DATE_FORMAT) + " 00:00:00";
  } else if (type === "day") {
    // 默认查询近7天的数据
    startDate = now.subtract(7, "day").format(COMMON_DATE_FORMAT) + " 00:00:00";
  } else if (type === "month") {
    // 默认查询最近12个月的数据
    startDate = now.subtract(1, "year").startOf("year").format(COMMON_DATE_FORMAT) + " 00:00:00";
  }
  return { startDate, endDate };
}

const useChart = (chartConfig = {}, treeConfig = {}) => {
  const { api: chartApi, param: searchParam = {}, handleParam, updateChart } = chartConfig;
  const { api: treeApi, param: treeParam = {}, handleData: handleTreeData } = treeConfig;
  const state = reactive({
    searchParam: {
      ...DEFAULT_SEARCH_CONFIG,
      ...searchParam
    },
    dataSource: [],
    treeData: [],
    checkKeys: [],
    checkDatas: []
  });

  // 数据过多展示不下处理
  const handleDefaultParams = () => {
    const params = {};
    if (!state.searchParam.startDate && !state.searchParam.endDate) {
      const { startDate, endDate } = getDefaultDate(state.searchParam.type);
      if (startDate && endDate) {
        params.startDate = startDate;
        params.endDate = endDate;
      }
    }
    return params;
  }

  const queryChart = async () => {
    const dataSource = [];
    const defaultDateParams = handleDefaultParams();
    for (let i = 0; i < state.checkKeys.length; i += 1) {
      const item = state.checkDatas[i];
      let extraParam = {};
      if (handleParam) {
        // 调用侧处理参数
        extraParam = handleParam(item);
      }
      const { data } = await chartApi({ ...state.searchParam, ...defaultDateParams, ...extraParam });
      if (data?.data) {
        dataSource.push(data.data);
      }
    }
    state.dataSource = dataSource;
    if (updateChart) {
      updateChart(dataSource, state.checkDatas, state.searchParam.type);
    }
  }

  // 递归tree，重做id属性
  // const handleTree = (treeData) => {
  //   const recurse = (arr, parentId = null, tag = null) => {
  //     arr.forEach(item => {
  //       if (![undefined, null].includes(parentId)) {
  //         item.parentId = parentId;
  //         item.id = `${parentId}_${item.id}`;
  //         item.tag = tag;
  //       } else if (item.children && item.children.length) {
  //         recurse(item.children, item.id, item.tag)
  //       }
  //     })
  //   }
  //   recurse(treeData);
  //   return treeData;
  // }

  const queryTree = async (init = false) => {
    const { data } = await treeApi(treeParam);
    if (data?.data) {
      const treeData = data.data || [];
      // 调用方处理treeData
      state.treeData = handleTreeData ? handleTreeData(treeData) : treeData;
      // 默认选中第一类节点下的所有子节点
      if (treeData.length) {
        if (init) {
          const datas = state.treeData[0].children || [];
          if (datas.length) {
            // 有子集
            state.checkKeys = datas.map(item => item.id);
            state.checkDatas = datas;
          } else {
            // 无子集
            state.checkKeys = [state.treeData[0].id];
            state.checkDatas = [state.treeData[0]];
          }
        }
      }
      if (init) {
        queryChart();
      }
    }
  }

  const tabChange = (currentTab) => {
    state.searchParam.type = currentTab;
    queryChart();
  }

  const checkChange = (checkNodes = []) => {
    state.checkKeys = checkNodes.map(item => item.id)
    state.checkDatas = checkNodes;
    queryChart();
  }

  const searchChange = ({ prop, value }) => {
    if (Array.isArray(value)) {
      // 时间范围
      const param = {
        startDate: value[0],
        endDate: value[1]
      }
      state.searchParam = { ...state.searchParam, ...param };
    } else {
      state.searchParam = { ...state.searchParam, [prop]: value };
    }
    queryChart();
  }

  onMounted(() => {
    queryTree(true);
  })

  return {
    ...toRefs(state),
    queryChart,
    queryTree,
    tabChange,
    checkChange,
    searchChange
  }
}
export default useChart;