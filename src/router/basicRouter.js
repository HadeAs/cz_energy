/*
 * @Author: Zhicheng Huang
 * @Date: 2023-12-19 19:13:50
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-24 17:06:27
 * @Description:
 */
const BasicRouter = [
  {
    path: "/login",
    name: "Login",
    hidden: true,
    component: () =>
      import(/* webpackChunkName: "loginPage" */ "@/pages/login/index.vue"),
  },
  {
    path: "/404",
    name: "404",
    hidden: true,
    component: () =>
      import(/* webpackChunkName: "404" */ "@/pages/error/404.vue"),
  },
  {
    path: "/deviceDetail/:id",
    name: "deviceDetail",
    component: () =>
      import(
        /* webpackChunkName: "deviceDetail" */ "@/pages/operationMgr/deviceMaintain/components/deviceDetail.vue"
      ),
  },
];

export default BasicRouter;
