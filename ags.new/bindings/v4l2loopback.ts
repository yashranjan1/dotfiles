import GObject, { register, property } from "astal/gobject"
import { Gio } from "astal/file"
import { monitorFile } from "astal/file"
import { exec } from "astal";
import run_loopback from "../helpers/loopback";

@register({ GTypeName: "VirtualCam" })
export default class VirtualCam extends GObject.Object {
    static instance: VirtualCam
    static get_default() {
        if (!this.instance)
            this.instance = new VirtualCam()

        return this.instance
    }

    #state = this.checkForLoopbackDevice()

    @property(String)
    get state() { return this.#state }

    set state(state) {
        if (state) {
            this.#state = state
            this.notify("state")
        } else {
            this.#state = state
            this.notify("state")
        }
        return
    }

    toggle_state() {
        run_loopback(!this.state)
    }

    checkForLoopbackDevice(): boolean {
        let output: string;
        try {
            output = exec("v4l2-ctl --list-devices");
        } catch (error) {
            return false; 
        }
        if (!output || output.trim().length === 0) {
            return false;
        }
        const loopbackDeviceFound = /\/dev\/video\d+/g.test(output);
    
        return loopbackDeviceFound;
    }

    constructor() {
        super()

        const statePath = "/dev/v4l2loopback"

        monitorFile(statePath, (file, event) => {
            if (event === Gio.FileMonitorEvent.CHANGES_DONE_HINT) {
                this.#state = true
                this.notify("state")
            } else if (event === Gio.FileMonitorEvent.DELETED) {
                this.#state = false
                this.notify("state")
            }
        })

    }
}