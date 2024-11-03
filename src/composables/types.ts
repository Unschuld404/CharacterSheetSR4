
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
export type InitiativePasses = {
    base: number;
    total: number;
}
export type InitiativeValues = {
    base: number;
    total: number;
    passes: InitiativePasses;
}
export type Initiative = {
    normal: InitiativeValues;
    matrix: InitiativeValues;
    astral: InitiativeValues;
}
export type Armor = {
    ballistic: number;
    impact: number;
}
export type Skill = {
    name: string;
    type: string;
    attribute: string;
    attribute_value: number;
    rating: number;
    total: number;
}
export type Spell = {
    name: string;
    category: string;
    type: string;
    range: string;
    duration: string;
    dv: string;
}
export type Vehicle = {
    name: string;
    handling: string;
    accel: string;
    speed: string;
    pilot: string;
    body: string;
    armor: string;
    sensor: string;

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
    ranges: {
        short: string;
        medium: string;
        long: string;
        extreme: string;
    };
    dicepool: string;
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
}

export type SheetData = {
    edge : number;
    damage: DamageTaken;
}
