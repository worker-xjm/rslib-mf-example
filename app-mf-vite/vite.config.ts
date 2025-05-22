import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'
import pkg from './package.json';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: pkg.name,
      manifest: true,
      remotes: {
        // rslib worked
        'mf_provider': { // key是远程代码引用的模块 name 值
          type: 'module',
          name: 'rslib_remote_mf_manifest', //  这个是用来在本地代码应用的模块
          entry: 'http://localhost:4000/mf-manifest.json',
          // entryGlobalName: 'mf_provider_remote'
        },
        // rslib worked
        'mf_provider_remoteEntry': "mf_provider@http://localhost:4000/mf_provider.js",
        // rsbuild worked
        'rsbuild_mf_components': { // 此key对应远程的 模块联邦的name
          type: 'module',
          name: 'rsbuild_manifest_lib', // 在应用中使用此名字引入使用
          entry: 'http://localhost:4070/mf-manifest.json',
        },
        // rsbuild worked
        'mf_rsbuild_remoteEntry': 'rsbuild_mf_components@http://localhost:4070/remoteEntry.js',
        // use lib-mf-vite cant't be work 
        /* 'mf_vite_components': {
          type: 'module',
          name: 'vite_mf_components',
          entry: 'http://localhost:4060/remoteEntry.js',
          entryGlobalName: "vite_mf_components",
          shareScope: "default",
        }, */
        //  use lib-mf-vite cant't be work
        // 'mf_vite_components': 'vite_mf_components@http://localhost:4060/remoteEntry.js',
        // webpack is worked
        'mf_webpack_components': 'remote_mf_webpack@http://localhost:4080/remoteEntry.js',
        // cant't be work on original webpack mf
        // 'mf_webpack_components': 'eipReactCommonAssets@http://localhost:9999/remoteEntry.js'
      },
      shared: {
        react: {
          singleton: true,
        },
        'react-dom': {
          singleton: true,
        },
      },
    })
  ],
})
