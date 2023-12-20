/*
 * @Author: Zhicheng Huang
 * @Date: 2023-12-19 17:23:01
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-19 17:30:02
 * @Description:
 */
import { useCounter } from "./counter";

const appStore = {};

/**
 * 注册app状态库
 */
export function registerStore() {
  appStore.counter = useCounter();
}

export default appStore;
