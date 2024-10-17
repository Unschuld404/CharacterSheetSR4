import { createRouter, createWebHistory } from 'vue-router'
import { menuRoutes } from "@/router/routes";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: menuRoutes,
})

export default router
