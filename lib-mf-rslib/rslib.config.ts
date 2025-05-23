import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import pkg from './package.json';
import { pluginLess } from '@rsbuild/plugin-less';

const shared = {
  dts: {
    bundle: false,
  },
};

export default defineConfig({
  resolve: {
    alias: {
      '@': import.meta.resolve('./src'),
    },
  },
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
      /* tools: {
        rspack: (config) => {
          config.experiments = {
            outputModule: true,
          }
        }
      }, */
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
          // name: 'mf-provider', //see issue https://github.com/web-infra-dev/rslib/issues/1003#issuecomment-2903159554
          exposes: {
            '.': './src/index.tsx',
          },
          /* library: {
            type: 'module',
          }, */
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
    pluginLess()
  ],
});
