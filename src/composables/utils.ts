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