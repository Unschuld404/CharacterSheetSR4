import {Spirit, type SpiritType} from "@/composables/spirits";
import {toInt} from "@/composables/utils";
import {reactive} from "vue";
import {
    data,
    extractAttributeFromDrain,
    getActionSkills, getGear,
    getKnowledgeSkills,
    getSpells, getSpirits,
    getVehicles,
    getWeapons
} from "@/composables/data";
import {Sheet, sheet_data} from "@/composables/sheet";
import type {
    Armor,
    Attributes,
    DamageMonitor,
    Drain, Gear,
    Initiative,
    Movement,
    SheetData,
    Skill,
    Spell,
    Vehicle,
    Weapon
} from "@/composables/types";

export class Charakter {
    name!: string;
    initiative!: Initiative;
    metatype! : string;
    movement!: Movement;
    height!: string;
    weight!: string;
    age! : string;
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
    gear!: Gear[];
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
        this.metatype = data?.metatype || 'unknown';
        this.movement = {
            caption: data?.movement  || '',
            walk : data?.movementwalk  || '',
            swim : data?.movementswim  || '',
            fly : data?.movementfly  || '',
        }
        this.height = data?.height || 'unknown';
        this.weight = data?.weight   || 'unknown';
        this.age = data?.age  || 'unknown';
        this.sex = data?.sex  || 'unknown';
        this.skin = data?.skin  || 'unknown';
        this.eyes = data?.eyes  || 'unknown';
        this.hair = data?.hair  || 'unknown';
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
        this.gear = getGear(data);
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
