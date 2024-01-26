/*
 * @Author: ymZhang
 * @Date: 2024-01-26 12:21:50
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-26 12:52:30
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