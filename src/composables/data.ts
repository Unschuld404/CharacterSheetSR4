import {reactive} from "vue";
import {ref} from "vue";
import {toInt} from "@/composables/utils";
import Initiative from "@/components/Initiative.vue";

export const data = ref<any | null>(null);
export const sheet = ref<any | null>(null);

export type SheetData = {
    selectedSkills : string,
    selectedWeapons : string,
}

export class Sheet implements SheetData {
    selectedSkills! : string;
    selectedWeapons! : string;

}



export class Charakter {
    name!: string;
    edge!: number;
    nuyen!: number;
    karma!: number;
    initiative!: Initiative;
    metatype! : string;
    movement!: Movement;
    height!: number;
    weight!: number;
    age! : number;
    sex! : string;
    skin! : string;
    eyes! : string;
    hair! : string;
    armor! : Armor;
    drain!: Drain;
    monitor!: DamageMonitor;
    attributes!: Attributes;
    knowledgeSkills!: Skill[];
    actionSkills!: Skill[];
    spells!: Spell[];
    spirits!: Spirit[];
    vehicles!: Vehicle[];
    weapons!: Weapon[];


    constructor(data: any )
    {
        this.update(data);
    }

    update(data: any) {
        this.name = data?.name ?? 'The Shadow';
        this.nuyen = toInt(data?.nuyen);
        this.karma = toInt(data?.karma);
        this.initiative = {
            normal : {
                base : toInt(data?.init?.base),
                total : toInt(data?.init?.total ?? data?.init?.base),
                passes : {
                    base : toInt(data?.ip?.base),
                    total : toInt(data?.ip?.total ?? data?.ip?.base),
                },
            },
            astral : {
                base : toInt(data?.atralinit?.base),
                total : toInt(data?.astralinit?.total ?? data?.astralinit?.base),
                passes : {
                    base : toInt(data?.astralip?.base),
                    total : toInt(data?.astralip?.total ?? data?.astralip?.base),
                },
            },
            matrix : {
                base : toInt(data?.matrixinit?.base),
                total : toInt(data?.matrixinit?.total ?? data?.matrixinit?.base),
                passes : {
                    base : toInt(data?.matrixip?.base),
                    total : toInt(data?.matrixip?.total ?? data?.matrixip?.base),
                },
            },
        }
        this.metatype = data?.metatype ?? 'unknown';
        this.movement = {
            caption: data?.movement ?? '',
            walk : data?.movementwalk ?? '',
            swim : data?.movementswim ?? '',
            fly : data?.movementfly ?? '',
        }
        this.height = toInt(data?.height);
        this.weight = toInt(data?.weight);
        this.age = toInt(data?.age);
        this.sex = data?.sex ?? 'unknown';
        this.skin = data?.skin ?? 'unknown';
        this.eyes = data?.eyes ?? 'unknown';
        this.hair = data?.hair ?? 'unknown';
        this.armor = {
            impact : toInt(data?.armori),
            ballistic : toInt(data?.armorb),
        }
        this.monitor = {
            physical: {
                filled: toInt(data?.physicalcmfilled),
                max: toInt(data?.physicalcm),
            },
            stun: {
                filled: toInt(data?.stuncmfilled),
                max: toInt(data?.stuncm),
            },
            threshold: toInt(data?.cmthreshold),
            offset: toInt(data?.cmthresholdoffset),
            overflow: toInt(data?.cmoverflow),
        }
        let attributes = data?.attributes ?? [];


        this.attributes = {
            body: {
                name: 'BOD',
                base : toInt(attributes.find((item: any) => item.name === 'BOD')?.base),
                total : toInt(attributes.find((item: any) => item.name === 'BOD')?.total),
            },
            agility: {
                name: 'AGI',
                base : toInt(attributes.find((item: any) => item.name === 'AGI')?.base),
                total : toInt(attributes.find((item: any) => item.name === 'AGI')?.total),
            },
            reaction: {
                name: 'REA',
                base : toInt(attributes.find((item: any) => item.name === 'REA')?.base),
                total : toInt(attributes.find((item: any) => item.name === 'REA')?.total),
            },
            strength: {
                name: 'STR',
                base : toInt(attributes.find((item: any) => item.name === 'STR')?.base),
                total : toInt(attributes.find((item: any) => item.name === 'STR')?.total),
            },
            charisma: {
                name: 'CHA',
                base : toInt(attributes.find((item: any) => item.name === 'CHA')?.base),
                total : toInt(attributes.find((item: any) => item.name === 'CHA')?.total),
            },
            intuition: {
                name: 'INT',
                base : toInt(attributes.find((item: any) => item.name === 'INT')?.base),
                total : toInt(attributes.find((item: any) => item.name === 'INT')?.total),
            },
            logic: {
                name: 'LOG',
                base : toInt(attributes.find((item: any) => item.name === 'LOG')?.base),
                total : toInt(attributes.find((item: any) => item.name === 'LOG')?.total),
            },
            willpower: {
                name: 'WIL',
                base : toInt(attributes.find((item: any) => item.name === 'WIL')?.base),
                total : toInt(attributes.find((item: any) => item.name === 'WIL')?.total),
            },
            edge: {
                name: 'EDG',
                base : toInt(attributes.find((item: any) => item.name === 'EDG')?.base),
                total : toInt(attributes.find((item: any) => item.name === 'EDG')?.total),
            },
            magic: {
                name: 'MAG',
                base : toInt(attributes.find((item: any) => item.name === 'MAG')?.base),
                total : toInt(attributes.find((item: any) => item.name === 'MAG')?.total),
            },
            resonance: {
                name: 'RES',
                base : toInt(attributes.find((item: any) => item.name === 'RES')?.base),
                total : toInt(attributes.find((item: any) => item.name === 'RES')?.total),
            },
            essens: {
                name: 'ESS',
                base : toInt(attributes.find((item: any) => item.name === 'ESS')?.base),
                total : toInt(attributes.find((item: any) => item.name === 'ESS')?.base),
            },
        }

        this.drain = {
            caption : data?.drain ?? '',
            attribute : extractAttributeFromDrain(data?.drain) ?? '',
            total : 0,
        }
        this.drain.total = toInt(attributes.find((item: any) => item.name === this.drain.attribute)?.base)
                           + this.attributes.willpower.total;

        this.knowledgeSkills = getKnowledgeSkills();
        this.actionSkills = getActionSkills();
        this.spirits = getSpirits();
        this.vehicles = getVehicles();
        this.weapons = getWeapons();
    }
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

export const char = reactive(new Charakter(data.value));

function extractAttributeFromDrain(drain: string|null): string|null {
    if (drain === null || drain === undefined)
    {
        return null;
    }

    const regex = /\+\s*([A-Za-z]+)\s*\(/;
    const match: RegExpMatchArray | null = drain.match(regex);

    if (Array.isArray(match) && match.length > 1) {
        return match[1];
    }

    return null;
}
export function dataIsValid(): boolean {
    return data.value !== null;
}

export function getMaxStunDamage(): number
{
    let wil = getAttributeValueByName('WIL');

    return 8 + Math.ceil(wil / 2);
}

export function getMaxPhysicalDamage(): number
{
    let bod = getAttributeValueByName('BOD');

    return 8 + Math.ceil(bod / 2);
}

export function getAttributeValueByName(name: string): number {
    let attributes = data?.value?.attributes ?? [];
    return toInt(attributes.find((item: any) => item.name === name)?.total ?? 0);
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