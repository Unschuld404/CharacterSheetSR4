import {ref} from "vue";

export const data = ref<Charakter | null>(null);

export type Charakter = {
    name: string;
    edge: number;
    nuyen: number;
    karma: number;
    init: Initiative;
    atralinit: Initiative;
    matrixinit: Initiative;
    metatype : string;
    movementwalk : number;
    movementswim : number;
    height : number;
    weight: number;
    age : number;
    sex : string;
    skin : string;
    eyes : string;
    hair : string;
    armori: number;
    armorb: number;

    attributes: any;
    skills: Skill[] | string | null;
    spells: Spell[] | string | null;
    spirits: Spirit[] | string | null;
    vehicles: Vehicle[] | string | null;
    weapons: Weapon[] | string | null;
}
export type Skill = {
    name: string;
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
export type Spirit = {
    type: string;
    services: number;
    force: number;
    bound: boolean;
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
    damage: string;
    ap: string;
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
export type Initiative = {
    base: number;
    total?: number;
}

export function dataIsValid(): boolean {
    return data.value !== null;
}

export function getAttributeValueByName(name: string): number {
    let attributes = data?.value?.attributes ?? [];
    return attributes.find((item: any) => item.name === name)?.total ?? 0;
}

function getSkills(knowledge: boolean): Array<Skill> {
    let skills = data?.value?.skills;
    skills = Array.isArray(skills) ? skills : [];

    return skills
        .filter((skill: any) => skill.knowledge === (knowledge ? 'True' : 'False'))
        .map((skill: any) => (
            {
                name: skill.name || 'Unbekannt',
                attribute: skill.attribute || 'Unbekannt',
                attribute_value: skill.attributemod || 0,
                rating: skill.rating || 0,
                total: skill.total || 0
            }));
}

export function getKnowledgeSkills(): Array<Skill> {
    return getSkills(true);
}

export function getActionSkills(): Array<Skill> {
    return getSkills(false);
}

export function getSpells(): Array<Spell> {
    let spells = data?.value?.spells;
    spells = Array.isArray(spells) ? spells : [];

    return spells.map((spell: any) => ({
        name: spell.name || 'Unbekannt',
        category: spell.category || 'Unbekannt',
        type: spell.type || 'Unbekannt',
        range: spell.range || 'Unbekannt',
        duration: spell.duration || 'Unbekannt',
        dv: spell.dv || 'Unbekannt'
    }));
}

export function getSpirits(): Array<Spirit> {
    let spiritData = data?.value?.spirits;
    spiritData = Array.isArray(spiritData) ? spiritData : [];

    return spiritData.map((spirit: any) => (
        {
            type: spirit.crittername || 'Unknown',
            services: parseInt(spirit.services, 10) || 0,
            force: parseInt(spirit.force, 10) || 0,
            bound: spirit.bound === 'True'
        }));
}

export function getVehicles(): Array<Vehicle> {
    let vehicles = data?.value?.vehicles;
    vehicles = Array.isArray(vehicles) ? vehicles : [];

    return vehicles.map((vehicle: any) => ({
        name: vehicle.name || 'Unknown',
        handling: vehicle.handling || '0',
        accel: vehicle.accel || '0/0',
        speed: vehicle.speed || '0',
        pilot: vehicle.pilot || '0',
        body: vehicle.body || '0',
        armor: vehicle.armor || '0',
        sensor: vehicle.sensor || '0'
    }));
}

export function getWeapons(): Array<Weapon> {
    let weapons = data?.value?.weapons;
    weapons = Array.isArray(weapons) ? weapons : [];

    return weapons.map((weapon: any) => ({
        name: weapon.name || 'Unknown',
        damage: weapon.damage || '0',
        ap: weapon.ap || '0',
        mode: weapon.mode || '',
        rc: weapon.rc || '0',
        ammo: weapon.ammo || '0',
        ranges: {
            short: weapon.ranges?.short || '0',
            medium: weapon.ranges?.medium || '0',
            long: weapon.ranges?.long || '0',
            extreme: weapon.ranges?.extreme || '0'
        },
        dicepool: weapon.dicepool || '0'
    }));
}