import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'
import pkg from './package.json';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: pkg.name,
      manifest: true,
      remotes: {
        'mf_provider': {
          type: 'module',
          name: 'mf_provider',
          entry: 'http://localhost:4000/mf-manifest.json',
        },
        'mf_rsbuild_components': {
          type: 'module',
          name: 'mf_rsbuild_components',
          entry: 'http://localhost:4070/mf-manifest.json',
        },
        'mf_vite_components': {
          type: 'module',
          name: 'vite_mf_components',
          entry: 'http://localhost:4173/mf-manifest.json',
        },
      },
      shared: {
        react: {
          singleton: true,
        },
        'react-dom': {
          singleton: true,
        },
      },
    })
  ],
})
