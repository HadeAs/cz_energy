/*
 * @Author: Zhicheng Huang
 * @Date: 2023-12-19 17:23:01
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-22 16:12:13
 * @Description:
 */
import { useGlobal } from "./global";
import { useCounter } from "./counter";

const appStore = {};

/**
 * 注册app状态库
 */
export function registerStore() {
  appStore.global = useGlobal();
  appStore.counter = useCounter();
}

export default appStore;
