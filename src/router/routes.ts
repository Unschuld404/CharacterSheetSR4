import type { RouteRecordRaw } from "vue-router";
import Hub from "@/views/Hub.vue";
import Character from "@/views/Character.vue";
import Vehicles from "@/views/Vehicles.vue";
import Magic from "@/views/Magic.vue";
import Skills from "@/views/Skills.vue";
import Inventory from "@/views/Inventory.vue";

export const menuRoutes: Array<RouteRecordRaw> = [
    {
        path: '/character',
        name: 'Character',
        component: Character,
        icon: 'bx bx-dna'
    },
    {
        path: '/vehicles',
        name: 'Vehicles',
        component: Vehicles,
        icon: 'bx bxs-plane-alt'
    },
    {
        path: '/inventory',
        name: 'Inventory',
        component: Inventory,
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
        name: 'Skills',
        component: Skills,
        icon: 'bx bxs-joystick'
    },
    {
        path: '/magic',
        name: 'Magic',
        component: Magic,
        icon: 'bx bxs-magic-wand'
    },
];