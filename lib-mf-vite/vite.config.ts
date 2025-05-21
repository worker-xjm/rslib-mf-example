import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'
// https://vite.dev/config/
export default defineConfig({
  build: {
    target: 'es2020'
  },
  server: {
    port: 4050,
  },
  preview: {
    port: 4060
  },

  plugins: [
    federation({
      // dts: true,
      name: 'vite_mf_components',
      manifest: true,
      filename: 'remoteEntry.js',
      exposes: {
        '.': './src/App.tsx',
      },

      shared: {
        react: {
          singleton: true,
        },
        'react-dom': {
          singleton: true,
        },
      },
    }),
    react(),
  ],
})
