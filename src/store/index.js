/*
 * @Author: Zhicheng Huang
 * @Date: 2023-12-19 17:23:01
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-05 23:05:48
 * @Description:
 */
import { useGlobal } from "./global";
import { useUserStore } from "./user";

const appStore = {};

/**
 * 注册app状态库
 */
export function registerStore() {
  appStore.global = useGlobal();
  appStore.useUserStore = useUserStore();
}

export default appStore;
