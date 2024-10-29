import {char, data, Sheet} from "@/composables/data";

const basePath = 'https://api.blackserver.de/chummer';

export async function uploadSheet(uid: string, sheet: Sheet): Promise<void> {
    const url = `${basePath}/character/${encodeURIComponent(uid)}`;

    try {
        const response = await fetch(url, {
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

        console.log('Daten erfolgreich hochgeladen!');
    } catch (error) {
        console.error('Fehler beim Hochladen der Daten:', error);
        throw error;
    }
}

export async function fetchFromAPI(uid: string)
{
    if (uid == null || uid == '')
    {
        console.error('Error: uid not set');
        return;
    }

    if (data.value !== null)
    {
        console.log('fetchFromAPI: has data for ' + data.value.name);
        return;
    }

    const url = basePath + '/data/' + encodeURIComponent(uid);

    try
    {
        const response = await fetch(url);
        if (!response.ok)
        {
            let  error_message = `API Error ( ${ response.status }): ${ response.statusText } ${ await response.text() } `;
            console.error(error_message);

            // noinspection ExceptionCaughtLocallyJS
            throw new Error(error_message);
        }
        data.value = await response.json();
        char.update(data.value);
    }
    catch (error: any)
    {
        console.error('Connection Error:', error);
        throw error;
    }

    console.log('fetchFromAPI: data loaded for ' + (data?.value?.name ?? 'unknown'));
}
