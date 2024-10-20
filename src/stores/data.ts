import {defineStore} from "pinia";
import {ref} from "vue";

export type Skill = {
    name: string;
    attribute: string;
    modifier: number;
    rating: number;
    total: number;
}
export type Spell = {
    name: string;
    category: string;
    type: string;
    range: string;
    duration: string;
    dv: string;
}
export type Spirit = {
    type: string;
    services: number;
    force: number;
    bound: boolean;
}
export type Vehicle = {
    name: string;
    handling: string;
    accel: string;
    speed: string;
    pilot: string;
    body: string;
    armor: string;
    sensor: string;
}
export type Weapon = {
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
}

export const useDataStore = defineStore('data',
    () => {
        const uid = ref<string | null>(null);

        const data = ref<any | null>(null);

        async function fetchFromAPI() {
            if (uid.value == null) {
                console.error('Error: uid not set');
                return;
            }

            if (data.value != null) {
                return;
            }

            const basePath = 'https://api.blackserver.de/chummer/data/';
            const url = basePath + encodeURIComponent();

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    console.error(`API Error ( ${response.status}): ${response.statusText} ${await response.text()} `);
                }
                data.value = await response.json();
            } catch (error: any) {
                console.error('Connection Error:', error);
            }
        }

        function getAttributeValueByName(name: string): number {
            let attributes = data?.value?.attributes ?? [];
            return attributes.find((item: any) => item.name === name)?.total ?? 0;
        }

        function getSkills(knowledge: boolean): Array<Skill> {
            let skills = data.value?.skills ?? [];

            return skills
                .filter((skill: any) => skill.knowledge === (knowledge ? 'True' : 'False'))
                .map((skill: any) => (
                    {
                        name: skill.name || 'Unbekannt',
                        attribute: skill.attribute || 'Unbekannt',
                        modifier: skill.attributemod || 0,
                        rating: skill.rating || 0,
                        total: skill.total || 0
                    }));
        }

        function getKnowledgeSkills(): Array<Skill> {
            return getSkills(true);
        }

        function getActionSkills(): Array<Skill> {
            return getSkills(false);
        }

        function getSpells(): Array<Spell> {
            let spells = data.value?.spells ?? [];

            return data.value.spells.map((spell: any) => ({
                name: spell.name || 'Unbekannt',
                category: spell.category || 'Unbekannt',
                type: spell.type || 'Unbekannt',
                range: spell.range || 'Unbekannt',
                duration: spell.duration || 'Unbekannt',
                dv: spell.dv || 'Unbekannt'
            }));
        }

        function getSpirits(): Array<Spirit> {
            const spiritData = data.value.spirits;

            return spiritData.map((spirit: any) => (
                {
                    type: spirit.crittername || 'Unknown',
                    services: parseInt(spirit.services, 10) || 0,
                    force: parseInt(spirit.force, 10) || 0,
                    bound: spirit.bound === 'True'
                }));
        }

        function getVehicles(): Array<Vehicle> {
            let vehicles = data.value?.vehicles ?? [];

            return vehicles.map((vehicle: any) => ({
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

        function getWeapons(): Array<Weapon> {
            let weapons = data.value?.weapons ?? [];

            return weapons.map((weapon: any) => ({
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

        return {
            uid,
            data,
            fetchFromAPI,
            getAttributeValueByName,
            getKnowledgeSkills,
            getActionSkills,
            getSpells,
            getSpirits,
            getVehicles,
            getWeapons,
        }
    });