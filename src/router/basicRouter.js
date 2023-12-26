/*
 * @Author: Zhicheng Huang
 * @Date: 2023-12-19 19:13:50
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-25 16:30:26
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
        /* webpackChunkName: "deviceDetail" */ "@/pages/operationMgr/deviceMaintain/components/deviceDetail/index.vue"
      ),
  },
  {
    path: "/equipmentDetail/:id",
    name: "equipmentDetail",
    component: () =>
      import(
        /* webpackChunkName: "equipmentDetail" */ "@/pages/operationMgr/deviceMaintain/components/equipmentDetail/index.vue"
      ),
  },
];

export default BasicRouter;
