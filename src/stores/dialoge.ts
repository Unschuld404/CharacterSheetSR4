import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDialogeStore = defineStore('dialoge', () => {
    const isVisible = ref(false);

    function show() {
        isVisible.value = true;
    }

    function hide() {
        isVisible.value = false;
    }

    return { isVisible, show, hide };
});
