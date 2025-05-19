import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  server: {
    port: 4040,
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'mf-zlib-app',
      remotes: {
        'rslib-mf-components': "rslib-mf-components@http://localhost:4020/mf-manifest.json"
      },
      shareStrategy: 'loaded-first',
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    })
  ],
});
