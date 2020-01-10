import { Device } from "./device";

import { IDeviceInterface } from "../interfaces";

import * as Consts from "../consts";

import { mapSpeed } from "../utils";

export class BasicMotor extends Device {


    constructor (hub: IDeviceInterface, portId: number, modeMap: {[event: string]: number}, type: Consts.DeviceType = Consts.DeviceType.UNKNOWN) {
        super(hub, portId, modeMap, type);
    }


    /**
     * Set the motor power.
     * @method BasicMotor#setPower
     * @param {number} power For forward, a value between 1 - 100 should be set. For reverse, a value between -1 to -100. Stop is 0.
     * @returns {Promise} Resolved upon successful completion of command.
     */
    public setPower (power: number) {
        return new Promise((resolve) => {
            this.writeDirect(0x00, Buffer.from([mapSpeed(power)]));
            return resolve();
        });
    }


    /**
     * Stop the motor.
     * @method BasicMotor#stop
     * @returns {Promise} Resolved upon successful completion of command.
     */
    public stop () {
        return this.setPower(0);
    }


    /**
     * Brake the motor.
     * @method BasicMotor#brake
     * @returns {Promise} Resolved upon successful completion of command.
     */
    public brake () {
        return this.setPower(127);
    }


}
