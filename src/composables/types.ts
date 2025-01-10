import {Weapon, WeaponSetting} from "@/composables/weapons";

export type PoolValue = {
    name: string;
    value: number;
}
export class Pool  {
    name: string;
    value: number;
    values: PoolValue[];

    constructor(name: string) {
        this.name = name;
        this.value = 0;
        this.values = [];
    }

    add(name: string, value: number): Pool {
        if (value !== 0)
        {
            this.values.push({name: name, value: value});
            this.value += value;
        }

        return this;
    }

    addValues(values: PoolValue[] | null): Pool {
        if (values !== null)
        {
            for (const value of values) {
                this.addPoolValue(value);
            }
        }

        return this;
    }

    addPoolValue(value: PoolValue): Pool {
        if (value.value !== 0)
        {
            this.values.push(value);
            this.value += value.value;
        }

        return this;
    }

    setValue(value: number): Pool {
        let diff = value - this.value;
        if (diff != 0)
        {
            this.values.push({name: 'Modifier', value: diff});
            this.value = value;
        }

        return this;
    }
}

export type Gear = {
    name: string;
    category : string;
    type: GearType,
    extra: string,
    equipped: boolean,
    count: number,
    rating: number;
}


export type Ammunition = {
    name: string;
    extra: string;
    count: number;
    dmg: number;
    ap: number;
}

export type SelectedItem = {
    type : string;
    id : string;
}
export type NuyenEntry = {
    date: Date;
    value: number;
    reason: string;
}
export type KarmaEntry = {
    date : Date;
    value: number;
    reason: string;
}

export type ShootingMode = {
    label: string;
    value: string;
    count: number;
    modes: string;
}

export type WeaponMode = {
    label: string;
    value: string;
    secondPhase: boolean;
}

export type VehicleMod = {
    name: string;
    rating: number;
    limit: string;
}

export type SensorMod = {
    name: string;
    rating: number;
    category: string;
}

export type WeaponMod = {
    name: string;
    rating: number;
    rc: number;
}

export type Sensor = {
    name: string;
    rating: number;
    mods: SensorMod[];
}

export type AutoSoft = {
    name: string;
    rating: number;
    extra: string;
    skill: string;
}

export type Attribute = {
    name: string;
    base: number;
    total: number;
}

export type Attributes = {
    body: Attribute;
    agility: Attribute;
    reaction: Attribute;
    strength: Attribute;
    charisma: Attribute;
    intuition: Attribute;
    logic: Attribute;
    willpower: Attribute;
    edge: Attribute;
    magic: Attribute;
    resonance: Attribute;
    essens: Attribute;
}

export type Movement = {
    caption: string;
    walk: string;
    swim: string;
    fly: string;
}
export type Drain = {
    caption: string;
    attribute: string;
    total: number;
}
export type Damage = {
    filled: number;
    max: number;
}
export type DamageMonitor = {
    physical: Damage;
    stun: Damage;
    threshold: number;
    offset: number;
    overflow: number;
}
export type DamageTaken = {
    physical: number;
    stun: number;
}

export type Initiative = {
    value: number;
    passes: number;
}

export type InitiativeSections = {
    normal: Initiative;
    matrix: Initiative;
    astral: Initiative;
}

export type CharInitiative = InitiativeSections & {
    base: InitiativeSections;
}

export type ArmorValues = {
    ballistic: number;
    impact: number;
}

export type ArmorMod = {
    name: string;
    values: ArmorValues;
    rating: number;
    category: string;
}

export type Armor = {
    name: string;
    equipped: boolean;
    values: ArmorValues;
    mods: ArmorMod[];
}

export type Resistance = {
    ballistic: number;
    impact: number;
    mana: number;
    physical: number;
    drain: number;
}

export type VehicleResistance = {
    physical: Pool; //weltlicher Schaden
    elemental: Pool; //indirekte Zauber oder Feuer
}

export type VehicleInitiative = {
    pool: Pool;
    passes: number;
}

export type Skill = {
    name: string;
    type: string;
    attribute: string;
    attribute_value: number;
    rating: number;
    total: number;
}

export interface IdObject {
    generateId(): string;
}

export interface Container {
    getName(): string;
    addWeapon(weapon: Weapon): Container;
    getWeaponSettings(): WeaponSetting[];
    getAmmunitions(): Ammunition[];
    getWeaponPoolValues(weapon: Weapon): PoolValue[] | null;
}

export interface Rigger {
    getInitiativeVR(): Initiative;
    getInitiativeRemote(): Initiative;
    getDefenseMeleeSkill(): PoolValue;
    getEvadeSkill(): PoolValue;
    getCommandValue(): PoolValue;
}

export class Spell implements IdObject {

    name!: string;
    category!: string;
    type!: string;
    range!: string;
    duration!: string;
    dv!: string;

    generateId(): string {
        return this.name;
    }

    constructor(data: any) {
        this.name = data?.name || 'Unbekannt';
        this.category = data?.category || 'Unbekannt';
        this.type = data?.type || 'Unbekannt';
        this.range = data?.range || 'Unbekannt';
        this.duration = data?.duration || 'Unbekannt';
        this.dv = data?.dv || 'Unbekannt';
    }
}

export type Signal = {
    signal: number;
    range: string;
}

export enum GearType {
    Commlink,
    Persona,
    Nexus,
    Ammo,
    Program,
    OS,
    SIN,
    Other
}

export type Program = {
    name: string;
    rating: number;
    extra: string;
}

export type CommlinkMod = {
    name: string;
    rating: number;
    category: string;
}

export type Commlink = {
    name: string;
    extra: string,
    signal: number;
    firewall: number;
    system: number;
    response: number;
    rating: number;
    programs: Program[];
    mods: CommlinkMod[];
    autosofts: AutoSoft[];
}

export enum VehicleMode {
    Auto= 'Auto',
    Remote = 'Remote',
    VR = 'VR',
}

export enum EvadeType {
    Ranged = 'Ranged',
    Melee = 'Melee',
}

export type Translation = {
    [name: string]: string;
}

export type RollDiceValue = {
    name: string;
    value: number;
}

export type RollDiceValues = {
    name: string;
    value: number;
    values: RollDiceValue[],
}

export type RollDiceResult = {
    results: number[];
    hits: number;
}

export type Contact = {
    name: string;
    rating: number;
    loyalty: number;
    type: string;
}

export type Lifestyle = {
    name: string;
    cost: number;
    months: number;
}
