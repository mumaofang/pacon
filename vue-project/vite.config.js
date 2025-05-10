import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import viteCompression from 'vite-plugin-compression'
import AutoImport from 'unplugin-auto-import/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/auto-imports.d.ts'
    }),
    viteCompression()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url))
    },
  },
  server: {
    port: 3001, // 端口号
    open: true, // 自动打开浏览器
    proxy: { // 代理配置
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist', // 输出目录
    assetsInlineLimit: 4096, // 小于 4KB 的资源转为 base64
    rollupOptions: { // Rollup 打包配置
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  },
  // CSS 预处理器配置
  css: {
    preprocessorOptions: {
      less: {
        math: "always", // 可选：启用 Less 数学计算（如：width: 100% - 20px）
        javascriptEnabled: true // 可选：启用内联 JavaScript（某些旧插件可能需要）
      }
    }
  }
})
