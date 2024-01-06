/*
 * @Author: ymZhang
 * @Date: 2024-01-06 00:03:17
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-06 12:37:09
 * @Description: 
 */
import http from "../http";
import { getProjectId } from "./index";

export const PORT = "web";
export const getList = (params) => {
  // const param = getProjectId(params);
  return http.get(`${PORT}/equipment-model/query`, params);
}