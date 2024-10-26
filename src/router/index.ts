import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'
import {uid} from "@/composables/uid";
import {fetchFromAPI} from "@/composables/fetch";
import Hub from "@/views/Hub.vue";
import Character from "@/views/Character.vue";
import Vehicles from "@/views/Vehicles.vue";
import Inventory from "@/views/Inventory.vue";
import Skills from "@/views/Skills.vue";
import Magic from "@/views/Magic.vue";
import Load from "@/components/Load.vue";
import Error from "@/views/Error.vue";


export type RouterMenuRecord = RouteRecordRaw & {
  icon: string,
}

export const menuRoutes: Array<RouterMenuRecord> = [
  {
    path: 'hub',
    name: 'Hub',
    component: Hub,
    icon: 'bx bx-street-view',
  },
  {
    path: 'character',
    name: 'Character',
    component: Character,
    icon: 'bx bx-dna',
  },
  {
    path: 'vehicles',
    name: 'Vehicles',
    component: Vehicles,
    icon: 'bx bxs-plane-alt',
  },
  {
    path: 'inventory',
    name: 'Inventory',
    component: Inventory,
    icon: 'bx bxs-backpack',
  },
  {
    path: 'skills',
    name: 'Skills',
    component: Skills,
    icon: 'bx bxs-joystick',
  },
  {
    path: 'magic',
    name: 'Magic',
    component: Magic,
    icon: 'bx bxs-magic-wand',
  },
];

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/load',
    name: 'Load',
    component: Load,
  },
  {
    path: '/error',
    name: 'Error',
    component: Error,
  },
  {
    path: '/',
    redirect: '/load',
  },
  {
    path: '/:uid',
    redirect: '/:uid/hub',
    children: menuRoutes,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  const routeUid = to.params.uid as string | null;
  if (routeUid != null)
  {
    uid.value = routeUid;

    void fetchFromAPI(routeUid)
        .catch(
        error => {
          console.error(error);
          next({ name: 'Error' });
        }
    );

    next();
  }
  else if (to.name !== 'Load')
  {
    next({ name: 'Load' });
  }
  else
  {
    next();
  }
})

export default router
