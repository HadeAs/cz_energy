import http from '@/api/http.js';
import { COMMON_UPDATE_CONFIG } from '@/api/index.js';

export const getList = (params) => {
  // const param = getProjectId(params);
  return http.get(`admin/gateway/query`, params);
}

export const updateGateway = (params) => {
  return http.post('admin/gateway/save', params, { ...COMMON_UPDATE_CONFIG })
}

export const deleteGateway = (params) => {
  return http.post('admin/gateway/delete', params, { ...COMMON_UPDATE_CONFIG })
}