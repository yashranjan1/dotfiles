import { execAsync, Variable } from "astal";
import { Gdk } from "astal/gtk3";
import AstalNetwork from "gi://AstalNetwork";
import { network } from "../../../variables/network";

export default function WifiOption({ ap, menuState, gdkmonitor }: { ap: AstalNetwork.AccessPoint, menuState: Variable<string>, gdkmonitor: Gdk.Monitor }) {


    return (

        <box className={"wifi-label"} spacing={20}>
            <box hexpand>
                <icon icon={ap.icon_name} />
                <label label={ap.ssid} xalign={0} truncate/>
            </box>

            <button
                onClick={async () => {
                    try {
                        await execAsync(`nmcli device wifi connect ${ap.ssid}`)
                        menuState.set("none")
                    }
                    catch (e) {
                        network.set(ap.ssid)
                        menuState.set(`control-center-button-${gdkmonitor.get_model()}-wifi-pw`)   
                    }
                }}
            >
                <label label={"Connect"} xalign={0} />
            </button>
        </box>
    )
}