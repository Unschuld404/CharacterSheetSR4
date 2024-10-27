import {reactive} from "vue";

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

export const DialogRollDice = reactive(new Dialog());
export const DialogChangeNuyen = reactive(new Dialog());
export const DialogSpiritSheet = reactive(new Dialog());
export const DialogManageEdge = reactive(new Dialog());