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
export type WeaponSetting = {
    weaponId: string;
    selectedMode: string;
    ammoLoaded: string;
    magType: string;
    magSize: number;
    ammoLeft: number;
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
    skill: string;
    sensorBased: boolean;
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
    physical: number | null;
    stun: number | null;
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
export type Resistance = {
    ballistic: number;
    impact: number;
    mana: number;
    physical: number;
    drain: number;
}

export type VehicleResistance = {
    mundan: number; //weltlicher Schaden
    magic: number;  //direkte Zauber
    elemental: number; //indirekte Zauber
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
    autosofts: Program[];
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

export type SheetData = {
    edge : number;
    damage: DamageTaken;
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
