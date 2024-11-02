import {toArray, toInt} from "@/composables/utils";
import type {Skill} from "@/composables/data";

export type SpiritType = {
    name: string;
    english_name: string;
    modifiers : Modifier[];
    skills: string;
    powers: string;
    optional: string;
    movement: string;
    flaws: string;
}

export const BoundModes = [
    { label: 'Gebunden', value: 'gebunden' },
    { label: 'Ungebunden', value: 'ungebunden' },
];

export class Spirit {
    type: string = 'unknown';
    name: string = '';
    services: number = 0;
    force: number = 1;
    bound: boolean = false;
    created: boolean = true;
    optionalPowers: string[] = [];

    get valid(): boolean { return this.spiritType !== null }
    get spiritType(): SpiritType | null { return SpiritTypes.find((item: SpiritType) => { return item.name === this.type }) ?? null };
    set spiritType(value: SpiritType) { this.type = value.name }
    get caption(): string { return (this.name ?? '') || this.type }
    get maxOptionalPowersCount(): number { return Math.floor(this.force / 3) }
    get optionalPowersCount(): number { return this.optionalPowers.length }
    get powers(): SpiritPower[] {
        const powers = [];
        const powersAsString = this.optionalPowers.concat(toArray(this.spiritType?.powers));
        for (const powerAsString of powersAsString) {
            powersAsString.push(powerAsString);
            const power = getSpiritPower(powerAsString);
            if (power !== null)
            {
                powers.push(power);
            }
            else
            {
                console.error('SpiritPower not found: ' + powerAsString)
            }
        }
        return powers;
    }
    get skills(): Skill[] {
        const skills = [];
        const skillsAsString = toArray(this.skills);
        for (const skillAsString of skillsAsString) {

        }


        return skills;
    }

    equals(spirit: Spirit): boolean {
        return this.type === spirit.type
            && this.name === spirit.name
            && this.force === spirit.force
            && this.services === spirit.services
            && this.created === spirit.created
            && this.bound === spirit.bound;
    }

    static create(type: SpiritType, force: number, services: number): Spirit {
        const newSpirit: Spirit = new Spirit();
        newSpirit.spiritType = type;
        newSpirit.force = force;
        newSpirit.services = services;
        return newSpirit;
    }

    static createFromDataObject(obj: any): Spirit {
        let newSpirit = new Spirit();

        newSpirit.type = obj.name || obj.type;
        newSpirit.name = obj.crittername;
        newSpirit.services = toInt(obj.services);
        newSpirit.force = toInt(obj.force);
        newSpirit.bound = obj.bound === 'True';
        newSpirit.created = false;

        return newSpirit;
    }


}

export type SpiritPower = {
    name: string;
    type: string;
    action: string;
    range: string;
    duration: string;
}

export function PowerHasPool(power: SpiritPower): boolean {
    return power.range !== 'Selbst';
}

export function isWatcher(type: SpiritType | null): boolean {
    return (type?.english_name ?? '') === 'Watcher';
}



export type Modifier = {
    name: string;
    value: number;
}

export function getSpiritPower(name: string): SpiritPower | null {
    return SpiritPowers.find((item: SpiritPower) => item.name === name) ?? null;
}

export const SpiritPowers: SpiritPower[] =  [
    {
        name: 'Astrale Gestalt',
        type: 'M',
        action: 'Auto',
        range: 'Selbst',
        duration: 'Immer',
    },
    {
        name: 'Bewegung',
        type: 'P',
        action: 'Komplex',
        range: 'BF',
        duration: 'Aufrechterhalten',
    },
    {
        name: 'Bewusstsein',
        type: 'P',
        action: 'Auto',
        range: 'Selbst',
        duration: 'Immer',
    },
    {
        name: 'Bindung',
        type: 'P',
        action: 'Komplex',
        range: 'BF',
        duration: 'Sofort',
    },
    {
        name: 'Materialisierung',
        type: 'P',
        action: 'Komplex',
        range: 'Selbst',
        duration: 'Aufrechterhalten',
    },
    {
        name: 'Schutz',
        type: 'P',
        action: 'Komplex',
        range: 'BF',
        duration: 'Aufrechterhalten',
    },
    {
        name: 'Suche',
        type: '',
        action: '',
        range: '',
        duration: '',
    },
    {
        name: 'Elementarer Angriff',
        type: '',
        action: '',
        range: '',
        duration: '',
    },
    {
        name: 'Grauen',
        type: 'M',
        action: 'Komplex',
        range: 'BF',
        duration: 'Speziell',
    },
    {
        name: 'Verschleierung',
        type: '',
        action: '',
        range: '',
        duration: '',
    },
    {
        name: 'Verschlingen',
        type: '',
        action: '',
        range: '',
        duration: '',
    },
    {
        name: 'Verwirrung',
        type: '',
        action: '',
        range: '',
        duration: '',
    },
    {
        name: 'Energieaura',
        type: '',
        action: '',
        range: '',
        duration: '',
    },
    {
        name: 'Unfall',
        type: '',
        action: '',
        range: '',
        duration: '',
    },
    {
        name: 'Übler Atem',
        type: '',
        action: '',
        range: '',
        duration: '',
    },
    {
        name: 'Psychokinese',
        type: '',
        action: '',
        range: '',
        duration: '',
    },
]

export function optionalPowersFor(type: string): SpiritPower[]
{
    const spiritType = SpiritTypes.find((item: SpiritType) => { return item.name === type }) ?? null;
    return toArray(spiritType);
}

export const SpiritTypes : SpiritType[] = [
    {
        name: 'Erdgeist',
        english_name: 'Spirit of Earth',
        modifiers: [
            {name: 'BOD', value:  4},
            {name: 'AGI', value: -2},
            {name: 'REA', value:  2},
            {name: 'STR', value:  4},
            {name: 'INI', value:  2},
        ],
        movement: '10/25',
        skills: 'Askennen, Astralkampf, Ausweichen, Exotische Fernkampfwaffe, Waffenloser Kampf, Wahrnehmung',
        powers: 'Astrale Gestalt, Bewegung, Bewusstsein, Bindung, Materialisierung, Schutz, Suche',
        optional: 'Elementarer Angriff, Grauen, Verschleierung, Verschlingen, Verwirrung',
        flaws: '',
    },
    {
        name: 'Feuergeist',
        english_name: 'Spirit of Fire',
        modifiers: [
            {name: 'BOD', value:  1},
            {name: 'AGI', value:  2},
            {name: 'REA', value:  3},
            {name: 'STR', value: -2},
            {name: 'INI', value:  3},
        ],
        movement: '15/40 (fliegend)',
        skills: 'Askennen, Astralkampf, Ausweichen, Exotische Fernkampfwaffe, Fliegen, Waffenloser Kampf, Wahrnehmung',
        powers: 'Astrale Gestalt, Bewusstsein, Elementarer Angriff, Energieaura, Materialisierung, Unfall, Verschlingen, Verwirrung',
        optional: 'Grauen, Schutz, Suche, Übler Atem',
        flaws: 'Allergie (Wasser, Schwer)',
    },
    {
        name: 'Luftgeist',
        english_name: 'Spirit of Air',
        modifiers: [
            {name: 'BOD', value: -2},
            {name: 'AGI', value:  3},
            {name: 'REA', value:  4},
            {name: 'STR', value: -3},
            {name: 'INI', value:  4},
        ],
        movement: '15/75 (fliegend)',
        skills: 'Askennen, Astralkampf, Ausweichen, Exotische Fernkampfwaffe, Fliegen, Waffenloser Kampf, Wahrnehmung',
        powers: 'Astrale Gestalt, Bewegung, Bewusstsein, Materialisierung, Suche, Unfall, Verschleierung, Verschlingen, Verwirrung',
        optional: 'Elementarer Angriff , Energieaura, Grauen, Psychokinese, Schutz, Übler Atem',
        flaws: '',
    },
    {
        name: 'Wassergeist',
        english_name: 'Spirit of Water',
        modifiers: [
            {name: 'BOD', value:  0},
            {name: 'AGI', value:  0},
            {name: 'REA', value:  0},
            {name: 'STR', value:  0},
            {name: 'INI', value:  0},
        ],
        movement: '',
        skills: '',
        powers: '',
        optional: '',
        flaws: '',
    },
    {
        name: 'Geist der Menschen',
        english_name: 'Spirit of Man',
        modifiers: [
            {name: 'BOD', value:  0},
            {name: 'AGI', value:  0},
            {name: 'REA', value:  0},
            {name: 'STR', value:  0},
            {name: 'INI', value:  0},
        ],
        movement: '',
        skills: '',
        powers: '',
        optional: '',
        flaws: '',
    },
    {
        name: 'Geist der Tiere',
        english_name: 'Spirit of Animal',
        modifiers: [
            {name: 'BOD', value:  0},
            {name: 'AGI', value:  0},
            {name: 'REA', value:  0},
            {name: 'STR', value:  0},
            {name: 'INI', value:  0},
        ],
        movement: '',
        skills: '',
        powers: '',
        optional: '',
        flaws: '',
    },
    {
        name: 'Watcher',
        english_name: 'Watcher',
        modifiers: [
            {name: 'BOD', value:  0},
            {name: 'AGI', value:  0},
            {name: 'REA', value:  0},
            {name: 'STR', value:  0},
            {name: 'EDG', value: -1},
            {name: 'INI', value:  0},
        ],
        movement: '',
        skills: '',
        powers: '',
        optional: '',
        flaws: '',
    },

];
