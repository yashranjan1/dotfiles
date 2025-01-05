import { bind } from "astal";
import { theme } from "../../../variables/theme-variables";
import { changeTheme } from "../../../helpers/theme";

import Wifi from "gi://AstalNetwork"
import { Gtk } from "astal/gtk3";

const ThemeSwitcher = ( ) => {
    return <box className={"option-container mr-10px"}>
        <button
            onClick={() => changeTheme(-1)}
        >
            <icon icon="pan-start-symbolic"/>
        </button>
        <label label={bind(theme)}/>
        <button
            onClick={() => changeTheme(1)}
        >
            <icon icon="pan-end-symbolic"/>
        </button>
    </box>
}


const WifiButton = () => {
    const { wifi } = Wifi.get_default()

    return <button 
        className={bind(wifi, "enabled").as(enabled => enabled ? "option-container bg-active" : "option-container")}
        onClick={() => {
            wifi.set_enabled(!wifi.get_enabled())
        }}
    >
        <box>
            <icon icon={bind(wifi, "iconName")} />
            <label 
                className={bind(wifi, "enabled").as(enabled => enabled ? "text-active ml-15px" : "text-normal ml-15px")}
                label={bind(wifi, "iconName").as( icon =>{ 
                    if (icon === "network-wireless-disabled-symbolic") return "Off"
                    if (icon.startsWith("network-wireless-signal-")) return wifi.get_ssid()
                    if (icon === "network-wireless-acquiring-symbolic") return "Connecting..."
                    return "Not connected"
                })}
                xalign={0}
                truncate={true}
            />
        </box>
    </button>
}


export default function Options() {  

    return (
        <box vertical>
            <box>
                <ThemeSwitcher />
                <WifiButton />
            </box>
            <box>
            </box>
        </box>
    )
}