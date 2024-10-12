import { createRouter, createWebHistory } from 'vue-router'
import Hub from "@/views/Hub.vue";
import Fertigkeiten from "@/views/Fertigkeiten.vue";
import Waffen from "@/views/Waffen.vue";
import Magie from "@/views/Magie.vue";
import Fahrzeuge from "@/views/Fahrzeuge.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: Hub
    },
    {
      path: '/Hub',
      name: 'Hub',
      component: Hub
    },
    {
      path: '/Fertigkeiten',
      name: 'Fertigkeiten',
      component: Fertigkeiten
    },
    {
      path: '/Waffen',
      name: 'Waffen',
      component: Waffen
    },
    {
      path: '/Magie',
      name: 'Magie',
      component: Magie
    },
    {
      path: '/Fahrzeuge',
      name: 'Fahrzeuge',
      component: Fahrzeuge
    },
  ]
})

export default router
