import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Base path for the built assets. If you host at https://<user>.github.io/<repo>/
  // set this to '/<repo>/'. For local or root domain use '/'.
  base: '/hondaTienGiang/',
  plugins: [vue(), vueDevTools(), tailwindcss()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } }
})
