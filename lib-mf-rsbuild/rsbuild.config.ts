import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin'
import pkg from './package.json';
export default defineConfig({
  server: {
    port: 4070,
  },
  /* moduleFederation: {
     options: {
       name: pkg.name,
       filename: 'remoteEntry.js',
       exposes: {
         '.': './src/App.tsx'
       }
     }
 
   }, */
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: pkg.name,
      filename: 'remoteEntry.js',
      exposes: {
        '.': './src/App.tsx'
      }
    })
  ]
});
