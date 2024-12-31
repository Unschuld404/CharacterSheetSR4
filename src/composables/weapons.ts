import type {IdObject, ShootingMode, WeaponMod } from "@/composables/types";
import {char} from "@/composables/char";
import {getWeaponModsFromData} from "@/composables/data";
import {toInt} from "@/composables/utils";


export type WeaponRange = {
    short: string;
    medium: string;
    long: string;
    extreme: string;
}

export class WeaponSetting  {
    weaponId: string = '?';
    selectedMode: string = 'einzelschuss';
    ammoLoaded: string = '';
    magType: string = '';
    magSize: number = 0;
    ammoLeft: number = 0;
    bulletsFired: number = 0;
}


export class Weapon implements IdObject  {
    static nextId: number = 0;

    ranges: WeaponRange = { short: '', medium: '', long: '', extreme: '' };

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

    dicepool: string = '';
    mods: WeaponMod[] = [];
    settings : WeaponSetting = new WeaponSetting();


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

    get isMelee(): boolean {
        return this.type == 'Melee';
    }

    getRanges() {
        return [
            { label: this.ranges.short, value: 'short'},
            { label: this.ranges.medium, value: 'medium' },
            { label: this.ranges.long, value: 'long'},
            { label: this.ranges.extreme, value: 'extreme' },
        ];
    }
    getShootingModes() {
        const weaponModes = this.mode.split('/');
        return shootingMode.filter(mode => weaponModes.some(weaponMode => mode.modes.split(',').includes(weaponMode)));
    }

    get shootingMode(): string
    {
        return this.settings.selectedMode;
    }
    set shootingMode(value) {
        this.settings.selectedMode = value;
    }
    get shootingModeModifier(): number {
        return getModeModifier( this.shootingMode, toInt(this.rc), 0, this.bulletsToFire );
    }
    get bulletsToFire(): number {
        return Math.min(this.settings.ammoLeft, getShootingMode(this.shootingMode)?.count ?? 0);
    }
    get bulletsLeft(): number {
        return this.settings.ammoLeft;
    }
    get bulletsLeftAfterFire(): number {
        return this.bulletsLeft - this.bulletsToFire;
    }
    get magSize(): number {
        return this.settings.magSize;
    }
    get magType(): string {
        return this.settings.magType;
    }
    get ammoLoaded(): string {
        return this.settings.ammoLoaded;
    }

    reload() {
        this.settings.ammoLeft = this.settings.magSize;
    }

    shoot() {
        this.settings.ammoLeft -= this.bulletsToFire;
    }

    get isLoaded(): boolean {
        return this.settings.ammoLoaded !== '';
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
        this.settings = validateWeaponSettingForWeapon(this);

        return this;
    }

    static createFromDataObject(data: any): Weapon {
        return (new Weapon()).setNextId().loadFromData(data);
    }
}

export const shootingMode: ShootingMode[] = [
    { label: 'Einzelschuss', value: 'einzelschuss', count: 1, modes: 'EM,HM' },
    { label: 'Kurze Salve', value: 'kurzeSalve', count: 3, modes: 'SM' },
    { label: 'Lange Salve', value: 'langeSalve', count: 6, modes: 'AM'},
    { label: 'Autofeuer', value: 'autofeuer', count: 10, modes: 'AM' },
    { label: 'Sperrfeuer', value: 'sperrfeuer', count: 20, modes: 'AM'},
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

function getShootingMode(mode: string): ShootingMode|null
{
    const item = shootingMode.find((item) => { return item.value === mode}) ?? null;
    if (item === null)
    {
        console.error('mode not found: ' + mode)
    }
    return item;
}

function getModeModifier(mode: string, rc: number, bulletsFired: number, bulletsToFire: number): number {
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
        setting = new WeaponSetting();
        setting.weaponId = weapon.generateId();
        setting.selectedMode = weapon.getShootingModes()[0]?.value ?? '';
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
