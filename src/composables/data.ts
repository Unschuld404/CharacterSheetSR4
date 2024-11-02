import {reactive} from "vue";
import {ref} from "vue";
import {toInt} from "@/composables/utils";
import Initiative from "@/components/Initiative.vue";
import {Spirit, type SpiritType} from "@/composables/spirits";

export const data = ref<any | null>(null);
export const sheet_data = ref<any | null>(null);

export class Sheet {
    karma_log: KarmaEntry[];
    nuyen_log: NuyenEntry[];
    selectedSkills : string[];
    selectedItems : SelectedItem[];

    edge : number | null;
    nuyen!: number;
    karma!: number;
    spirits!: Spirit[];
    damage: DamageTaken;

    constructor(sheet: any) {
        this.karma_log = getKarmaLog(sheet);
        this.nuyen_log = getNuyenLog(sheet);
        this.selectedSkills = sheet?.selectedSkills ?? [];
        this.selectedItems = getSelectedItems(sheet);

        this.edge = sheet?.edge ?? null;
        this.damage = {
            physical: sheet?.damage?.physical ?? null,
            stun: sheet?.damage?.stun ?? null,
        }
    }

    toJSON() {
        return this;
    }
}

export class Charakter {
    name!: string;
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
    attributes!: Attributes;
    knowledgeSkills!: Skill[];
    actionSkills!: Skill[];
    spells!: Spell[];
    vehicles!: Vehicle[];
    weapons!: Weapon[];
    monitor!: DamageMonitor;

    sheet! : Sheet;
    data! : SheetData;

    constructor(data: any, sheet: any )
    {
        this.update(data, sheet);
    }

    get edge(): number { return this.sheet.edge ?? this.data.edge }
    set edge(value: number) { this.sheet.edge = value }
    get nuyen(): number { return this.sheet.nuyen }
    private alterNuyen(value: number, reason: string) {
        this.sheet.nuyen_log.push( {
            date : new Date(),
            value: value,
            reason: reason
        });
        this.sheet.nuyen += value;
    }
    addNuyen(value: number, reason: string) {
        this.alterNuyen(value, reason);
    }
    spendNuyen(value: number, reason: string) {
        this.alterNuyen(-1 * value, reason);
    }

    addSpirit(type: SpiritType, force: number, services: number) {
        this.sheet.spirits.push(
            Spirit.create(type, force, services)
        );
    }

    releaseSpirit(spirit: Spirit) {
        this.sheet.spirits = this.sheet.spirits.filter((item: Spirit) => {
            return !spirit.equals(item);
        });
    }

    get karma(): number { return this.sheet.karma; }
    addKarma(value: number, reason: string) {
        this.sheet.karma_log.push( {
            date : new Date(),
            value: value,
            reason: reason
        });

        this.sheet.karma += value;
    }

    get spirits(): Spirit[] { return this.sheet.spirits; }

    update(data: any, sheet: any) {
        this.sheet = new Sheet(sheet);
        this.sheet.nuyen = sheet?.nuyen ?? toInt(data?.nuyen);
        this.sheet.karma = sheet?.karma ?? toInt(data?.karma);

        let sheetSpirits = getSpirits(sheet);
        let dataSpirits = getSpirits(data);
        this.sheet.spirits =  sheetSpirits ?? dataSpirits ?? [];

        this.name = data?.name ?? 'The Shadow';
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

        let attributes = data?.attributes ?? [];

        this.data = {
            edge : toInt(attributes.find((item: any) => item.name === 'EDG')?.total),
            damage : {
                physical: toInt(data?.physicalcmfilled),
                stun: toInt(data?.stuncmfilled),
            },
        }
        const self = this;

        this.monitor = {
            physical: {
                get filled(): number { return self.sheet.damage?.physical ?? self.data.damage.physical ?? 0 },
                set filled(value: number) { self.sheet.damage.physical = value; },
                max: toInt(data?.physicalcm),
            },
            stun: {
                get filled(): number { return self.sheet.damage?.stun ?? self.data.damage.stun ?? 0 },
                set filled(value: number) { self.sheet.damage.stun = value; },
                max: toInt(data?.stuncm),
            },
            threshold: toInt(data?.cmthreshold),
            offset: toInt(data?.cmthresholdoffset),
            overflow: toInt(data?.cmoverflow),
        }

        this.attributes = {
            edge: {
                name: 'EDG',
                base : toInt(attributes.find((item: any) => item.name === 'EDG')?.base),
                get total() : number { return self.sheet.edge ?? self.data.edge},
                set total(value: number) { self.sheet.edge = value; },
            },
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

        this.knowledgeSkills = getKnowledgeSkills(data);
        this.actionSkills = getActionSkills(data);

        this.vehicles = getVehicles(data);
        this.weapons = getWeapons(data);
        this.spells = getSpells(data);
    }

    get spellcasting(): Skill {
        return this.skillByName('Spellcasting')
                ?? this.skillByName('Spruchzauberei')
                ?? {
                        name: 'Spellcasting',
                        type: 'unknown',
                        attribute: 'unknown',
                        attribute_value: 0,
                        rating: 0,
                        total: 0,
                    };
    }

    get maxStunDamage(): number {
        return 8 + Math.ceil(this.attributes.willpower.total / 2);
    }

    get maxPhysicalDamage(): number {
        return 8 + Math.ceil(this.attributes.body.total / 2);
    }

    isSkillSelected(value: string): boolean {
        return this.sheet.selectedSkills.includes(value);
    }
    selectSkill(value: string): void {
        this.sheet.selectedSkills.push(value);
    }
    unselectSkill(value: string): void {
        this.sheet.selectedSkills = this.sheet.selectedSkills.filter((item: string) => item !== value)
    }

    skillByName(name: string): Skill | null {
        return this.actionSkills.find((item: any) => item.name === name)
            ?? this.knowledgeSkills.find((item: any) => item.name === name)
            ?? null;
    }
}

export const char = reactive(new Charakter(data.value, sheet_data.value));

type SheetData = {
    edge : number;
    damage: DamageTaken;
}
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
function getKarmaLog(data: any): KarmaEntry[] {
    let log = data?.value?.karma_log;
    log = Array.isArray(log) ? log : [];
    return log.map((entry: any) => ({
        date: entry.date,
        value: entry.value,
        reason: entry.reason,
    }));
}
function getNuyenLog(data: any): NuyenEntry[]  {
    let log = data?.value?.nuyen_log;
    log = Array.isArray(log) ? log : [];
    return log.map((entry: any) => ({
        date: entry.date,
        value: entry.value,
        reason: entry.reason,
    }));
}
function getSelectedItems(data: any): SelectedItem[] {
    let list = data?.value?.selectedItems;
    list = Array.isArray(list) ? list : [];
    return list.map((entry: any) => ({
        type: entry.type,
        name: entry.name,
    }));
}
function getSkills(data: any, knowledge: boolean): Array<Skill> {
    let skills = data?.skills;
    skills = Array.isArray(skills) ? skills : [];

    return skills
        .filter((skill: any) => skill.knowledge === (knowledge ? 'True' : 'False'))
        .map((skill: any) => (
            {
                name: skill.name || 'Unbekannt',
                type: skill.skillcategory_english || 'Unbekannt',
                attribute: skill.attribute || 'Unbekannt',
                attribute_value: toInt(skill.attributemod),
                rating: toInt(skill.rating),
                total: toInt(skill.total),
            }));
}
function getKnowledgeSkills(data: any): Array<Skill> {
    return getSkills(data, true);
}
function getActionSkills(data: any): Array<Skill> {
    return getSkills(data, false);
}
function getSpells(data: any): Array<Spell> {
    let spells = data?.spells;
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
function getSpirits(data: any): Spirit[] | null {
    const spiritData = data?.spirits;

    if (spiritData === null || spiritData === undefined) {
        return null;
    }

    const spiritsArray = Array.isArray(spiritData) ? spiritData : [];

    return spiritsArray.map((spiritObj: any) => Spirit.createFromDataObject(spiritObj));
}
function getVehicles(data: any): Array<Vehicle> {
    let vehicles = data?.vehicles;
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
function getWeapons(data: any): Array<Weapon> {
    let weapons = data?.weapons;
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

export function dataIsValid(): boolean {
    return data.value !== null;
}
