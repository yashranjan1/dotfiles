import { bind, execAsync, Variable } from "astal";
import { WindowCustomProps } from "../../types/windowCustomProps";
import { network } from "../../variables/network";
import { Astal } from "astal/gtk3";

export default function NewNetwork({ gdkmonitor, menuState }: WindowCustomProps) {

    const text = Variable("")

    const error = Variable("")

    return (
        <window
            className="new-network"
            name={`new-network-${gdkmonitor.get_model()}`}
            gdkmonitor={gdkmonitor}
            exclusivity={Astal.Exclusivity.NORMAL}
            anchor={Astal.WindowAnchor.TOP |
                Astal.WindowAnchor.RIGHT}
            visible={bind(menuState).as(s => s === `control-center-button-${gdkmonitor.get_model()}-wifi-pw` ? true : false)}
            keymode={Astal.Keymode.ON_DEMAND}
        >
            <box className="new-network-box shadow" vexpand vertical>
                <box>
                    <box className={"new-network-header"} spacing={10}>
                        <button onClick={() => {
                            error.set("")
                            text.set("")
                            menuState.set(`control-center-button-${gdkmonitor.get_model()}-wifi`)
                        }}>
                            <icon icon="go-previous-symbolic" />
                        </button>
                        <label label={"New Network"} xalign={0} hexpand/>
                        <button onClick={() => {
                            menuState.set("none")
                        }}>
                            <icon icon="close-symbolic" />
                        </button>
                    </box>
                </box>
                <box vertical className={"new-network-form"} spacing={10}>
                    <label 
                        label={bind(network).as(s => `Network: ${s}`)} 
                        xalign={0} 
                        truncate
                    />
                    <box>
                        <label label={"Password:"} xalign={0} hexpand/>
                        <entry 
                            visibility={false} 
                            placeholderText={"Password"} 
                            hexpand
                            onChanged={self => text.set(self.text)}
                            onActivate={self =>{ 
                                self.text = ""
                            }}
                        />
                    </box>
                </box>
                <label label={bind(error)} hexpand/>
                <box vertical spacing={10}>
                    <button onClick={async () => {
                        try {
                            await execAsync(`nmcli device wifi connect ${network.get()} password ${text.get()}`)
                            menuState.set("none")
                            text.set("")
                            error.set("")
                        }
                        catch (e) {
                            error.set("Failed! Reset and try again")
                        }
                    }}>
                        <label label={"Connect"} />
                    </button>
                    <button onClick={async () => {
                        try {
                            await execAsync(`nmcli c delete ${network.get()}`)
                            error.set("")
                            text.set("")
                        }
                        catch (e) {

                        }
                    }}>
                        <label label={"Reset"} />
                    </button>
                </box> 
            </box>
        </window>
    )
}   