import {GearType, type IdObject, type SelectedItem, Spell} from "@/composables/types";
import {translations} from "@/composables/consts";
import {Spirit} from "@/composables/spirits";
import {Weapon} from "@/composables/weapons";
import {Vehicle} from "@/composables/vehicle";

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
export function toBool(value: string|boolean|undefined|null): boolean {
    if (value === undefined || value === null) {
        return false;
    }

    if (typeof value === 'boolean') {
        return value;
    }

    return value === 'true'
        || value === 'True'
        || value === '1';
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

function isIdObject(obj: any): obj is IdObject {
    return obj && typeof obj.generateId === 'function';
}

export function toSelectedItem(obj: any): SelectedItem {
    return {
        type: obj?.constructor?.name ?? '',
        id: isIdObject(obj) ? obj.generateId() : obj?.toString() ?? '',
    }
}

export function selectedItemEquals(item1: SelectedItem, item2: SelectedItem): boolean {
    return item1.type === item2.type && item2.id === item1.id;
}

export function toGearType(data_item: any): GearType {
    if (toBool(data_item.iscommlink))
    {
        return GearType.Commlink;
    }

    if (toBool(data_item.ispersona))
    {
        return GearType.Persona;
    }

    if (toBool(data_item.isnexus))
    {
        return GearType.Nexus;
    }

    if (toBool(data_item.isammo))
    {
        return GearType.Ammo;
    }

    if (toBool(data_item.isprogram))
    {
        return GearType.Program;
    }

    if (toBool(data_item.isos))
    {
        return GearType.OS;
    }

    if (toBool(data_item.issin))
    {
        return GearType.SIN;
    }

    return GearType.Other;
}

export function translate(value: string): string
{
    return translations[value] ?? value;
}