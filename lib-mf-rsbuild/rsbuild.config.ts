import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin'
export default defineConfig({
  server: {
    port: 4010,
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'rsbuild-mf-components',
      exposes: {
        '.': './src/App.tsx'
      }
    })
  ]
});
