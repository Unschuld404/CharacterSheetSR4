import type {Ammunition, Container, IdObject, ShootingMode, WeaponMod, WeaponMode} from "@/composables/types";
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
    selectedWeaponMode: string = '';
    selectedShootingMode: string = '';
    ammoLoaded: string = '';
    magType: string = '';
    magSize: number = 0;
    ammoLeft: number = 0;
    bulletsFired: number = 0;
}


export class Weapon implements IdObject  {
    static nextId: number = 0;

    ranges: WeaponRange = { short: '', medium: '', long: '', extreme: '' };
    parent: Container|null = null;
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


    setParent(parent: Container): Weapon {
        this.parent = parent;
        return this;
    }
    setNextId(): Weapon
    {
        this.id = Weapon.nextId++;
        return this;
    }

    generateId(): string {

        let id = this.category
            + '.' + this.name
            + '.' + this.id;

        if (this.parent !== null)
        {
            id =  this.parent.getName() + '.' + id;
        }
        return id;
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
        const weaponModes = this.getWeaponModes();
        return shootingMode.filter(mode => weaponModes.some(weaponMode => mode.modes.split(',').includes(weaponMode)));
    }
    get shootingMode(): string
    {
        if (!this.settings.selectedShootingMode)
        {
            this.settings.selectedShootingMode = this.getShootingModes()[0]?.value ?? '';
        }
        return this.settings.selectedShootingMode;
    }
    set shootingMode(value) {
        this.settings.selectedShootingMode = value;
    }
    get shootingModeModifier(): number {
        return getModeModifier( this.shootingMode, toInt(this.rc), this.bulletsFired, this.bulletsToFire );
    }
    getWeaponModes() {
        return this.mode.split('/');
    }
    get weaponMode(): string
    {
        if (!this.settings.selectedWeaponMode)
        {
            this.settings.selectedWeaponMode = this.getWeaponModes()[0] ?? '';
        }
        return this.settings.selectedWeaponMode;
    }
    set weaponMode(value: string)
    {
        this.settings.selectedWeaponMode = value;
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
    get bulletsFired(): number {
        return this.settings.bulletsFired;
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
        const ammunitions = this.parent?.getAmmunitions() ?? [];
        let count = 0;

        const ind = ammunitions.findIndex((a: Ammunition) => a.name === this.settings.ammoLoaded && a.extra === this.category);

        if (ind >= 0)
        {
            count = Math.min(ammunitions[ind].count, this.settings.magSize);
            ammunitions[ind].count -= count;
        }

        this.settings.ammoLeft = count;
    }

    get hasSecondPhase(): boolean {
        return getWeaponMode(this.weaponMode)?.secondPhase ?? false;
    }

    shoot() {
        if (this.isSecondPhase)
        {
            this.resetPhase();
        }
        else if (this.hasSecondPhase && this.bulletsToFire <= 6)
        {
            this.settings.bulletsFired = this.bulletsToFire;
        }
        this.settings.ammoLeft -= this.bulletsToFire;
    }

    get isLoaded(): boolean {
        return this.settings.ammoLoaded !== '';
    }

    get isSecondPhase(): boolean {
        return this.settings.bulletsFired > 0;
    }

    resetPhase(): void {
        this.settings.bulletsFired = 0;
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

    static createFromDataObject(data: any, parent: Container): Weapon {
        return (new Weapon()).setParent(parent).setNextId().loadFromData(data);
    }
}

export const shootingMode: ShootingMode[] = [
    { label: 'Einzelschuss', value: 'einzelschuss', count: 1, modes: 'EM,HM' },
    { label: 'Kurze Salve', value: 'kurzeSalve', count: 3, modes: 'SM,AM' },
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

export const weaponMode: WeaponMode[] = [
    { label: 'Einzelschuss', value: 'EM' , secondPhase: false },
    { label: 'Halbautomatik', value: 'HM', secondPhase: true },
    { label: 'Salve', value: 'SM', secondPhase: true },
    { label: 'Vollautomatik', value: 'AM', secondPhase: true },
];

export function getRangeModifierForRange(range: string): number {
    return reachModifiers.find((item) => { return item.value === range})?.modifier ?? 0;
}

function getWeaponMode(mode: string): WeaponMode|null
{
    const item = weaponMode.find((item) => { return item.value === mode}) ?? null;
    if (item === null)
    {
        console.error('WeaponMode not found: ' + mode)
    }
    return item;
}

function getShootingMode(mode: string): ShootingMode|null
{
    const item = shootingMode.find((item) => { return item.value === mode}) ?? null;
    if (item === null)
    {
        console.error('ShootingMode not found: ' + mode)
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
    let setting = weapon.parent?.getWeaponSettings()?.find((item) => {
        return item.weaponId == weapon.generateId();
    }) ?? null;

    if (setting == null) {
        setting = new WeaponSetting();
        setting.weaponId = weapon.generateId();
        setting.selectedShootingMode = weapon.getShootingModes()[0]?.value ?? '';
        setting.selectedWeaponMode = weapon.getWeaponModes()[0] ?? '';
        weapon.parent?.getWeaponSettings()?.push(setting);
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
