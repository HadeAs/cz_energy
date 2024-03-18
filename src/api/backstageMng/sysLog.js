import http from '@/api/http.js';

export const getLoginLog = (params) => {
  return http.get(`admin/log/login-log/query`, params);
}

export const getOperationLog = (params) => {
  return http.get(`admin/log/operation-log/query`, params);
}

export const getAlarmLog = (params) => {
  return http.get(`admin/log/alarm/query`, params);
}