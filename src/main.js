/*
 * @Author: Zhicheng Huang
 * @Date: 2023-12-19 16:52:42
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-22 10:27:32
 * @Description:
 */
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "@/router";
import { registerStore } from "@/store";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "@/styles/index.scss";
import "element-plus/es/components/message/style/css";
import "element-plus/es/components/message-box/style/css";

const pinia = createPinia();
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router);
app.use(pinia);
registerStore();

app.mount("#energyapp");