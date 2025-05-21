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
        // rs lib
        /*  'mf_provider': {
           type: 'module',
           name: 'mf_provider',
           entry: 'http://localhost:4000/mf-manifest.json',
         }, */
        // cant't be work
        'mf_provider': "mf_provider@http://localhost:4000/mf_provider.js",
        // rsbuild
        /* 'mf_rsbuild_components': {
          type: 'module',
          name: 'mf_rsbuild_components',
          entry: 'http://localhost:4070/mf-manifest.json',
        }, */
        'mf_rsbuild_components': 'rsbuild_mf_components@http://localhost:4070/remoteEntry.js',
        // cant't be work
        /* 'mf_vite_components': {
          type: 'module',
          name: 'vite_mf_components',
          entry: 'http://localhost:4050/mf-manifest.json',
          entryGlobalName: "vite_mf_components",
          shareScope: "default",

        }, */
        // cant't be work
        // 'mf_vite_components': 'vite_mf_components@http://localhost:4050/remoteEntry.js',
        // cant't be work
        // 'mf_webpack_components': 'mf_webpack@http://localhost:4080/remoteEntry.js',
        // cant't be work
        // 'mf_webpack_components': 'DymicPublicComponent@http://localhost:9999/remoteEntry.js'
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
