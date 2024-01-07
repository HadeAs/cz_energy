import http from '@/api/http.js';
import { COMMON_UPDATE_CONFIG } from '@/api/index.js';

export const getList = (params) => {
  // const param = getProjectId(params);
  return http.get(`admin/role/query`, params);
}

export const updateRoleInfo = (params) => {
  return http.post('admin/role/save', params, { ...COMMON_UPDATE_CONFIG })
}

export const deleteRoleInfo = (params) => {
  return http.post('admin/role/delete', params, { ...COMMON_UPDATE_CONFIG })
}

export const distributeRoleAuth = (params) => {
  return http.post('admin/role/grant', params, { ...COMMON_UPDATE_CONFIG })
}