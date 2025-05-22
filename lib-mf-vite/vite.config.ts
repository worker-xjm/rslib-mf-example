import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'
// import pkg from './package.json'
// https://vite.dev/config/
export default defineConfig({

  server: {
    port: 4050,
    origin: 'http://localhost:4050',
  },
  preview: {
    port: 4060
  },

  plugins: [
    federation({
      // dts: true, // 无效选项 see https://module-federation.io/zh/guide/basic/vite.html#vite-plugin
      name: 'vitemfc',
      exposes: {
        '.': './src/App.tsx',
        './app': './src/App.tsx',
      },
      filename: 'remoteEntry.js', // 必须要有,否则将导致入口文件不正常
      manifest: true,

      shared: {
        react: {
          singleton: true,
        },
        'react-dom': {
          singleton: true,
        },
      },
    }),
    react(),
  ],
  build: {
    target: 'chrome89', // 注释此行将导致不可打包 
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    },
  },
})
