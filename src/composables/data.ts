import {ref} from "vue";
import {
    type Ammunition,
    type Armor, type ArmorMod, type ArmorValues, type Attributes, type AutoSoft,
    type Commlink, type CommlinkMod, type Contact, type Container, type DamageTaken, type Drain, type Gear,
    GearType,
    type KarmaEntry, type Lifestyle,
    type NuyenEntry, type Program, type Rigger,
    type SelectedItem,
    type Skill, Spell, type WeaponMod
} from "@/composables/types";
import {toBool, toGearType, toInt} from "@/composables/utils";
import {Spirit} from "@/composables/spirits";
import {Vehicle} from "@/composables/vehicle";
import {Weapon, WeaponSetting} from "@/composables/weapons";

export const data = ref<any | null>(null);

export function extractAttributeFromDrain(drain: string|null): string|null {
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
export function getKarmaLog(data: any): KarmaEntry[] {
    let log = data?.karma_log;
    log = Array.isArray(log) ? log : [];
    return log.map((entry: any) => ({
        date: entry.date,
        value: entry.value,
        reason: entry.reason,
    }));
}
export function getNuyenLog(data: any): NuyenEntry[]  {
    let log = data?.nuyen_log;
    log = Array.isArray(log) ? log : [];
    return log.map((entry: any) => ({
        date: entry.date,
        value: entry.value,
        reason: entry.reason,
    }));
}
export function getSelectedItems(data: any): SelectedItem[] {
    let list = data?.selectedItems;
    list = Array.isArray(list) ? list : [];
    return list.map((entry: any) => ({
        type: entry.type,
        id: entry.id,
    }));
}
export function getWeaponSettings(data: any): WeaponSetting[] {
    let list = data?.weaponSettings;
    list = Array.isArray(list) ? list : [];
    return list.map((entry: any) => ({
        weaponId: entry.weaponId,
        selectedWeaponMode: entry.selectedWeaponMode,
        selectedShootingMode: entry.selectedShootingMode,
        ammoLoaded: entry.ammoLoaded,
        magSize: toInt(entry.magSize),
        magType: entry.magType,
        ammoLeft : toInt(entry.ammoLeft),
        bulletsFired: toInt(entry.bulletsFired),
    }));
}

function gearEquals(one: any, other: any): boolean {
    return one.name === other.name
        && one.category === other.category
        && one.extra === other.extra;
}

function gearCompare(one: any, other: any) {
    let result = one.category.localeCompare(other.category);
    if (result == 0)
    {
        result = one.extra.localeCompare(other.extra);
    }
    if (result == 0)
    {
        result = one.name.localeCompare(other.name);
    }
    return result;
}

function gearCompress(list: any[]): any[] {
    const result = [];

    for (let item of list)
    {
        const ind = result.findIndex(aItem => gearEquals(aItem, item));
        if (ind < 0)
        {
            result.push(item);
        }
        else
        {
            result[ind].qty = toInt(result[ind].qty) + toInt(item.qty);
        }
    }

    return result;
}

export function getAmmunitions(data: any): Ammunition[] {
    let list = data?.gears;
    list = (Array.isArray(list) ? list : [])
        .filter((entry) => toBool(entry.isammo))

    const a = gearCompress( list)
        .sort((a, b) => gearCompare(a, b))

    return a
        .map((entry: any) => getAmmunitionFromData(entry));
}

export function getAmmunitionFromData(data: any): Ammunition {
    return {
        name: data.name,
        extra: data.extra,
        count: toInt(data.qty),
        dmg: toInt(data.weaponbonusdamage),
        ap: toInt(data.weaponbonusap),
    }
}

export function getEdge(data: any): number {
    let attributes = data?.attributes;
    attributes = Array.isArray(attributes) ? attributes : [];

    return toInt(attributes.find((item: any) => item.name === 'EDG')?.total);
}

export function getDamageTaken(data: any): DamageTaken|null {
    const physical = data?.physicalcmfilled ?? null;
    const stun  = data?.stuncmfilled ?? null;

    if (physical === null || stun === null) {
        return null;
    }

    return {
        physical: toInt(physical),
        stun: toInt(stun),
    };
}

export function getSkills(data: any, knowledge: boolean): Array<Skill> {
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
export function getKnowledgeSkills(data: any): Array<Skill> {
    return getSkills(data, true);
}
export function getActionSkills(data: any): Array<Skill> {
    return getSkills(data, false);
}
export function getSpells(data: any): Array<Spell> {
    let spells = data?.spells;
    spells = Array.isArray(spells) ? spells : [];

    return spells.map((spell: any) => new Spell(spell));
}
export function getContacts(data: any): Array<Contact> {
    let contacts = data?.contacts;
    contacts = Array.isArray(contacts) ? contacts : [];
    return contacts.map((contact: any) =>  getContactFromContactData(contact));
}
function getContactFromContactData(data: any): Contact {
    return {
        name: data.name || 'Unknown',
        rating: toInt(data.connection),
        loyalty: toInt(data.loyalty),
        type: data.type || 'Unknown',
    }
}
export function getLifestyles(data: any): Array<Lifestyle> {
    let lifestyles = data?.lifestyles;
    lifestyles = Array.isArray(lifestyles) ? lifestyles : [];
    return lifestyles.map((lifestyle: any) => getLifestyleFromLifestyleData(lifestyle));
}
function getLifestyleFromLifestyleData(data: any): Lifestyle {
    return {
        name: data.name || 'Unknown',
        cost: toInt(data.cost),
        months: toInt(data.months),
    }
}
export function getArmors(data: any): Array<Armor> {
    let armors = data?.armors;
    armors = Array.isArray(armors) ? armors : [];
    return armors.map((armor: any) => getArmorFromArmorData(armor));
}
function getArmorFromArmorData(data: any): Armor {
    return {
        name: data.name || 'Unknown',
        equipped: toBool(data.equipped),
        values: getArmorValuesFromData(data),
        mods: getArmorModsFromData(data),
    }
}
function getArmorValuesFromData(data: any): ArmorValues {
    return {
        impact : toInt(data?.b),
        ballistic : toInt(data?.i),
    }
}
function getArmorModsFromData(data: any): ArmorMod[] {
    let mods = data?.armormods ?? [];
    mods = Array.isArray(mods) ? mods : [];
    return mods.map((mod: any) => ({
        name : mod.name || 'Unknown',
        rating: toInt(mod.rating),
        category: mod.category || '',
        value: getArmorValuesFromData(mod),
    }));
}

export function getSpirits(data: any): Spirit[] | null {
    const spiritData = data?.spirits;

    if (spiritData === null || spiritData === undefined) {
        return null;
    }

    const spiritsArray = Array.isArray(spiritData) ? spiritData : [];

    return spiritsArray.map((spiritObj: any) => Spirit.createFromDataObject(spiritObj));
}
export function getVehicles(data: any, rigger: Rigger): Array<Vehicle> {
    let vehicles = data?.vehicles;
    vehicles = Array.isArray(vehicles) ? vehicles : [];

    return vehicles.map((vehicle: any) => Vehicle.createFromDataObject(vehicle, rigger));
}
export function getWeapons(data: any, parent: Container): Array<Weapon> {
    let weapons = data?.weapons;
    weapons = Array.isArray(weapons) ? weapons : [];

    return weapons.map((weapon: any) => Weapon.createFromDataObject(weapon, parent));
}

export function getGear(data: any): Gear[] {
    let list = data?.gears;
    list = (Array.isArray(list) ? list : [])
        .filter((entry) => !toBool(entry.isammo))

    return gearCompress( list)
        .sort((a: Gear, b: Gear) => gearCompare(a, b))
        .map((entry: any) => getGearFromGearData(entry));
}

export function getGearFromGearData(data: any): Gear {
    return {
        name: data.name || 'Unknown',
        category: data.category || 'Unknown',
        type: toGearType(data),
        extra: data.extra || '',
        equipped: toBool(data.equipped),
        count : toInt(data.qty),
        rating: toInt(data.rating),
    }
}

export function getCommlink(data: any): Commlink | null {
    let items = data?.gears;
    items = Array.isArray(items) ? items : [];

    let item =
        items.find((item: any) =>
            toGearType(item) === GearType.Commlink
            && toBool(item.equipped)
            && (toInt(item.qty) > 0)
        )
    ??
        items.find((item: any) =>
            toGearType(item) === GearType.Commlink
            && (toInt(item.qty) > 0)
        )
    ?? null;

    if (item == null) {
        return null;
    }

    return {
        name: item.name || 'Unknown',
        extra: item.extra || '',
        signal: toInt(item.signal),
        firewall: toInt(item.firewall),
        system: toInt(item.system),
        response: toInt(item.response),
        rating: toInt(item.rating),
        programs: getProgramsFromData(item.children || []),
        autosofts: getAutoSoftsFromData(item.children || []),
        mods: getCommlinkModsFromData(item.children || []),
        sins: getSinsFromData(item.children || []),
    }
}

export function getCommlinkModsFromData(data: any[]): CommlinkMod[] {

    return data
        .filter((item: any) => item.category_english == 'Commlink Accessories')
        .map((item: any) => ({
            name: item.name || '',
            rating: toInt(item.rating),
            category: item.category || '',
        }));
}
export function getSinsFromData(data: any[]): Gear[] {
    return data
        .filter((item: any) => toBool(item.issin))
        .map((item: any) => getGearFromGearData(item));
}
export function getWeaponModsFromData(data: any[]): WeaponMod[] {

    return data
        .map((item: any) => ({
            name: item.name || '',
            rating: toInt(item.rating),
            rc: toInt(item.rc),
        }));
}

export function getAutoSoftsFromData(data: any[]): AutoSoft[] {
    return data
        .filter((item: any) => item.category_english == 'Autosofts' || item.category_english == 'Autosofts, Drone')
        .map((item: any) => getAutosoftFromData(item));
}

function removeGehackt(str: string): string {
    return str
        .split(',')
        .map(s => s.trim())
        .filter(s => s !== 'gehackt')
        .join(', ');
}

export function getAutosoftFromData(data: any): AutoSoft {
    let extra = removeGehackt(data.extra || '')

    return {
        name: data.name || '',
        rating: toInt(data.rating),
        extra: extra,
        skill: autoSoftNameToSkillName(data.name_english || ''),
    }
}

function autoSoftNameToSkillName(name: string): string {
    switch (name) {
        case 'Clearsight':
            return 'Wahrnehmung';
        case 'Maneuver':
            return 'Manövrieren';
        case 'Targeting':
            return 'Angriff';
        case 'Covert Ops':
            return 'Infiltration / Heimlichkeit';
        case 'Defense':
            return 'Verteidigung';
        case 'Electronic Warfare':
            return 'Signale abfangen/stören';
        default:
            return '';
    }
}

export function getProgramsFromData(data: any[]): Program[] {
    return data
        .filter((item: any) => item.category_english == 'Matrix Programs')
        .map((item: any) => ({
            name: item.name || '',
            rating: toInt(item.rating),
            extra: item.extra || '',
        }));
}

export function getDrain(data: any): Drain {
    const attributes = data?.attributes ?? [];
    const attribute = extractAttributeFromDrain(data?.drain) ?? '';
    const willpowerValue = toInt(attributes.find((item: any) => item.name === 'WIL')?.total);
    const attributeValue = toInt(attributes.find((item: any) => item.name === attribute)?.total)

    return  {
        caption : data?.drain ?? '',
        attribute: attribute,
        total : willpowerValue + attributeValue,
    }
}

export function getAttributes(data: any): Attributes {
    const attributes = data?.attributes ?? [];
    return {
        edge: {
            name: 'EDG',
                base : toInt(attributes.find((item: any) => item.name === 'EDG')?.base),
                total : toInt(attributes.find((item: any) => item.name === 'EDG')?.total),
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
}


export function dataIsValid(): boolean {
    return data !== null;
}
