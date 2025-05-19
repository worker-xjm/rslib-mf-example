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
        assetPrefix:
          process.env.NODE_ENV === 'production'
            ? `http://localhost:4000`
            : undefined,
        distPath: {
          root: './dist/mf',
        },
      },
      plugins: [
        pluginModuleFederation({
          name: pkg.name,
          // name: 'mf-components', // 组件库名称
          // filename: 'remoteEntry.js', // 远程入口文件名
          exposes: {
            '.': './src/index.tsx',
          },

          shared: {
            react: {
              singleton: true,
            },
            'react-dom': {
              singleton: true,
            },
          },
          library: {
            type: 'module',
          },
        })
      ]
    },
  ],
  server: {
    port: 4000,
  },
  plugins: [pluginReact(),],
});
