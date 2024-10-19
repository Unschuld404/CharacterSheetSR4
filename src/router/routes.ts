import type { RouteRecordRaw } from "vue-router";
import Hub from "@/views/Hub.vue";
import Fertigkeiten from "@/views/Fertigkeiten.vue";
import Waffen from "@/views/Waffen.vue";
import Magie from "@/views/Magie.vue";
import Fahrzeuge from "@/views/Fahrzeuge.vue";

export const menuRoutes: Array<RouteRecordRaw> = [
    {
        path: '/vehicles',
        name: 'Fahrzeuge',
        component: Fahrzeuge,
        icon: 'bx bxs-invader'
    },
    {
        path: '/weapons',
        name: 'Waffen',
        component: Waffen,
        icon: 'bx bxs-backpack'
    },
    {
        path: '/',
        name: 'root',
        component: Hub,
        icon: 'bx bx-street-view' // icon class for boxicon
    },
    {
        path: '/skills',
        name: 'Fertigkeiten',
        component: Fertigkeiten,
        icon: 'bx bxs-joystick'
    },
    {
        path: '/magic',
        name: 'Magie',
        component: Magie,
        icon: 'bx bxs-magic-wand'
    },
];