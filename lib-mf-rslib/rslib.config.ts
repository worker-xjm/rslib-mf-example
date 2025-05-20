import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import pkg from './package.json';

const shared = {
  dts: {
    bundle: false,
  },
};

export default defineConfig({
  lib: [
    {
      ...shared,
      format: 'esm',
      output: {
        distPath: {
          root: './dist/esm',
        },
      },
    },
    {
      ...shared,
      format: 'cjs',
      output: {
        distPath: {
          root: './dist/cjs',
        },
      },
    },
    {
      ...shared,
      format: 'mf',
      output: {
        // set unpkg cdn as assetPrefix if you want to publish
        assetPrefix: 'http://localhost:4000',
        distPath: {
          root: './dist/mf',
        },
      },
      plugins: [
        pluginModuleFederation({
          name: 'mf_provider',
          exposes: {
            './core': './src/index',
            '.': './src/index.tsx',
          },

          shared: {
            react: {
              singleton: true,
              requiredVersion: pkg.dependencies.react,
            },
            'react-dom': {
              singleton: true,
              requiredVersion: pkg.dependencies['react-dom'],
            },

          },
        })
      ]
    },
  ],
  server: {
    port: 4000,
  },
  plugins: [
    pluginReact(),

  ],
});
