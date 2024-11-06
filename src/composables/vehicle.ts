import {toInt} from "@/composables/utils";
import {
    type Damage, type Gear,
    type InitiativeValues,
    type Resistance, type Skill, type VehicleMod,
    VehicleMode,
    type VehicleResistance, type VehicleSkill, type Weapon
} from "@/composables/types";

export class Vehicle  {
    name: string;
    nickname: string;

    handling: string;
    accel: string;
    speed: string;
    rating: number;

    processor: number;
    signal: number;
    system: number;
    firewall: number;

    body: string;
    armor: string;
    pilot: string;
    sensor: string;

    monitor: Damage;

    weapons: Weapon[];
    skills: VehicleSkill[];
    mods : VehicleMod[];
    items: Gear[];

    maneuver: number;
    mode: VehicleMode;      // (Auto /  Remote / VR)

    get initiative(): InitiativeValues | null {
        if (this.mode == VehicleMode.Auto)
        {
            return {
                base: this.pilot + this.processor,
                base: this.pilot + this.processor,
                passes: 3,
            };
        }

        return null; //Rigger Initiative
    }

    get resistance(): VehicleResistance {
        return {
            mundan: this.body + this.armor,
            magic: this.rating,
            elemental: this.armor * 2,
        }
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

        const mods = data.mods;



        return this;
    }

    static createFromDataObject(data: Vehicle): Vehicle {
        return (new Vehicle()).loadFromData(data);
    }

}