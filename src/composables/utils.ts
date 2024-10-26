export function toInt(value: string): number {
    let num = parseInt(value, 10);

    if (isNaN(num)) {
        return 0;
    }
    return num;
}