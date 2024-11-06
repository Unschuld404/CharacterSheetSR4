import {toInt} from "@/composables/utils";

export class Vehicle  {
    name: string;
    nickname: string;
    handling: string;
    accel: string;
    speed: string;
    pilot: string;
    body: string;
    armor: string;
    sensor: string;

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
        return this;
    }

    static createFromDataObject(data: Vehicle): Vehicle {
        return (new Vehicle()).loadFromData(data);
    }

}