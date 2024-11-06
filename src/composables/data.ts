import {ref} from "vue";
import type {
    Gear,
    KarmaEntry,
    NuyenEntry,
    SelectedItem,
    Skill,
    Spell,
    Weapon,
    WeaponSetting
} from "@/composables/types";
import {toBool, toGearType, toInt} from "@/composables/utils";
import {Spirit} from "@/composables/spirits";
import {Vehicle} from "@/composables/vehicle";

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

    return weapons.map((weapon: any) => ({
        name: weapon.name || 'Unknown',
        id:         weapon.category_english
            + '.' + weapon.name_english
            + '.' + weapon.damage_english
            + '.rc(' + weapon.rc + ')'
            + '.conceal(' + weapon.conceal+ ')'
            + '.' + weapon.weaponname,
        category_english: weapon.category_english || 'Unknown',
        damage: weapon.damage || '0',
        category: weapon.category || '',
        ap: weapon.ap || '0',
        mode: weapon.mode || '',
        rc: weapon.rc || '0',
        ammo: weapon.ammo || '0',
        type: weapon.type || '',
        ranges: {
            short: weapon.ranges?.short || '0',
            medium: weapon.ranges?.medium || '0',
            long: weapon.ranges?.long || '0',
            extreme: weapon.ranges?.extreme || '0'
        },
        dicepool: weapon.dicepool || '0'
    }));
}
export function getGear(data: any): Array<Gear> {
    let items = data?.gears;
    items = Array.isArray(items) ? items : [];

    return items.map((item: any) => ({
        name: item.name || 'Unknown',
        category: item.category || 'Unknown',
        type: toGearType(item),
        extra: item.extra || '',
        equipped: toBool(item.equipped),
        count : toInt(item.qty),
        signal: toInt(item.signal),
        firewall: toInt(item.firewall),
        system: toInt(item.system),
        processorlimit: toInt(item.processorlimit),
    }));
}
export function dataIsValid(): boolean {
    return data.value !== null;
}
