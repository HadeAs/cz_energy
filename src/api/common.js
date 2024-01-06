/*
 * @Author: ymZhang
 * @Date: 2024-01-06 10:24:14
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-06 10:28:26
 * @Description: 
 */
import http from './http';

export const PORT = "common";
// 获取项目列表
export const getProjectList = () => {
  return http.get(`${PORT}/project/name-list`);
}