/*
 * @Author: ymZhang
 * @Date: 2024-01-06 12:09:42
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-16 23:42:46
 * @Description: 
 */
import { reactive, toRefs } from "vue";
import appStore from "@/store";

const SORT_MAP = {
  descending: "desc",
  ascending: "asc"
};
const PAGE_MAP = {
  currentPage: "pageNum",
  pageSize: "pageSize",
  total: "totalNum"
}

const useTable = (api, initSearchParam = {}, initSortParam = {}, initPageParam = {}, authKey) => {
  const state = reactive({
    loading: false,
    dataSource: [],
    pageInfo: {
      total: 0,
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 15, 20, 50],
      ...initPageParam
    },
    searchParam: { ...initSearchParam },
    sortParam: { ...initSortParam },
    selectRows: [],
  });

  const updatePageInfo = (pageable) => {
    state.pageInfo = {
      ...state.pageInfo,
      ...pageable
    }
  }

  const handleAuth = () => {
    if (!authKey) return true;
    const roleAuth = appStore.global.globalState.authList;
    if (roleAuth.length && !roleAuth.includes(authKey)) {
      return false;
    }
    return true;
  }

  const getTableList = async () => {
    if (!handleAuth()) {
      state.dataSource = [];
      return;
    }
    state.loading = true;
    if (state.selectRows.length) {
      state.selectRows = [];
    }
    const param = {
      pageNum: state.pageInfo.currentPage,
      pageSize: state.pageInfo.pageSize,
      ...state.searchParam
    }
    if (state.sortParam.prop) {
      param.sortKey = state.sortParam.prop;
      param.sortOrder = SORT_MAP[state.sortParam.order];
    }
    const { data } = await api(param);
    const { content = [], pageNum, pageSize, totalNum } = data.data;
    state.dataSource = content;
    updatePageInfo({
      total: totalNum,
      currentPage: pageNum,
      pageSize
    });
    state.loading = false;
  }

  const resetPageInfo = () => {
    state.pageInfo.currentPage = 1;
  }

  const sortChange = ({ prop, order }) => {
    state.sortParam = { prop, order };
    resetPageInfo();
    getTableList();
  }
  const pageChange = (currentPage, pageSize) => {
    if (state.pageInfo.currentPage === currentPage && state.pageInfo.pageSize === pageSize) return;
    if (pageSize !== state.pageInfo.pageSize && state.pageInfo.currentPage !== 1) {
      resetPageInfo();
    } else {
      state.pageInfo.currentPage = currentPage;
    }
    state.pageInfo.pageSize = pageSize;
    getTableList();
  }
  const updateSearchParam = (param) => {
    state.searchParam = {
      ...state.searchParam,
      ...param
    }
  }
  const searchChange = (newSearch) => {
    resetPageInfo();
    updateSearchParam(newSearch);
    getTableList();
  }
  const selectionChange = (data) => {
    state.selectRows = data;
  };

  return {
    ...toRefs(state),
    pageChange,
    sortChange,
    searchChange,
    getTableList,
    updateSearchParam,
    selectionChange
  }
}
export default useTable;