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
  server: {
    port: 4020,
  },
  plugins: [
    pluginReact(),
  ],
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
      tools: {
        // see github issue https://github.com/web-infra-dev/rslib/issues/1003#issuecomment-2889985244
        rspack: (config) => {
          config.experiments = {
            outputModule: true
          }
        },
      },
      output: {
        // set unpkg cdn as assetPrefix if you want to publish
        assetPrefix: `http://localhost:4020`,
        distPath: {
          root: './dist/mf',
        },
      },
      plugins: [
        pluginModuleFederation({
          name: pkg.name, // rslib-mf-components
          // name: 'mf-components', // 组件库名称
          // filename: 'remoteEntry.js', // 远程入口文件名
          exposes: {

            '.': './src/index.tsx',
            './core': './src/index.tsx',
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

});
