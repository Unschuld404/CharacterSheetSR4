
export type SelectedItem = {
    type : string;
    name : string;
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

export type Armor = {
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

export type VehicleSkill = {
    name: string;
    attribute: string;
    attribute_value: number;
    rating: number;
    total: number;
}

export type VehicleMod = {
    name: string;
    rating: number;
    mods: VehicleMod[];
}

export type Spell = {
    name: string;
    category: string;
    type: string;
    range: string;
    duration: string;
    dv: string;
}

export type Weapon = {
    name: string;
    id: string;
    damage: string;
    ap: string;
    category: string;
    mode: string;
    rc: string;
    ammo: string;
    type: string;
    ranges: {
        short: string;
        medium: string;
        long: string;
        extreme: string;
    };
    dicepool: string;
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

export type Gear = {
    name: string;
    category : string;
    type: GearType,
    extra: string,
    equipped: boolean,
    count: number,
    signal: number;
    firewall: number;
    system: number;
    response: number;
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
