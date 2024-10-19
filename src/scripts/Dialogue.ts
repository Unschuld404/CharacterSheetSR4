import { ref } from 'vue';

export function useRollDialogue() {
    const showModal = ref(false);

    function openModal() {
        showModal.value = true;
    }

    function closeModal() {
        showModal.value = false;
    }

    return {
        showModal,
        openModal,
        closeModal,
    };
}
