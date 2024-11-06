import type {Signal, Translation} from "@/composables/types";

export const SignalTiers: Signal[] = [
    { signal: 0, range: '3 m'},
    { signal: 1, range: '40 m'},
    { signal: 2, range: '100 m'},
    { signal: 3, range: '400 m'},
    { signal: 4, range: '1 km'},
    { signal: 5, range: '4 km'},
    { signal: 6, range: '10 km'},
    { signal: 7, range: '40 km'},
    { signal: 8, range: '100 km'},
    { signal: 9, range: '400 km'},
]


export const translations: Translation = {
    Spruchzauberei: 'Spellcasting',
    Waffenlos: 'Unarmed Attack',
    Ausweichen: 'Dodge',
    Akrobatik: 'Gymnastics',
}

