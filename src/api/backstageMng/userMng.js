import http from '@/api/http.js';
import { COMMON_UPDATE_CONFIG } from '@/api/index.js';

export const PORT = "admin";
export const getList = (params) => {
  // const param = getProjectId(params);
  return http.get(`${PORT}/user/query`, params);
}

export const updateUserInfo = (params) => {
  return http.post('admin/user/save', params, { ...COMMON_UPDATE_CONFIG })
}

export const deleteUserInfo = (params) => {
  return http.post('admin/user/delete', params, { ...COMMON_UPDATE_CONFIG })
}