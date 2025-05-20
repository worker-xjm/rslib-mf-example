import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      dts: true,
      name: 'vite_mf_components',
      manifest: true,
      filename: 'remoteEntry.js',
      remotes: {
        'rslib-mf-components': {
          type: 'module',
          name: 'rslib-mf-components',
          entry: 'http://localhost:4020/mf-manifest.json',
          shareScope: 'default',
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
