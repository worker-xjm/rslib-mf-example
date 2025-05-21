import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'
// import pkg from './package.json'
// https://vite.dev/config/
export default defineConfig({
  build: {
    target: 'chrome89', // 注释此行将导致不可打包 
  },
  server: {
    port: 4050,
  },
  preview: {
    port: 4060
  },

  plugins: [
    federation({
      // dts: true, // 无效选项 see https://module-federation.io/zh/guide/basic/vite.html#vite-plugin
      name: 'vite_mf_components',
      manifest: true,
      library: {
        type: 'module',
      },
      filename: 'remoteEntry.js',
      exposes: {
        '.': './src/App.tsx',
      },

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
})
