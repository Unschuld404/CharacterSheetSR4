import {uid} from "@/composables/uid";
import {char} from "@/composables/char";
import {data} from "@/composables/data";
import {sheet_data} from "@/composables/sheet";

const basePath = 'https://api.blackserver.de/chummer';

export async function uploadSheet(): Promise<void> {
    if (uid.value === null)
    {
        console.error('Error: uid not set');
        return;
    }

    let sheet = char.sheet;
    const character_url =`${basePath}/character/${encodeURIComponent(uid.value)}`;

    try {
        const response = await fetch(character_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sheet.toJSON()),
        });

        if (!response.ok)
        {
            let  error_message = `API Error ( ${ response.status }): ${ response.statusText } ${ await response.text() } `;
            console.error(error_message);

            // noinspection ExceptionCaughtLocallyJS
            throw new Error(error_message);
        }

        console.log(`Daten für ${ uid.value } erfolgreich hochgeladen.`);
    } catch (error) {
        console.error('Fehler beim Hochladen der Daten:', error);
        throw error;
    }
}

async function fetchDataFromAPI(url: string): Promise<any>
{
    try
    {
        let response = await fetch(url);
        if (!response.ok)
        {
            let  error_message = `API Error ( ${ response.status }): ${ response.statusText } ${ await response.text() } `;
            console.error(error_message);

            // noinspection ExceptionCaughtLocallyJS
            throw new Error(error_message);
        }
        return await response.json();
    }
    catch (error: any)
    {
        console.error('Connection Error:', error);
        throw error;
    }
}

export async function fetchFromAPI()
{
    if (uid.value == null || uid.value == '')
    {
        console.error('Error: uid not set');
        return;
    }

    const data_url = `${basePath}/data/${encodeURIComponent(uid.value)}`;
    const character_url =`${basePath}/character/${encodeURIComponent(uid.value)}`;

    try {
        const [fetchedData, fetchedSheetData] = await Promise.all([
            fetchDataFromAPI(data_url),
            fetchDataFromAPI(character_url)
        ]);

        data.value = fetchedData;
        sheet_data.value = fetchedSheetData;

        char.update(data.value, sheet_data.value);
        console.log('fetchFromAPI: data loaded for ' + (data.value?.name ?? 'unknown'));
    } catch (error)
    {
        console.error('Fehler beim Laden der Daten:', error);
    }
}
