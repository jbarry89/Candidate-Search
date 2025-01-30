import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE'); // Ensure VITE_ prefix is loaded

  return {
    plugins: [react()],
    define: {
      'process.env': env, // Expose env variables
    },
  };
});