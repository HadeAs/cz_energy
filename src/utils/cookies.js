/*
 * @Author: ymZhang
 * @Date: 2024-01-05 22:55:06
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-05 22:55:26
 * @Description: 
 */
import Cookies from "js-cookie";

export const getCookie = (key) => {
  return Cookies.get(key);
};