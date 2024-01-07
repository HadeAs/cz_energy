import http from '@/api/http.js';

export const getLoginLog = (params) => {
  return http.get(`admin/login-log/query`, params);
}

export const getOperationLog = (params) => {
  return http.get(`admin/operation-log/query`, params);
}

export const getAlarmLog = (params) => {
  return http.get(`admin/alarm/query`, params);
}