import type {Weapon, WeaponSetting} from "@/composables/types";
import {char} from "@/composables/char";
import {DialogWeapon} from "@/composables/dialogs";

export const shootingMode = [
    { label: 'Einzelschuss', value: 'einzelschuss', count: 1, secondPhase: true },
    { label: 'Kurze Salve', value: 'kurzeSalve', count: 3,secondPhase: true },
    { label: 'Lange Salve', value: 'langeSalve', count: 6, secondPhase: true},
    { label: 'Autofeuer', value: 'autofeuer', count: 10, secondPhase: false },
    { label: 'Sperrfeuer', value: 'sperrfeuer', count: 20, secondPhase: false },
];

export const reachModifiers = [
    { value: 'short', modifier: 0 },
    { value: 'medium', modifier: -1 },
    { value: 'long', modifier: -3 },
    { value: 'extreme', modifier: -6 },
];

export function getRangeModifierForRange(range: string): number {
    return reachModifiers.find((item) => { return item.value === range})?.modifier ?? 0;
}

export function isMeleeWeapon(weapon: Weapon): boolean {
    return weapon.type == 'Melee';
}

export function getModeModifier(mode: string, ammoLeft: number, rc: number, secondPhase: boolean): number {
    const item = shootingMode.find((item) => { return item.value === mode}) ?? null;
    if (item === null)
    {
        console.error('mode not found: ' + mode)
        return 0;
    }

    if (item.value === 'sperrfeuer')
    {
        return 0;
    }

    let modifier = Math.min(item.count, Math.max(ammoLeft, 1)) -1;
    if (secondPhase)
    {
        modifier--;
    }
    return modifier + rc;
}

export function validateWeaponSettingForWeapon(weapon: Weapon): WeaponSetting
{
    let setting = char.sheet.weaponSettings.find((item: WeaponSetting) => { return item.weaponId == weapon.id }) ?? null;
    if (setting == null) {
        setting = {
            weaponId: weapon.id,
            selectedMode: 'einzelschuss',
            ammoLoaded: '',
            magType: '',
            magSize: 0,
            ammoLeft: 0,
        }
        char.sheet.weaponSettings.push(setting);
    }
    return setting;
}

export function getSizeTypesFromAmmo(ammo: string): string[] {
    const types_de = ammo.split(' oder ').map((item) => item.trim());
    const types_en = ammo.split(' or ').map((item) => item.trim());

    if (types_de.length > types_en.length)
    {
        return types_de;
    }
    return types_en;
}
