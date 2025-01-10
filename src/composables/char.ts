import {Spirit, type SpiritType} from "@/composables/spirits";
import { selectedItemEquals, toBool, toInt, toSelectedItem, translate} from "@/composables/utils";
import {reactive} from "vue";
import {
    data,
    getActionSkills, getAmmunitions, getArmors,
    getAttributes,
    getCommlink,
    getContacts, getDamageTaken,
    getDrain,
    getEdge,
    getGear,
    getKnowledgeSkills,
    getLifestyles,
    getSpells, getSpirits,
    getVehicles,
    getWeapons,
} from "@/composables/data";
import {Sheet, sheet_data} from "@/composables/sheet";
import {
    type Armor,
    type ArmorValues,
    type Attributes,
    type CharInitiative, type Commlink, type Contact, type Container,
    type DamageMonitor,
    type Drain,
    EvadeType,
    type IdObject, type Lifestyle,
    type Movement, type Rigger,
    type Resistance, type SelectedItem,
    type Skill,
    Spell, type Initiative, type PoolValue, type Ammunition, type Gear, Pool
} from "@/composables/types";
import {Vehicle} from "@/composables/vehicle";
import {Weapon, WeaponSetting} from "@/composables/weapons";


export class Charakter implements Container, Rigger {
    name!: string;
    initiative!: CharInitiative;
    metatype! : string;
    movement!: Movement;
    height!: string;
    weight!: string;
    age! : string;
    sex! : string;
    skin! : string;
    eyes! : string;
    hair! : string;
    armorValues! : ArmorValues;
    drain!: Drain;
    attributes!: Attributes;
    knowledgeSkills!: Skill[];
    actionSkills!: Skill[];
    spells!: Spell[];
    vehicles!: Vehicle[];
    weapons!: Weapon[];
    gear: Gear[] = [];
    monitor!: DamageMonitor;
    magician!: boolean;
    initiategrade!: number;
    tradition: string| null = null;
    description!: string;
    background!: string;
    concept!: string;
    notes!: string;
    totalstreetcred!: number;
    totalnotoriety!: number;
    totalpublicawareness!: number;
    commlink: Commlink | null = null;
    contacts: Contact[] = [];
    lifestyles : Lifestyle[] = [];
    armors: Armor[] = [];
    metamagics: string[] = [];
    traits: string[] = [];
    flaws: string[] = [];


    sheet! : Sheet;

    constructor(data: any, sheet: any ) {
        this.update(data, sheet);
    }

    get edge(): number { return this.sheet.edge }
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
    get ammunitions(): Ammunition[] { return this.sheet.ammunitions; }

    update(data: any, sheet: any) {
        //ids initialisieren
        Weapon.nextId = 1;
        Vehicle.nextId = 1;
        Spirit.nextId = 1;

        this.sheet = new Sheet(sheet);
        if (sheet === null || Object.keys(sheet).length === 0)
        {
            this.sheet.edge = getEdge(data);
            this.sheet.nuyen = toInt(data?.nuyen);
            this.sheet.karma = toInt(data?.karma);
            this.sheet.damage = getDamageTaken(data) ?? { physical: 0, stun: 0 };
            this.sheet.spirits = getSpirits(data) ?? [];
            this.sheet.ammunitions = getAmmunitions(data) ?? [];
        }

        this.name = data?.name ?? 'The Shadow';
        this.initiative = {
            normal : {
                value : toInt(data?.init?.total ?? data?.init?.base),
                passes : toInt(data?.ip?.total ?? data?.ip?.base),
            },
            astral : {
                value : toInt(data?.astralinit?.total ?? data?.astralinit?.base),
                passes : toInt(data?.astralip?.total ?? data?.astralip?.base),
            },
            matrix : {
                value : toInt(data?.matrixinit?.total ?? data?.matrixinit?.base),
                passes : toInt(data?.matrixip?.total ?? data?.matrixip?.base),
            },
            base : {
                normal : {
                    value : toInt(data?.init?.base),
                    passes : toInt(data?.ip?.base),
                },
                astral : {
                    value : toInt(data?.atralinit?.base),
                    passes : toInt(data?.astralip?.base),
                },
                matrix : {
                    value : toInt(data?.matrixinit?.base),
                    passes : toInt(data?.matrixip?.base),
                },
            }
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
        this.magician = toBool(data?.magician);
        this.initiategrade = toInt(data?.initiategrade);
        this.description = data?.description || 'unknown';
        this.background = data?.background || 'unknown';
        this.concept = data?.concept || 'unknown';
        this.notes = data?.notes || 'unknown';
        this.totalstreetcred = toInt(data?.totalstreetcred);
        this.totalnotoriety = toInt(data?.totalnotoriety);
        this.totalpublicawareness = toInt(data?.totalpublicawareness);
        this.tradition = data?.tradition || 'unknown';
        this.metamagics = (data?.metamagics || []).map((item: any) => item.name);
        this.traits = (data?.qualities || []).filter((item: any) => item.qualitytype_english == 'Positive').map((item: any) => item.name);
        this.flaws = (data?.qualities || []).filter((item: any) => item.qualitytype_english == 'Negative').map((item: any) => item.name);

        this.armorValues = {
            impact : toInt(data?.armori),
            ballistic : toInt(data?.armorb),
        }

        this.knowledgeSkills = getKnowledgeSkills(data);
        this.actionSkills = getActionSkills(data);
        this.vehicles = getVehicles(data, this);
        this.weapons = getWeapons(data, this);
        this.armors = getArmors(data);
        this.gear = getGear(data);
        this.spells = getSpells(data);
        this.contacts = getContacts(data);
        this.lifestyles = getLifestyles(data);
        this.commlink = getCommlink(data);
        this.attributes = getAttributes(data);
        this.drain = getDrain(data);

        const self = this;

        this.monitor = {
            physical: {
                get filled(): number { return self.sheet.damage.physical },
                set filled(value: number) { self.sheet.damage.physical = value; },
                max: toInt(data?.physicalcm),
            },
            stun: {
                get filled(): number { return self.sheet.damage.stun},
                set filled(value: number) { self.sheet.damage.stun = value; },
                max: toInt(data?.stuncm),
            },
            threshold: toInt(data?.cmthreshold),
            offset: toInt(data?.cmthresholdoffset),
            overflow: toInt(data?.cmoverflow),
        }

        let selectedItems = [];
        for (let weapon of this.weapons) {
            if (this.isItemSelected(weapon))
            {
                selectedItems.push(toSelectedItem(weapon));
            }
        }
        for (let vehicle of this.vehicles) {
            if (this.isItemSelected(vehicle))
            {
                selectedItems.push(toSelectedItem(vehicle));
            }
        }
        for (let spirit of this.spirits) {
            if (this.isItemSelected(spirit))
            {
                selectedItems.push(toSelectedItem(spirit));
            }
        }
        for (let spell of this.spells) {
            if (this.isItemSelected(spell))
            {
                selectedItems.push(toSelectedItem(spell));
            }
        }

        this.sheet.selectedItems = selectedItems;

    }

    get spellcasting(): Skill {
        return this.skillByName('Spruchzauberei');
    }

    get maxStunDamage(): number {
        return 8 + Math.ceil(this.attributes.willpower.total / 2);
    }

    get maxPhysicalDamage(): number {
        return 8 + Math.ceil(this.attributes.body.total / 2);
    }

    get resist(): Resistance {
        return {
            ballistic: this.armorValues.ballistic + this.attributes.body.total,
            impact: this.armorValues.impact + this.attributes.body.total,
            mana: this.attributes.willpower.total,
            physical: this.attributes.body.total,
            drain: this.drain.total,
        }
    }


    evade(type: EvadeType, fullDefense: boolean) {
        const evade = this.skillByName('Ausweichen');
        const acrobatic = this.skillByName('Akrobatik');
        const unarmed = this.skillByName('Waffenlos');
        const melee = this.skillByName(this.sheet.defenseMeleeSkill);
        const reaction = this.attributes.reaction;
        let name = 'Verteidigung';

        /*
        melee
            parieren: Waffenfertigkeit + Reaktion
            blocken:  Waffenloser Kampf + Reaktion
            ausweichen: Ausweichen + Reaktion

        ranged:
            ausweichen: Reaktion

        volle Abwehr:
            ranged:
                Volles Ausweichen: Ausweichen + Reaktion
                akrobatisches Ausweichen: Akrobatik + Reaktion
            melee:
                Volles Ausweichen: Ausweichen + Ausweichen + Reaktion
                             oder Nahkampfertigkeit + Ausweichen + Reaktion

                volles Parieren: Waffenfertigkeit + Waffenfertigkeit + Reaktion

                Akrobatisches Ausweichen: Akrobatik + Ausweichen + Reaktion
         */

        let values = [];

        if (type == EvadeType.Melee)
        {
            if (fullDefense)
            {
                const maxSkill = Math.max(
                    evade.total * 2,
                    unarmed.total + evade.total,
                    melee.total + evade.total,
                    melee.total * 2,
                    acrobatic.total + evade.total,
                );

                if ((acrobatic.total + evade.total) >= maxSkill)
                {
                    name = 'Akrobatisches Ausweichen';
                    values.push({ name: acrobatic.name, value: acrobatic.total });
                    values.push({ name: evade.name, value: evade.total });
                }

                if ((melee.total * 2) >= maxSkill)
                {
                    name = 'Volles Parieren';
                    values.push({ name: melee.name + ' x2', value: melee.total * 2 });
                }

                if ((melee.total + evade.total) >= maxSkill)
                {
                    name = 'Volles Ausweichen';
                    values.push({ name: melee.name, value: melee.total });
                    values.push({ name: evade.name, value: evade.total });
                }

                if ((unarmed.total + evade.total) >= maxSkill)
                {
                    name = 'Volles Ausweichen';
                    values.push({ name: unarmed.name, value: unarmed.total });
                    values.push({ name: evade.name, value: evade.total });
                }

                if (evade.total * 2 >= maxSkill)
                {
                    name = 'Volles Ausweichen';
                    values.push({ name: evade.name + ' x2', value: evade.total * 2 });
                }
            }
            else
            {
                const maxSkill = Math.max(evade.total, unarmed.total, melee.total);

                if (evade.total >= maxSkill)
                {
                    name = 'Ausweichen';
                    values.push({ name: evade.name, value: evade.total });
                }
                if (unarmed.total >= maxSkill)
                {
                    name = 'Blocken';
                    values.push({ name: unarmed.name, value: unarmed.total });
                }
                if (melee.total >= maxSkill)
                {
                    name = 'Parieren';
                    values.push({ name: melee.name, value: melee.total });
                }
            }
        }
        else if (type == EvadeType.Ranged)
        {
            if (fullDefense)
            {
                if (evade.total > acrobatic.total)
                {
                    name = 'Volles Ausweichen';
                    values.push({ name: evade.name, value: evade.total });
                }
                else
                {
                    name = 'Akrobatisches Ausweichen';
                    values.push({ name: acrobatic.name, value: acrobatic.total });
                }
            }
            else
            {
                name = 'Ausweichen';
            }
        }

        values.push({ name: reaction.name, value: reaction.total });

        return {
            name: name,
            value: values.reduce((acc, cur) => acc + cur.value, 0),
            values: values,
        }
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

    getObjectForSelectedItem(item: SelectedItem): Spell | Weapon | Spirit | Vehicle | null {
        switch (item.type) {
            case 'Vehicle': return this.vehicles.find((obj: IdObject) => obj.generateId() == item.id) ?? null;
            case 'Weapon' : return this.weapons.find((obj: IdObject) => obj.generateId() == item.id) ?? null;
            case 'Spell' : return this.spells.find((obj: IdObject) => obj.generateId() == item.id) ?? null;
            case 'Spirit' : return this.spirits.find((obj: IdObject) => obj.generateId() == item.id) ?? null;
        }
        return null;
    }

    isItemSelected( obj: any ): boolean {
        const item = toSelectedItem(obj);
        return (this.sheet.selectedItems.find((selectedItem: SelectedItem) => selectedItemEquals(selectedItem, item)) ?? null) !== null;
    }
    selectItem(obj: any): void {
        this.sheet.selectedItems.push(toSelectedItem(obj));
    }
    unselectItem(obj: any): void {
        const item = toSelectedItem(obj);
        this.sheet.selectedItems = this.sheet.selectedItems.filter((selectedItem: any) => !selectedItemEquals(selectedItem, item));
    }

    skillByName(name: string): Skill {

        return this.actionSkills.find((item: any) => item.name === name)
        ?? this.knowledgeSkills.find((item: any) => item.name === name)
        ?? this.actionSkills.find((item: any) => item.name === translate(name))
        ?? this.knowledgeSkills.find((item: any) => item.name === translate(name))
        ?? {
                name: name,
                type: 'unknown',
                attribute: 'unknown',
                attribute_value: 0,
                rating: 0,
                total: 0,
            };
    }

    getName(): string {
        return this.name;
    }

    getInitiativeVR(): Initiative {
        return this.initiative.matrix;
    }
    getInitiativeRemote(): Initiative {
        return this.initiative.normal;
    }

    getDefenseMeleeSkill(): PoolValue {
        const skill = this.skillByName(this.sheet.defenseMeleeSkill);
        return { name: skill.name, value: skill.total};
    }

    getEvadeSkill(): PoolValue {
        const skill = this.skillByName('Ausweichen');
        return { name: skill.name, value: skill.total};
    }

    getSkill(name: string): PoolValue {
        const skill = this.skillByName(name);
        return { name: skill.name, value: skill.total};
    }

    getCommandValue(): PoolValue {
        const value = this.commlink?.programs?.find(item => item.name === 'Befehl')?.rating ?? 0;
        return { name: 'Befehl', value: value };
    }

    getWeaponSettings(): WeaponSetting[]
    {
        return this.sheet.weaponSettings;
    }

    addWeapon(weapon: Weapon): Container {
        this.weapons.push(weapon);
        return this;
    }

    getAmmunitions(): Ammunition[] {
        return this.ammunitions;
    }

    getWeaponPoolValues(weapon: Weapon): PoolValue[] | null
    {
        /*  der Skill ist nicht bekannt. ein zusätzlicher Modifier zB vom Smartgun würde auf den Skill gerechnet werden.
          {
            name: weapon.name,
            value: toInt(weapon.dicepool) + rangeModifier + modeModifier,
            values: [
                {name: 'Fertigkeit', value: toInt(weapon.dicepool)-char.attributes.agility.total},
                {name: 'Geschicklichkeit', value: char.attributes.agility.total},
                {name: 'Distanz', value: rangeModifier},
                {name: 'Modus', value: modeModifier},
                ]
          }
         */

        return null;
    }

}


export const char = reactive(new Charakter(data.value, sheet_data.value));
