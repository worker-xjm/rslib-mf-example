import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import pkg from './package.json';
export default defineConfig({
  server: {
    port: 4010,
    proxy: {
      '/assets': {
        target: 'http://localhost:4060',
        changeOrigin: true,
      }
    }
  },
  html: {
    title: 'rsbuild app'
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: pkg.name,
      remotes: {
        'rslib_provider': 'mf_provider@http://localhost:4000/mf_provider.js',
        'rslib_manifest_provider': 'mf_provider@http://localhost:4000/mf-manifest.json',
        'rsbuild_provider': 'rsbuild_mf_components@http://localhost:4070/mf-manifest.json',
        'rsbuild_manifest_provider': 'rsbuild_mf_components@http://localhost:4070/remoteEntry.js',
        // 'vite_mf_components': 'vite_mf_components@http://localhost:4060/remoteEntry.js',
        // 'vite_mf_manifest_provider': 'vite_mf_components@http://localhost:4060/mf-manifest.json',
        'mf_wp': 'remote_mf_webpack@http://localhost:4080/remoteEntry.js', //  will be websoket error, worked
        // 'mf_wp_origin': 'eipReactCommonAssets@http://localhost:9999/remoteEntry.js', //  cant't work
      },
      // shareStrategy: 'loaded-first', 
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    })
  ],
});
