/*
 * @Author: ymZhang
 * @Date: 2024-01-08 09:36:41
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-08 20:28:40
 * @Description: 
 */
import http from '@/api/http.js';
import { COMMON_UPDATE_CONFIG, COMMON_JSON_CONFIG } from '@/api/index.js';

export const PORT = "admin";
export const getList = (params) => {
  // const param = getProjectId(params);
  return http.get(`${PORT}/user/query`, params);
}

export const getUserInfo = (params) => {
  return http.get(`${PORT}/user/find-one`, params);
}

export const updateUserInfo = (params) => {
  return http.post('admin/user/save', params, { ...COMMON_JSON_CONFIG })
}

export const deleteUserInfo = (params) => {
  return http.post('admin/user/delete', params, { ...COMMON_UPDATE_CONFIG })
}