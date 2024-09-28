import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({

  base: "/vite_hou/",
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),

  ],
  resolve: {
    // ↓路径别名
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  server: {
      proxy: {
        // 匹配所有以 '/v3pz' 开头的请求
        '/v3pz': {
          target: 'https://v3pz.itndedu.com/', // 目标服务器
          changeOrigin: true, // 推荐开启
          rewrite: (path) => path.replace(/^\/v3pz/, '/v3pz'), // 重写路径
        }, 
  
      },
    },

})
