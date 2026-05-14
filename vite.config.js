import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      'fb18818aa4cc5af3-103-247-15-83.serveousercontent.com',
      '.serveousercontent.com',
      '.loca.lt'
    ]
  }
})