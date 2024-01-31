/*
 * @Author: ymZhang
 * @Date: 2024-01-26 12:21:50
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-30 18:13:48
 * @Description: 
 */
import http from '@/api/http.js';

const PORT = "web";
export const queryCarbonSummaryUp = (params) => {
  return http.get(`${PORT}/index/carbon-summaries/total-carbon`, params);
};
export const queryCarbonSummaryDown = (params) => {
  return http.get(`${PORT}/index/carbon-summaries/carbon-statistics`, params);
};
export const queryCarbonRank = (params) => {
  return http.get(`${PORT}/index/project-carbon-rank/summary`, params);
};
export const queryCarbonTotal = (params) => {
  return http.get(`${PORT}/index/project-carbon-rank/intensity`, params);
};
export const queryCarbonTrend = (params) => {
  return http.get(`${PORT}/index/carbon-base`, params);
};

export const queryOverview = (params) => {
  return http.get(`${PORT}/index/project-index`, params);
};

export const queryCarbonProcess = (params) => {
  return http.get(`${PORT}/index/carbon-nt-process`, params);
};

export const queryCarbonMethod = (params) => {
  return http.get(`${PORT}/index/carbon-reduce-method`, params);
};

export const queryYearRate = (params) => {
  return http.get(`${PORT}/index/carbon-reduce-eval/year`, params);
};
export const queryAllRate = (params) => {
  return http.get(`${PORT}/index/carbon-reduce-eval/total`, params);
};