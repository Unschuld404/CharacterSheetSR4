import { ref } from 'vue';

const data = ref<any | null>(null);

function getTotalValueByName(name: string): number | null {
    if (!data.value || !data.value.attributes) return null;
    const block = data.value.attributes.find((item: any) => item.name === name);
    return block ? block.total : null;
}

// Funktion, um die Skills nach dem Knowledge-Wert zu filtern
function getSkills(knowledge: boolean): Array<{
    name: string;
    attribute: string;
    attributemod: number;
    rating: number;
    total: number;
}> {
    if (!data.value || !data.value.skills) return [];

    return data.value.skills
        .filter((skill: any) => skill.knowledge === (knowledge ? 'True' : 'False'))
        .map((skill: any) => ({
            name: skill.name || 'Unbekannt',
            attribute: skill.attribute || 'Unbekannt',
            attributemod: skill.attributemod || 0,
            rating: skill.rating || 0,
            total: skill.total || 0
        }));
}

// Funktion, um alle Zauber zurückzugeben
function getSpells(): Array<{
    name: string;
    category: string;
    type: string;
    range: string;
    duration: string;
    dv: string;
}> {
    if (!data.value || !data.value.spells || !data.value.spells.spell) return [];

    return data.value.spells.spell.map((spell: any) => ({
        name: spell.name || 'Unbekannt',
        category: spell.category || 'Unbekannt',
        type: spell.type || 'Unbekannt',
        range: spell.range || 'Unbekannt',
        duration: spell.duration || 'Unbekannt',
        dv: spell.dv || 'Unbekannt'
    }));
}

// Funktion, um alle Geister zurückzugeben
function getSpirits(): Array<{
    crittername: string;
    services: number;
    force: number;
    bound: boolean;
}> {
    if (!data.value || !data.value.spirits || !data.value.spirits.spirit) return [];

    const spiritData = data.value.spirits.spirit;

    return [{
        crittername: spiritData.crittername || 'Unknown',
        services: parseInt(spiritData.services, 10) || 0,
        force: parseInt(spiritData.force, 10) || 0,
        bound: spiritData.bound === 'True'
    }];
}

// Funktion, um alle Fahrzeuge zurückzugeben
function getVehicles(): Array<{
    name: string;
    handling: string;
    accel: string;
    speed: string;
    pilot: string;
    body: string;
    armor: string;
    sensor: string;
}> {
    if (!data.value || !data.value.vehicles) return [];

    const vehicleData = data.value.vehicles;

    return vehicleData.map((vehicle: any) => ({
        name: vehicle.name || 'Unknown',
        handling: vehicle.handling || '0',
        accel: vehicle.accel || '0/0',
        speed: vehicle.speed || '0',
        pilot: vehicle.pilot || '0',
        body: vehicle.body || '0',
        armor: vehicle.armor || '0',
        sensor: vehicle.sensor || '0'
    }));
}

// Funktion, um alle Waffen zurückzugeben
function getWeapons(): Array<{
    name: string;
    damage: string;
    ap: string;
    mode: string;
    rc: string;
    ammo: string;
    ranges: {
        short: string;
        medium: string;
        long: string;
        extreme: string;
    };
    dicepool: string;
}> {
    if (!data.value || !data.value.weapons) return [];

    const weaponData = data.value.weapons;

    return weaponData.map((weapon: any) => ({
        name: weapon.name || 'Unknown',
        damage: weapon.damage || '0',
        ap: weapon.ap || '0',
        mode: weapon.mode || '',
        rc: weapon.rc || '0',
        ammo: weapon.ammo || '0',
        ranges: {
            short: weapon.ranges?.short || '0',
            medium: weapon.ranges?.medium || '0',
            long: weapon.ranges?.long || '0',
            extreme: weapon.ranges?.extreme || '0'
        },
        dicepool: weapon.dicepool || '0'
    }));
}

export { data, getTotalValueByName, getSkills, getSpells, getSpirits, getVehicles, getWeapons };