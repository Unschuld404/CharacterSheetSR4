import {autosoftEquals, toBool, toInt} from "@/composables/utils";
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

import {type Weapon, WeaponSetting} from "@/composables/weapons";
import {getAmmunitionFromData, getAutosoftFromData, getGearFromGearData, getWeapons} from "@/composables/data";
import {char} from "@/composables/char";

export class VehicleSetting  {
    vehicleId: string = '?';
    selectedVehicleMode: VehicleMode = VehicleMode.Auto;
    ammunitions: Ammunition[] = [];
    autosofts: AutoSoft[] = [];
    weaponSettings : WeaponSetting[] = [];
    maneuverSkill: string = '';
}

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


    autosofts: AutoSoft[] = [];
    weapons: Weapon[] = [];
    sensors: Sensor[] = [];
    mods : VehicleMod[] = [];
    items: Gear[] = [];

    maneuver: number = 0;

    settings: VehicleSetting = new VehicleSetting();

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

    get mode(): VehicleMode { return this.settings.selectedVehicleMode }
    set mode(mode: VehicleMode) { this.settings.selectedVehicleMode = mode }
    getAmmunitions(): Ammunition[] { return this.settings.ammunitions }
    getAutosofts(): AutoSoft[] { return this.settings.autosofts }
    getAutosoftsFromStorage(): AutoSoft[] { return this.autosofts }

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

    generateId(): string { return this.name + '.' + this.id }

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

        this.weapons = [];
        this.sensors = [];
        this.mods = [];
        this.items = [];

        const ammunitions : Ammunition[] = [];

        const settings = findVehicleSettingsForVehicle(this);
        const newSettings = settings === null;
        this.settings = settings ?? createVehicleSettings(this);

        const gears = getGearsFromData(data);

        for (const gear of gears)
        {
            if (gear.category_english == 'Sensors')
            {
                this.sensors.push(...getSensorFunctionsFromSensorData(gear));
            }
            else if (gear.category_english == 'Autosofts' || gear.category_english == 'Autosofts, Drone')
            {
                this.autosofts.push(getAutosoftFromData(gear));
            }
            else if (toBool(gear.isammo))
            {
                ammunitions.push(getAmmunitionFromData(gear))
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

        if (newSettings) {
            this.settings.autosofts = this.autosofts;
            this.settings.ammunitions = ammunitions;
            if (this.mods.find((mod) =>  mod.name.includes('Start-/Landeprofil') || mod.limit.includes('Aircraft')))
            {
                this.settings.maneuverSkill = 'Flugzeuge';
            }
            else if (this.mods.find((mod) =>  mod.name.includes('Geckofüße')))
            {
                this.settings.maneuverSkill = 'Läufer';
            }
            else
            {
                this.settings.maneuverSkill = 'Bodenfahrzeuge';
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

    addWeapon(weapon: Weapon): Container {
        this.weapons.push(weapon);
        return this;
    }

    getWeaponPoolValues(weapon: Weapon): PoolValue[] | null
    {
        return null;
    }

    getWeaponSettings(): WeaponSetting[] {
        return this.settings.weaponSettings;
    }

    loadAutosoft(value: AutoSoft): void  {
        const index = this.settings.autosofts.findIndex((item: AutoSoft) => autosoftEquals(item, value));
        if (index == -1) {
            this.settings.autosofts.push(value);
        }
    }

    unloadAutosoft(value: AutoSoft): void  {
        const index = this.settings.autosofts.findIndex((item: AutoSoft) => autosoftEquals(item, value));
        if (index >= 0)
        {
            this.settings.autosofts.splice(index, 1);
        }
    }

    autoSoftValue(name: string): PoolValue {
        const value = this.getAutosofts().find((item: any) => item.name === name)?.rating ?? 0;
        return {name: name, value: value};
    }

    getSensorPoolValue(): PoolValue {
        const cam = this.sensors.find((item) => item.name == 'Kamera') ?? null;
        if (cam !== null)
        {
            return {
                name: cam.name,
                value: cam.rating,
            }
        }
        return {
            name: 'Sensor',
            value: this.sensor,
        }
    }

    getAutosoftPoolValueFor(skill: string): PoolValue {
        const autosoft = this.getAutosofts().find((item) => item.skill == skill) ?? null;
        if (autosoft == null)
        {
            return {name: 'Autosoft', value: 0};
        }
        return {name: autosoft.name, value: autosoft.rating};
    }

    getRiggerSkillPoolValueFor(skill: string): PoolValue {
        return this.rigger.getSkill(skill);
    }

    getPilotPoolValue(): PoolValue {
        return {name: 'Pilot', value: this.pilot};
    }

    getProzessorPoolValue(): PoolValue {
        return {name: 'Prozessor', value: this.processor};
    }

    getRiggerCommandPoolValue(): PoolValue {
        return this.rigger.getCommandValue();
    }

    getActions(): Pool[]
    {
        switch (this.mode) {
            case VehicleMode.Auto: return [
                new Pool('Wahrnehmung').addPoolValue(this.getSensorPoolValue()).addPoolValue(this.getAutosoftPoolValueFor('Wahrnehmung')),
                new Pool('Manövrieren').addPoolValue(this.getPilotPoolValue()).addPoolValue(this.getAutosoftPoolValueFor('Manövrieren')),
                new Pool('Heimlichkeit').addPoolValue(this.getPilotPoolValue()).addPoolValue(this.getAutosoftPoolValueFor('Infiltration / Heimlichkeit')),
                new Pool('Elektronische Kriegsführung').addPoolValue(this.getPilotPoolValue()).addPoolValue(this.getAutosoftPoolValueFor('Signale abfangen/stören')),
            ]
            case VehicleMode.VR: return [
                new Pool('Wahrnehmung').addPoolValue(this.getSensorPoolValue()).addPoolValue(this.getRiggerSkillPoolValueFor('Wahrnehmung')),
                new Pool('Manövrieren').addPoolValue(this.getProzessorPoolValue()).addPoolValue(this.getRiggerSkillPoolValueFor(this.settings.maneuverSkill)),
                new Pool('Heimlichkeit').addPoolValue(this.getProzessorPoolValue()).addPoolValue(this.getRiggerSkillPoolValueFor('Infiltration')),
                new Pool('Elektronische Kriegsführung').addPoolValue(this.getProzessorPoolValue()).addPoolValue(this.getRiggerSkillPoolValueFor('Elektronische Kriegsführung')),
            ]
            case VehicleMode.Remote: return [
                new Pool('Wahrnehmung').addPoolValue(this.getSensorPoolValue()).addPoolValue(this.getRiggerSkillPoolValueFor('Wahrnehmung')),
                new Pool('Manövrieren').addPoolValue(this.getRiggerCommandPoolValue()).addPoolValue(this.getRiggerSkillPoolValueFor(this.settings.maneuverSkill)),
                new Pool('Heimlichkeit').addPoolValue(this.getRiggerCommandPoolValue()).addPoolValue(this.getRiggerSkillPoolValueFor('Infiltration')),
                new Pool('Elektronische Kriegsführung').addPoolValue(this.getRiggerCommandPoolValue()).addPoolValue(this.getRiggerSkillPoolValueFor('Elektronische Kriegsführung')),
            ]
            default: return [];
        }
    }

}

function findVehicleSettingsForVehicle(vehicle: Vehicle): VehicleSetting | null {
    return char.sheet.vehicleSettings.find((item: VehicleSetting) => {
        return item.vehicleId == vehicle.generateId();
    }) ?? null;
}

function createVehicleSettings(vehicle: Vehicle): VehicleSetting {
    const settings = new VehicleSetting();
    settings.vehicleId = vehicle.generateId();
    char.sheet.vehicleSettings.push(settings);

    return settings;
}

function getVehicleModFromModData(data: any): VehicleMod {
    return {
        name: data.name || '',
        rating: toInt(data.rating),
        limit: data.limit || '',
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
