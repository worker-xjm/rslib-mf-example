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
      // manifest: true,
      remotes: {
        // rslib worked
        'rslib_mf_manifest': 'mf_provider@http://localhost:4000/mf-manifest.json',
        // rslib worked
        'rslib_remoteEntry': "mf_provider@http://localhost:4000/mf_provider.js",
        // rsbuild worked
        'rsbuild_mf_manifest': 'rsbuild_mf_components@http://localhost:4070/mf-manifest.json',
        // rsbuild worked
        'mf_rsbuild_remoteEntry': 'rsbuild_mf_components@http://localhost:4070/remoteEntry.js',
        // use lib-mf-vite worked
        'vite_mf_manifest': 'vitemfc@http://localhost:4050/mf-manifest.json',
        // webpack is worked
        'webpack_remoteEntry': 'remote_mf_webpack@http://localhost:4080/remoteEntry.js',
        // cant't be work on original webpack mf
        // 'mf_webpack_components': 'eipReactCommonAssets@http://localhost:9999/remoteEntry.js'
      },
      // shareStrategy: 'loaded-first',
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
