import {ref} from "vue";
import {
    type Commlink,
    type Gear,
    GearType,
    type KarmaEntry,
    type NuyenEntry,
    type SelectedItem,
    type Skill,
    type Spell,
    type WeaponSetting
} from "@/composables/types";
import {toBool, toGearType, toInt} from "@/composables/utils";
import {Spirit} from "@/composables/spirits";
import {Vehicle} from "@/composables/vehicle";
import {Weapon} from "@/composables/weapons";

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
    let log = data?.value?.karma_log;
    log = Array.isArray(log) ? log : [];
    return log.map((entry: any) => ({
        date: entry.date,
        value: entry.value,
        reason: entry.reason,
    }));
}
export function getNuyenLog(data: any): NuyenEntry[]  {
    let log = data?.value?.nuyen_log;
    log = Array.isArray(log) ? log : [];
    return log.map((entry: any) => ({
        date: entry.date,
        value: entry.value,
        reason: entry.reason,
    }));
}
export function getSelectedItems(data: any): SelectedItem[] {
    let list = data?.value?.selectedItems;
    list = Array.isArray(list) ? list : [];
    return list.map((entry: any) => ({
        type: entry.type,
        name: entry.name,
    }));
}
export function getWeaponSettings(data: any): WeaponSetting[] {
    let list = data?.value?.weaponSettings;
    list = Array.isArray(list) ? list : [];
    return list.map((entry: any) => ({
        weaponId: entry.weaponId,
        selectedMode: entry.selectedMode,
        ammoLoaded: entry.ammoLoaded,
        magSize: toInt(entry.magSize),
        magType: entry.magType,
        ammoLeft : toInt(entry.ammoLeft),
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

    return spells.map((spell: any) => ({
        name: spell.name || 'Unbekannt',
        category: spell.category || 'Unbekannt',
        type: spell.type || 'Unbekannt',
        range: spell.range || 'Unbekannt',
        duration: spell.duration || 'Unbekannt',
        dv: spell.dv || 'Unbekannt'
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
export function getWeapons(data: any): Array<Weapon> {
    let weapons = data?.weapons;
    weapons = Array.isArray(weapons) ? weapons : [];

    return weapons.map((weapon: any) => Weapon.createFromDataObject(weapon));
}
export function getGear(data: any): Array<Gear> {
    let items = data?.gears;
    items = Array.isArray(items) ? items : [];

    return items.map((item: any) => getGearFromGearData(item));
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
    }
}
export function dataIsValid(): boolean {
    return data.value !== null;
}
