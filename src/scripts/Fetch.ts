import { data } from './Data';

export async function fetchData(): Promise<void> {
    try {
        const response = await fetch('https://api.blackserver.de/chummer/data/Emmy');
        if (!response.ok) {
            throw new Error(`API Fehler: ${response.status}`);
        }
        data.value = await response.json();
        console.log('Daten geladen:', data.value);
    } catch (error: any) {
        console.error('Fehler beim Laden der Daten:', error.message);
    }
}