// src/router/index.ts
import Index from '@/pages/index/index.vue'
import Oto from '@/pages/oto/index.vue'
import Contact from '@/pages/contact/index.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'index', component: Index },
  { path: '/oto', name: 'oto', component: Oto },
  { path: '/contact', name: 'contact', component: Contact },
  // fallback: redirect unknown paths to index
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  // Use hash history to avoid server-side 404s on GitHub Pages
  history: createWebHashHistory(),
  routes
})

export default router
