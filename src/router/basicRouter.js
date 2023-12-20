/*
 * @Author: Zhicheng Huang
 * @Date: 2023-12-19 19:13:50
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-19 19:27:52
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
];

export default BasicRouter;
