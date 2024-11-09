import {toBool, toInt} from "@/composables/utils";
import {
    type Ammunition,
    type AutoSoft,
    type Damage, EvadeType,
    type Gear, type IdObject,
    type Initiative, type Sensor, type SensorMod, type Skill,
    type VehicleMod,
    VehicleMode,
    type VehicleResistance,
} from "@/composables/types";

import type {Weapon} from "@/composables/weapons";
import {getGearFromGearData, getWeapons} from "@/composables/data";

export class Vehicle implements IdObject  {
    static nextId: number = 0;
    id: number = 0;

    name: string = '';
    nickname: string = '';

    handling: number = 0;
    accel: string = '';
    speed: number = 0;
    rating: number = 0;

    processor: number = 0;
    signal: number = 0;
    system: number = 0;
    firewall: number = 0;

    body: number = 0;
    armor: number = 0;
    pilot: number = 0;
    sensor: number = 0;

    monitor: Damage = { filled: 0, max:0 };

    weapons: Weapon[] = [];
    sensors: Sensor[] = [];
    autosofts: AutoSoft[] = [];
    mods : VehicleMod[] = [];
    items: Gear[] = [];
    ammunitions: Ammunition[] = [];

    maneuver: number = 0;
    mode: VehicleMode = VehicleMode.Auto;      // (Auto /  Remote / VR)

    get initiative(): Initiative | null {
        if (this.mode == VehicleMode.Auto)
        {
            return {
                value: this.pilot + this.processor,
                passes: 3,
            }
        }

        return null;
    }

    get resistance(): VehicleResistance {
        return {
            mundan: this.body + this.armor,
            magic: this.rating,
            elemental: this.armor * 2,
        }
    }

    evade(type: EvadeType, fullDefense: boolean, evadeSkill: Skill, combatSkill: Skill, commandRating: number, responseRating: number) {
        /*
        Verteidigung
            Nahkampf
                Pilot + Abwehr (AUTO)
                Prozessor + Nahkampffertigkeit (VR)
                Befehl + Nahkampffertigkeit (CMD)
            Fernkampf
                Pilot (AUTO)
                Prozessor (VR)
                Befehl (CMD)
            Voll Abwehr
                 + Abwehr  (AUTO)
                 + Ausweichen (VR + CMD)

        */

        
        return {
            name: 'Ausweichen',
            value: 0,
            values: [],
        }
    }

    generateId(): string {
        return this.name + '.' + this.id;
    }

    loadFromData(data: any): Vehicle {
        this.name = data.name || 'Unknown';
        this.nickname = data.vehiclename || '';
        this.handling = toInt(data.handling);
        this.accel = data.accel || '0/0';
        this.speed = toInt(data.speed);
        this.pilot = toInt(data.pilot);
        this.body = toInt(data.body);
        this.armor = toInt(data.armor);
        this.sensor = toInt(data.sensor);
        this.monitor = { filled: toInt(data.physicalcmfilled), max: toInt(data.physicalcm) };
        this.firewall = toInt(data.firewall);
        this.signal = toInt(data.signal);
        this.processor = toInt(data.response);
        this.system = toInt(data.system);
        this.maneuver = toInt(data.maneuver);

        this.mode = VehicleMode.Auto;

        this.weapons = [];
        this.sensors = [];
        this.autosofts = [];
        this.mods = [];
        this.items = [];

        const gears = getGearsFromData(data);

        for (const gear of gears)
        {
            if (gear.category_english == 'Sensors')
            {
                this.sensors.push(...getSensorFunctionsFromSensorData(gear));
            }
            else if (gear.category_english == 'Autosofts')
            {
                this.autosofts.push(getAutoSoftFromAutoSoftData(gear));
            }
            else if (toBool(gear.isammo))
            {
                this.ammunitions.push(getAmmunitionFromGearData(gear))
            }
            else {
                this.items.push(getGearFromGearData(gear));
            }
        }

        const mods = getModsFromData(data);

        for (const mod of mods)
        {
            if (Array.isArray(mod.weapons))
            {
                this.weapons.push(...getWeapons(mod));
            }
            else
            {
                this.mods.push(getVehicleModFromModData(mod));
            }
        }

        return this;
    }

    setNextId(): Vehicle
    {
        this.id = Vehicle.nextId++;
        return this;
    }

    static createFromDataObject(data: any): Vehicle {
        return (new Vehicle()).setNextId().loadFromData(data);
    }

}

function getVehicleModFromModData(data: any): VehicleMod {
    return {
        name: data.name || '',
        rating: toInt(data.rating),
        limit: data.limit || '',
    }
}

function getAutoSoftFromAutoSoftData(data: any): AutoSoft {
    return {
        name : data.name,
        rating: toInt(data.rating),
        skill: autoSoftNameToSkillName(data.name_english),
        sensorBased: data.name_english == 'Clearsight',
    }
}

function getSensorFunctionsFromSensorData(sensor: any): Sensor[] {
    const items = getChildrenFromData(sensor);
    return items
        .filter((item: any) => item.category_english == 'Sensor Functions' )
        .map((item: any) => ({
            name : item.name,
            rating: toInt(item.rating),
            mods: getSensorModsFromSensorFunctionData(item),
        }));
}

function getSensorModsFromSensorFunctionData(data: any): SensorMod[] {
    const items = getChildrenFromData(data ?? {});
    return items
        .map((item: any) => ({
            name : item.name,
            rating: toInt(item.rating),
            category: item.category || '',
        }));
}

function getAmmunitionFromGearData(data: any): Ammunition {
    return {
        name: data.name,
        extra: data.extra,
        count: toInt(data.qty),
        dmg: toInt(data.weaponbonusdamage),
        ap: toInt(data.weaponbonusap),
    }
}

function getModsFromData(data: any): any[] {
    let mods = data?.mods ?? [];
    return Array.isArray(mods) ? mods : [];
}

function getGearsFromData(data: any): any[] {
    let gears = data?.gears ?? [];
    return Array.isArray(gears) ? gears : [];
}

function getChildrenFromData(data: any): any[]  {
    let children = data?.children ?? [];
    return Array.isArray(children) ? children : [];
}

function autoSoftNameToSkillName(name: string): string {
    switch (name) {
        case 'Clearsight':
            return 'Wahrnehmung';
        case 'Maneuver':
            return 'Manövrieren';
        case 'Targeting':
            return 'Angriff';
        case 'Covert Ops':
            return 'Infiltration / Heimlichkeit';
        case 'Defense':
            return 'Verteidigung';
        case 'Electronic Warfare':
            return 'Signale abfangen/stören';
        default:
            return '';
    }
}