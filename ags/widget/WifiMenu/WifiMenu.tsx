import { bind, Variable } from "astal";
import { WindowCustomProps } from "../../types/windowCustomProps";
import { Astal } from "astal/gtk3";
import Network from "gi://AstalNetwork"
import WifiOption from "./widget/WifiOption";

export default function WifiMenu({ gdkmonitor, menuState }: WindowCustomProps) {

    const { wifi } = Network.get_default()

    const spin = Variable<boolean>(false)

    return(
        <window
            className="wifi-menu"
            name={`wifi-menu-${gdkmonitor.get_model()}`}
            gdkmonitor={gdkmonitor}
            exclusivity={Astal.Exclusivity.NORMAL}
            anchor={Astal.WindowAnchor.TOP |
                Astal.WindowAnchor.RIGHT}
            visible={bind(menuState).as(s => s === `control-center-button-${gdkmonitor.get_model()}-wifi` ? true : false)}
        >
            <box className="wifi-menu-box shadow" vexpand>
                <box vertical spacing={10}>
                    <box className={"wifi-menu-header"} spacing={10}>
                        <button
                            onClick={() => {
                                menuState.set(`control-center-button-${gdkmonitor.get_model()}`)
                            }}
                        >
                            <icon icon="go-previous-symbolic" />
                        </button>
                        <label label={"Wifi Menu"} xalign={0} hexpand/>
                        <button
                            onClick={async() => {
                                await wifi.scan()
                                spin.set(true)
                                setTimeout(() => {
                                    spin.set(false)
                                }, 5000)
                            }}
                            
                        >
                            <icon icon="rotation-allowed-symbolic" className={bind(spin).as(s => s ? "spinner" : "")} />
                        </button>
                        <button
                            onClick={() => {
                                menuState.set("none")
                            }}
                        >
                            <icon icon="close-symbolic" />
                        </button>
                    </box>
                    <scrollable heightRequest={450} minContentWidth={300}>
                        <box vertical spacing={10} >
                        {
                            bind(wifi, "accessPoints").as(aps => aps.sort((a,b) => b.strength - a.strength).map(ap => {
                                if (ap.get_ssid() !== null) {
                                    return <WifiOption ap={ap} menuState={menuState} gdkmonitor={gdkmonitor} />
                                }
                                return <label visible={false} />
                            }))
                        }
                        </box>
                    </scrollable>
                </box>
            </box>
        </window>
    )
}