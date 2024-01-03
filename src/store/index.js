/*
 * @Author: Zhicheng Huang
 * @Date: 2023-12-19 17:23:01
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2024-01-03 10:23:48
 * @Description:
 */
import { useGlobal } from "./global";

const appStore = {};

/**
 * 注册app状态库
 */
export function registerStore() {
  appStore.global = useGlobal();
}

export default appStore;
