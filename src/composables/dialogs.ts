import {reactive} from "vue";
import {uploadSheet} from "@/composables/fetch";
import {isWatcher, Spirit, type SpiritPower, type SpiritType} from "@/composables/spirits";
import {char} from "@/composables/char";
import {
    type RollDiceResult,
    type RollDiceValues,
    type WeaponSetting
} from "@/composables/types";
import {Weapon} from "@/composables/weapons";
import {Vehicle} from "@/composables/vehicle";

export class Dialog  {
    visible: boolean;

    constructor() {
        this.visible = false;
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
        uploadSheet().then(() => {});
    }
}

export class AddSpiritDialog extends Dialog {
    force : number = 1;
    services : number = 1;
    type: SpiritType | null = null;

    show() {
        this.force = char.attributes.magic.total;
        this.services = 1;
        this.type = null;
        super.show();
    }

    addForce()
    {
        this.force++;
    }

    substractForce()
    {
        if (this.force > 1) {
            this.force--;
        }
    }

    addServices()
    {
        this.services++;
    }

    substractServices()
    {
        if (this.services > 1)
        {
            this.services--;
        }
    }

    commit()
    {
        if (this.isWatcher)
        {
            this.force = 1;
        }
        if (this.type !== null)
        {
            char.addSpirit(this.type, this.force, this.services);
        }

        DialogAddSpirit.hide();
    }

    get selectedType(): string { return this.type?.name ?? 'unknown' }
    get doChooseType(): boolean { return this.type === null}
    get isWatcher(): boolean { return isWatcher(this.type) }
}

export class SpiritSheetDialog extends Dialog {
    spirit!: Spirit;
    setSpirit(spirit: Spirit): SpiritSheetDialog {
        this.spirit = spirit;
        return this;
    }
}

export class VehicleSheetDialog extends Dialog {
    vehicle: Vehicle | null = null;
    setVehicle(vehicle: Vehicle): VehicleSheetDialog
    {
        this.vehicle = vehicle;
        return this;
    }
    getVehicle(): Vehicle {
        return this.vehicle ?? new Vehicle();
    }
}

export class SpiritPowerInfoDialog extends Dialog {
    spiritPower!: SpiritPower;
    setPower(spiritPower: SpiritPower): SpiritPowerInfoDialog {
        this.spiritPower = spiritPower;
        return this;
    }
}

export class WeaponDialog extends Dialog {
    weapon!: Weapon;
    setting!:WeaponSetting;

    show() {

        if ( this.weapon == null)
        {
            return;
        }

        this.setting = this.weapon.settings;
        super.show();
    }

    setWeapon(weapon: Weapon): WeaponDialog {
        this.weapon = weapon;
        return this;
    }
}

export class RollDiceDialog extends Dialog {

    name: string = 'Würfeln';

    dice_count: number = 0;

    edge_checked : boolean = false;

    result : RollDiceResult | null = null;

    values: RollDiceValues | null = null;

    setValues(values: RollDiceValues): RollDiceDialog {
        this.values = values;
        this.name = values.name;
        this.dice_count = values.value;
        return this;
    }

    setName(name: string): RollDiceDialog {
        this.name = name;
        return this;
    }

    setDiceCount(count: number): RollDiceDialog {
        this.dice_count = count;
        return this;
    }

    get edge_disabled(): boolean {
        return char.attributes.edge.total <= 0;
    }

    addDice(): void {
        this.dice_count ++;
    }

    removeDice(): void {
        if (this.dice_count > 0)
        {
            this.dice_count--;
        }
    }
}



export const DialogRollDice = reactive(new RollDiceDialog());
export const DialogChangeNuyen = reactive(new Dialog());
export const DialogSpiritSheet = reactive(new SpiritSheetDialog());
export const DialogManageEdge = reactive(new Dialog());
export const DialogAddSpirit = reactive(new AddSpiritDialog());
export const DialogVehicleSheet = reactive(new VehicleSheetDialog());
export const DialogChangeKarma = reactive(new Dialog());
export const DialogWeapon = reactive(new WeaponDialog());
export const DialogManageSpiritEdge = reactive(new Dialog());
export const DialogSpiritPowerInfo = reactive(new SpiritPowerInfoDialog());
export const DialogDiceResult = reactive(new Dialog());
export const DialogEdgeDiceResult = reactive(new Dialog());
export const DialogCommlink = reactive(new Dialog());