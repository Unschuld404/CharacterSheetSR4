import {reactive} from "vue";
import {char, Charakter} from "@/composables/data";

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
    }
}

export class SummonSpiritDialog extends Dialog {
    type: string = 'unbekannt';
}

export class RollDiceDialog extends Dialog {

    name: string = 'Würfeln';

    dice_count: number = 0;

    edge_checked : boolean = false;

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
export const DialogSpiritSheet = reactive(new Dialog());
export const DialogManageEdge = reactive(new Dialog());
export const DialogSummonSpirit = reactive(new SummonSpiritDialog());
export const DialogChooseSpirit = reactive(new Dialog());
export const DialogDroneSheet = reactive(new Dialog());
