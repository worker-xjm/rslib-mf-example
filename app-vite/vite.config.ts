import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({

      name: 'vite_mf_components',
      manifest: true,
      remotes: {
        'mf_provider': {
          type: 'module',
          name: 'mf_provider',
          entry: 'http://localhost:4000/mf-manifest.json',
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
