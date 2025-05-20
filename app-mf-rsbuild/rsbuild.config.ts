import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import pkg from './package.json';
export default defineConfig({
  server: {
    port: 4010,
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: pkg.name,
      remotes: {
        // 'provider': 'rslib_provider@https://unpkg.com/module-federation-rslib-provider@latest/dist/mf/mf-manifest.json',
        // 'provider': 'lib-mf-rslib@http://localhost:4000/remoteEntry.js',
        'provider': 'mf_provider@http://localhost:4000/mf-manifest.json',
      },
      // shareStrategy: 'loaded-first',
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    })
  ],
});
