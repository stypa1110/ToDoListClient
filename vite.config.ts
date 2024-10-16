import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        format: 'es'
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    },
    extensions: ['.ts', '.js', '.vue', '.json']
  }
});
