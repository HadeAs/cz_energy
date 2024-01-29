import http from '@/api/http.js';
import { commonResult } from '@/api/backstageMng/utils.js';
import { COMMON_UPDATE_CONFIG } from '@/api/index.js';

export const getList = (params) => {
  if (!params?.standardId) return { data: { data: [] } };
  return http.get(`web/carbon-statistics/config/query`, { ...params });
}

export const getActualData = (params) => {
  return commonResult(`web/carbon-statistics/total/query`, { ...params }, []);
}

export const getCarbonClassSide = (params) => {
  return commonResult(`web/carbon-statistics/sys-class/side-bar`, { ...params }, []);
}

export const getQsDataByClass = (params) => {
  return commonResult(`web/carbon-statistics/sys-class/query`, { ...params }, []);
}

export const configCarbon = (params) => {
  return http.post(`web/carbon-statistics/config/config`, { ...params }, COMMON_UPDATE_CONFIG);
}
