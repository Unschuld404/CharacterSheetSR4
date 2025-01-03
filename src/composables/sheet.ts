import {ref} from "vue";
import {Spirit} from "@/composables/spirits";
import type {DamageTaken, KarmaEntry, NuyenEntry, SelectedItem} from "@/composables/types";
import {getKarmaLog, getNuyenLog, getSelectedItems, getWeaponSettings} from "@/composables/data";
import {WeaponSetting} from "@/composables/weapons";

export const sheet_data = ref<any | null>(null);

export class Sheet {
    karma_log: KarmaEntry[];
    nuyen_log: NuyenEntry[];
    selectedSkills : string[];
    selectedItems : SelectedItem[];
    weaponSettings : WeaponSetting[];
    defenseMeleeSkill: string = 'Waffenloser Kampf';

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
        this.weaponSettings = getWeaponSettings(sheet);

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