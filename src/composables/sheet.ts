import {ref} from "vue";
import {Spirit} from "@/composables/spirits";
import type {Ammunition, AutoSoft, DamageTaken, KarmaEntry, NuyenEntry, SelectedItem} from "@/composables/types";
import {
    getKarmaLog,
    getNuyenLog,
    getSelectedItems, getSpirits,
    getWeaponSettings
} from "@/composables/data";
import {WeaponSetting} from "@/composables/weapons";
import type {VehicleSetting} from "@/composables/vehicle";
import {toInt} from "@/composables/utils";

export const sheet_data = ref<any | null>(null);

export class Sheet {
    karma_log: KarmaEntry[];
    nuyen_log: NuyenEntry[];
    selectedSkills : string[];
    selectedItems : SelectedItem[];
    weaponSettings : WeaponSetting[];
    vehicleSettings : VehicleSetting[];
    defenseMeleeSkill: string = 'Waffenloser Kampf';
    ammunitions: Ammunition[] = [];

    edge : number;
    nuyen: number;
    karma: number;
    spirits: Spirit[];
    damage: DamageTaken;

    constructor(sheet: any) {
        this.edge = sheet?.edge ?? 0;
        this.nuyen = sheet?.nuyen ?? 0;
        this.karma = sheet?.karma ?? 0;
        this.damage = getDamageTaken(sheet);
        this.spirits = getSpirits(sheet) ?? [];
        this.ammunitions = getAmmunitions(sheet) ?? [];
        this.selectedSkills = sheet?.selectedSkills ?? [];
        this.karma_log = getKarmaLog(sheet);
        this.nuyen_log = getNuyenLog(sheet);
        this.selectedItems = getSelectedItems(sheet);
        this.weaponSettings = getWeaponSettings(sheet);
        this.vehicleSettings = getVehicleSettings(sheet);
    }

    toJSON() {
        return this;
    }
}

function getDamageTaken(data: any): DamageTaken {
    return {
        physical: toInt(data?.physical ?? null),
        stun: toInt(data?.stun ?? null),
    };
}

function getAmmunitions(data: any): Ammunition[] {
    let list = data?.ammunitions ?? null;
    if (list === null)
    {
        return [];
    }
    return list.map((entry: any) => getAmmunitionFromData(entry));
}

function getAmmunitionFromData(data: any): Ammunition {
    return {
        name: data.name,
        extra: data.extra,
        count: toInt(data.count),
        dmg: toInt(data.dmg),
        ap: toInt(data.ap),
    }
}

function getVehicleSettings(data: any): VehicleSetting[] {
    let list = data?.vehicleSettings;
    list = Array.isArray(list) ? list : [];
    return list.map((entry: any) => ({
        vehicleId: entry.vehicleId,
        selectedVehicleMode: entry.selectedVehicleMode,
        ammunitions: getAmmunitions(entry),
        autosofts: getAutoSoftsFromSheetData(entry),
        weaponSettings : getWeaponSettings(entry),
    }));
}

function getAutoSoftsFromSheetData(data: any): AutoSoft[] | null {
    let list = data?.autosofts ?? null;
    if (list === null)
    {
        return null;
    }
    return list.map((entry: any) => getAutoSoftFromSheetData(entry));
}

function getAutoSoftFromSheetData(data: any): AutoSoft {
    return {
        name: data.name,
        rating: toInt(data.rating),
        skill: data.skill,
        extra: data.extra,
    }
}


