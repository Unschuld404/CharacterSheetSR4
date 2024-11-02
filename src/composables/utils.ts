export function toInt(value: string|number|undefined|null): number {
    if (value === undefined || value === null) {
        return 0;
    }

    let num;

    if (typeof value === 'number') {
        num = Number(value);
    }
    else
    {
        num = parseInt(value, 10);
    }

    if (isNaN(num))
    {
        return 0;
    }

    return num;
}

export function toArray(valuesAsString: string | null): string[] {
    if (valuesAsString === null)
    {
        return [];
    }
    return valuesAsString
        .split(',')
        .map(item => item.trim())
        .filter(item => item.length > 0);
}