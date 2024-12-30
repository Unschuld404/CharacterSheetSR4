import type {IdObject, ShootingMode, WeaponMod, WeaponSetting} from "@/composables/types";
import {char} from "@/composables/char";
import {getWeaponModsFromData} from "@/composables/data";

export type WeaponRange = {
    short: string;
    medium: string;
    long: string;
    extreme: string;
}

export class Weapon implements IdObject  {
    static nextId: number = 0;
    id: number = 0;

    name: string = '';
    damage: string = '';
    ap: string = '';
    category: string = '';
    conceal: string = '';
    mode: string = '';
    rc: string = '';
    ammo: string = '';
    type: string = '';
    weaponname: string = '';
    ranges: WeaponRange = { short: '', medium: '', long: '', extreme: '' };
    dicepool: string = '';
    mods: WeaponMod[] = [];

    get isMelee(): boolean {
        return this.type == 'Melee';
    }

    get settings(): WeaponSetting
    {
        return validateWeaponSettingForWeapon(this);
    }

    setNextId(): Weapon
    {
        this.id = Weapon.nextId++;
        return this;
    }

    generateId(): string {
        return this.category
            + '.' + this.name
            + '.' + this.id;
    }

    loadFromData(data: any): Weapon {
        this.name = data.name || 'Unknown';
        this.damage= data.damage || '0';
        this.category= data.category || '';
        this.ap= data.ap || '0';
        this.mode= data.mode || '';
        this.rc= data.rc || '0';
        this.ammo= data.ammo || '0';
        this.type= data.type || '';
        this.weaponname = data.weaponname || '';
        this.conceal = data.conceal || '';
        this.ranges= {
                short: data.ranges?.short || '0',
                medium: data.ranges?.medium || '0',
                long: data.ranges?.long || '0',
                extreme: data.ranges?.extreme || '0'
        };
        this.dicepool= data.dicepool || '0';
        this.mods = getWeaponModsFromData(data.mods || []);
        return this;
    }
    static createFromDataObject(data: any): Weapon {
        return (new Weapon()).setNextId().loadFromData(data);
    }
}

export const shootingMode: ShootingMode[] = [
    { label: 'Einzelschuss', value: 'einzelschuss', count: 1, mode: 'EM,HM,SM,AM' },
    { label: 'Kurze Salve', value: 'kurzeSalve', count: 3, mode: 'SM,AM' },
    { label: 'Lange Salve', value: 'langeSalve', count: 6, mode: 'AM'},
    { label: 'Autofeuer', value: 'autofeuer', count: 10, mode: 'AM' },
    { label: 'Sperrfeuer', value: 'sperrfeuer', count: 20, mode: 'AM'},
];

export const reachModifiers = [
    { value: 'short', modifier: 0 },
    { value: 'medium', modifier: -1 },
    { value: 'long', modifier: -3 },
    { value: 'extreme', modifier: -6 },
];

export const weaponMode = [
    { label: 'Einzelschuss', value: 'EM' , secondPhase: false },
    { label: 'Halbautomatik', value: 'HM', secondPhase: true },
    { label: 'Salve', value: 'SM', secondPhase: true },
    { label: 'Vollautomatik', value: 'AM', secondPhase: true },
];

export function getRangeModifierForRange(range: string): number {
    return reachModifiers.find((item) => { return item.value === range})?.modifier ?? 0;
}

export function getShootingMode(mode: string): ShootingMode|null
{
    const item = shootingMode.find((item) => { return item.value === mode}) ?? null;
    if (item === null)
    {
        console.error('mode not found: ' + mode)
    }
    return item;
}

export function getModeModifier(mode: string, rc: number, bulletsFired: number, bulletsToFire: number): number {
    const item = getShootingMode(mode);

    if (item == null || item.value === 'sperrfeuer')
    {
        return 0;
    }

    let modifier = bulletsFired + bulletsToFire -1;

    return -1 * Math.max(0, modifier - rc);
}

function validateWeaponSettingForWeapon(weapon: Weapon): WeaponSetting
{
    let setting = char.sheet.weaponSettings.find((item: WeaponSetting) => { return item.weaponId == weapon.generateId() }) ?? null;
    if (setting == null) {
        setting = {
            weaponId:  weapon.generateId(),
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
