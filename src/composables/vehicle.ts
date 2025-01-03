import {toBool, toInt} from "@/composables/utils";
import {
    type Ammunition,
    type AutoSoft,
    type Container,
    type Damage,
    EvadeType,
    type Gear,
    type IdObject,
    Pool,
    type PoolValue,
    type Rigger,
    type Sensor,
    type SensorMod,
    type VehicleInitiative,
    type VehicleMod,
    VehicleMode,
    type VehicleResistance,
} from "@/composables/types";

import {type Weapon} from "@/composables/weapons";
import {getGearFromGearData, getWeapons} from "@/composables/data";

export class Vehicle implements IdObject,Container  {
    static nextId: number = 0;
    id: number = 0;
    rigger!: Rigger;

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



    get initiative(): VehicleInitiative {
        switch (this.mode) {
            case VehicleMode.Auto: return {
                pool: new Pool('Initiative Autopilot')
                    .add('Pilot', this.pilot)
                    .add('Prozessor', this.processor),
                passes: 3,
            }
            case VehicleMode.VR: return {
                pool: new Pool('Initiative VR')
                    .add('Matrix-Initiative des Riggers', this.rigger.getInitiativeVR().value),
                passes: this.rigger.getInitiativeVR().passes,
            }
            default: return {
                pool: new Pool('Initiative Remote')
                    .add('Initiative des Riggers', this.rigger.getInitiativeRemote().value),
                passes: this.rigger.getInitiativeRemote().passes,
            }
        }
    }

    get resistance(): VehicleResistance {
        return {
            physical: new Pool('Normaler Widerstand')
                .add('Rumpf', this.body)
                .add('Panzerung', this.armor),
            elemental: new Pool('Elementarwiderstand')
                .add('Rumpf', this.body)
                .add('Panzerung x 2', this.armor * 2),
        }
    }

    evade(type: EvadeType, fullDefense: boolean, mode: VehicleMode): Pool {

        const melee = this.rigger.getDefenseMeleeSkill();
        const evade = this.rigger.getEvadeSkill();
        const befehl = this.rigger.getCommandValue();
        const pilot = {name: 'Pilot', value: this.pilot};
        const abwehr = this.autoSoftValue('Abwehr');
        const prozessor = {name: 'Prozessor', value: this.processor};

        /*
        Verteidigung
            Nahkampf
                Pilot + Abwehr (AUTO)
                Prozessor + Nahkampf-Fertigkeit (VR)
                Befehl + Nahkampf-Fertigkeit (CMD)
            Fernkampf
                Pilot (AUTO)
                Prozessor (VR)
                Befehl (CMD)
            volle Abwehr
                 + Abwehr (AUTO)
                 + Ausweichen (VR + CMD)
        */

        const pool = new Pool('Ausweichen');

        if (type == EvadeType.Melee)
        {
            switch (mode) {
                case VehicleMode.Auto: pool.addPoolValue(pilot).addPoolValue(abwehr);
                break;
                case VehicleMode.VR: pool.addPoolValue(prozessor).addPoolValue(melee);
                break;
                case VehicleMode.Remote: pool.addPoolValue(befehl).addPoolValue(melee);
            }
        }
        else if (type == EvadeType.Ranged)
        {
            switch (mode) {
                case VehicleMode.Auto: pool.addPoolValue(pilot);
                break;
                case VehicleMode.VR: pool.addPoolValue(prozessor);
                break;
                case VehicleMode.Remote: pool.addPoolValue(befehl);
                break;
            }
        }

        if (fullDefense) {
            pool.name = 'Volle Abwehr';
            if (mode == VehicleMode.Auto)
            {
                pool.addPoolValue(abwehr);
            }
            else
            {
                pool.addPoolValue(evade);
            }
        }

        return pool;
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
        this.rating = toInt(data.devicerating);

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
            else if (gear.category_english == 'Autosofts' || gear.category_english == 'Autosofts, Drone')
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
                this.weapons.push(...getWeapons(mod, this));
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

    setRigger(rigger: Rigger): Vehicle
    {
        this.rigger  = rigger;
        return this;
    }

    static createFromDataObject(data: any, rigger: Rigger): Vehicle {
        return (new Vehicle()).setNextId().setRigger(rigger).loadFromData(data);
    }

    getName(): string {
        return this.name;
    }

    autoSoftValue(name: string): PoolValue {
        const value = this.autosofts.find((item: any) => item.name === name)?.rating ?? 0;
        return {name: name, value: value};
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