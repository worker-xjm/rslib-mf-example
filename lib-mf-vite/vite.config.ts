import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'
// https://vite.dev/config/
export default defineConfig({
  build: {
    target: 'chrome89'
  },
  plugins: [
    federation({
      dts: true,
      name: 'vite_mf_components',
      manifest: true,
      filename: 'remoteEntry.js',
      exposes: {
        '.': './src/App.tsx',
      },
      library: {
        type: 'module',
      },
      shared: {
        react: {
          singleton: true,
        },
        'react/': {
          singleton: true,
        },
      },
    }),
    react(),
  ],
})
