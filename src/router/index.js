import Index from '@/pages/index/index.vue'
import Oto from '@/pages/oto/index.vue'
import Contact from '@/pages/contact/index.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'index', component: Index },
  { path: '/oto', name: 'oto', component: Oto },
  { path: '/contact', name: 'contact', component: Contact },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  // Dùng hash history để tránh lỗi refresh trên GitHub Pages
  history: createWebHashHistory(),
  routes
})

export default router
