import {ref} from "vue";
import {
    type Armor, type ArmorMod, type ArmorValues,
    type Commlink, type CommlinkMod, type Contact, type Container,
    type Gear,
    GearType,
    type KarmaEntry, type Lifestyle,
    type NuyenEntry, type Program,
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
        selectedMode: entry.selectedMode,
        ammoLoaded: entry.ammoLoaded,
        magSize: toInt(entry.magSize),
        magType: entry.magType,
        ammoLeft : toInt(entry.ammoLeft),
        bulletsFired: toInt(entry.bulletsFired),
    }));
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
export function getVehicles(data: any): Array<Vehicle> {
    let vehicles = data?.vehicles;
    vehicles = Array.isArray(vehicles) ? vehicles : [];

    return vehicles.map((vehicle: any) => Vehicle.createFromDataObject(vehicle));
}
export function getWeapons(data: any, parent: Container): Array<Weapon> {
    let weapons = data?.weapons;
    weapons = Array.isArray(weapons) ? weapons : [];

    return weapons.map((weapon: any) => Weapon.createFromDataObject(weapon, parent));
}

function isGearEqual(gear1: Gear, gear2: Gear): boolean {
    return     gear1.name === gear2.name
            && gear1.category === gear2.category
            && gear1.extra === gear2.extra;
}

export function getGear(data: any): Array<Gear> {
    let gears = data?.gears;
    gears = Array.isArray(gears) ? gears : [];

    let items: Gear[] = [];
    for (let gear of gears)
    {
        const item = getGearFromGearData(gear);
        const ind = items.findIndex(aItem => isGearEqual(aItem, item));
        if (ind < 0)
        {
            items.push(item);
        }
        else
        {
            items[ind].count += item.count;
        }
    }

    items.sort((a: Gear, b: Gear) => {
        let result = a.category.localeCompare(b.category);
        if (result == 0)
        {
            result = a.extra.localeCompare(b.extra);
        }
        if (result == 0)
        {
            result = a.name.localeCompare(b.name);
        }
        return result;
    });

    return items;
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
        autosofts: getAutoSoftFromData(item.children || []),
        mods: getCommlinkModsFromData(item.children || []),
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
export function getWeaponModsFromData(data: any[]): WeaponMod[] {

    return data
        .map((item: any) => ({
            name: item.name || '',
            rating: toInt(item.rating),
            rc: toInt(item.rc),
        }));
}

export function getAutoSoftFromData(data: any[]): Program[] {

    return data
        .filter((item: any) => item.category_english == 'Autosofts')
        .map((item: any) => ({
            name: item.name || '',
            rating: toInt(item.rating),
            extra: item.extra || '',
        }));
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


export function dataIsValid(): boolean {
    return data !== null;
}
