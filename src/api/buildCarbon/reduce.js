import http from '@/api/http.js';
import { COMMON_UPDATE_CONFIG } from '@/api/index.js';

export const getList = (params) => {
  if (!params?.standardId) return { data: { data: [] } };
  return http.get(`web/carbon-reduce/config/query`, { ...params });
}

export const configReduce = (params) => {
  return http.post('web/carbon-reduce/config/config', params, COMMON_UPDATE_CONFIG)
}

export const getRewardData = (params) => {
  if (!params?.standardId) return { data: { data: [] } };
  return http.get(`web/carbon-reduce/query-reward`, { ...params });
}
