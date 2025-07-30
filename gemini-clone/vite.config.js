import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.GOOGLE_GEMINI_KEY': JSON.stringify(env.GOOGLE_GEMINI_KEY)
    },
    plugins: [react()],
  }
})