import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import pkg from './package.json';
export default defineConfig({
  server: {
    port: 4010,
  },
  html: {
    title: 'rsbuild app'
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: pkg.name,
      remotes: {
        // 'provider': 'lib-mf-rslib@http://localhost:4000/mf_provider.js',
        // 'provider': 'mf_provider@http://localhost:4000/mf-manifest.json',
        // 'provider': 'rsbuild_mf_components@http://localhost:4070/mf-manifest.json',
        // 'provider': 'rsbuild_mf_components@http://localhost:4070/remoteEntry.js',
        'provider': 'mf_webpack@http://localhost:4080/remoteEntry.js',
      },
      // shareStrategy: 'loaded-first',
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    })
  ],
});
