import {reactive} from "vue";
import {char, type Spirit} from "@/composables/data";
import {uploadSheet} from "@/composables/fetch";

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
    doChoose: boolean = true;

    show() {
        this.doChoose = true;
        super.show();
    }
}

export class ShowSpiritSheet extends Dialog {
    type: string = 'unbekannt';

    setType(type: string): ShowSpiritSheet {
        this.type = type;
        return this;
    }
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
export const DialogSpiritSheet = reactive(new ShowSpiritSheet());
export const DialogManageEdge = reactive(new Dialog());
export const DialogAddSpirit = reactive(new AddSpiritDialog());
export const DialogDroneSheet = reactive(new Dialog());
export const DialogReleaseSpirit = reactive(new Dialog());
export const DialogChangeKarma = reactive(new Dialog());
