/*
 * @Author: Zhicheng Huang
 * @Date: 2023-12-19 16:52:42
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-27 15:14:22
 * @Description:
 */
import { defineConfig } from "vite";
import { resolve } from "node:path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import ViteSvgPlugin from "vite-plugin-svg";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  server: {
    host: "localhost",
    port: 9999,
    strictPort: true,
    open: true,
  },
  resolve: {
    alias: {
      "@/": `${resolve(__dirname, "src")}/`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;`,
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
        }),
      ],
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
        }),
      ],
    }),
    ViteSvgPlugin(),
  ],
});
