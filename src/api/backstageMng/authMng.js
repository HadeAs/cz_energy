/*
 * @Author: ymZhang
 * @Date: 2024-01-09 09:30:03
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-09 13:10:44
 * @Description: 
 */
import http from '@/api/http.js';
import { COMMON_JSON_CONFIG, COMMON_SUBMIT_CONFIG, COMMON_UPDATE_CONFIG } from '@/api/index.js';

export const getList = (params) => {
  // const param = getProjectId(params);
  return http.get(`admin/role/query`, params);
}

export const updateRoleInfo = (params) => {
  return http.post('admin/role/save', params, { ...COMMON_SUBMIT_CONFIG })
}

export const deleteRoleInfo = (params) => {
  return http.post('admin/role/delete', params, { ...COMMON_UPDATE_CONFIG })
}

export const distributeRoleAuth = (params) => {
  return http.post('admin/role/grant', params, { ...COMMON_JSON_CONFIG })
}

export const fetchOneRole = ({ id }) => {
  return http.get('admin/role/find-one', { id }, { ...COMMON_SUBMIT_CONFIG })
}