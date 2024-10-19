import type { RouteRecordRaw } from "vue-router";
import Hub from "@/views/Hub.vue";
import Fertigkeiten from "@/views/Fertigkeiten.vue";
import Waffen from "@/views/Waffen.vue";
import Magie from "@/views/Magie.vue";
import Fahrzeuge from "@/views/Fahrzeuge.vue";

export const menuRoutes: Array<RouteRecordRaw> = [
    {
        path: '/vehicles/:uid?',
        name: 'Fahrzeuge',
        component: Fahrzeuge,
        icon: 'bx bxs-invader'
    },
    {
        path: '/weapons/:uid?',
        name: 'Waffen',
        component: Waffen,
        icon: 'bx bxs-backpack'
    },
    {
        path: '/:uid?',
        name: 'root',
        component: Hub,
        icon: 'bx bx-street-view' // icon class for boxicon
    },
    {
        path: '/skills/:uid?',
        name: 'Fertigkeiten',
        component: Fertigkeiten,
        icon: 'bx bxs-joystick'
    },
    {
        path: '/magic/:uid?',
        name: 'Magie',
        component: Magie,
        icon: 'bx bxs-magic-wand'
    },
];