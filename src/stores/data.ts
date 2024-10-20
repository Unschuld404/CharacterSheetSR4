import {defineStore} from "pinia";
import {ref} from "vue";

export const useDataStore = defineStore('data', () => {
    const data = ref<any>(null);

    async function fetchFromAPI(param: string)
    {
        const basePath = 'https://api.blackserver.de/chummer/data/';
        const url = basePath + encodeURIComponent(param.trim());

        try {
            const response = await fetch(url);
            if (!response.ok)
            {
                console.error( `API Error ( ${response.status}): ${response.statusText} ${ await response.text() } `);
            }
            data.value = await response.json();
        }
        catch(error: any) {
            console.error('Connection Error:', error);
        }
    }

    return { data, fetchFromAPI };
});