/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import styleImport from "vite-plugin-style-import";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import generateModifyVars from "./build/style/generateModifyVars";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()],
      dts: true,
    }),
    styleImport({
      libs: [
        {
          libraryName: "ant-design-vue",
          esModule: true,
          resolveStyle: (name) => `ant-design-vue/es/${name}/style/index`,
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: generateModifyVars(),
        javascriptEnabled: true,
      },
    },
  },
});
