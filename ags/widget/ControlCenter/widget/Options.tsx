import { bind } from "astal";
import { theme } from "../../../variables/theme-variables";
import { changeTheme } from "../../../helpers/theme";
import Bluetooth from "gi://AstalBluetooth"
import Wifi from "gi://AstalNetwork"
import VirtualCam from "../../../bindings/v4l2loopback";
import { Gtk } from "astal/gtk3";


function ThemeSwitcher() {
    return <centerbox className={"option-container"} css="">
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
    </centerbox>
}

function VirtualCamButton() {
    const loopback = VirtualCam.get_default()
    return <box 
        className={bind(loopback, "state").as(state => state ? "option-container bg-active" : "option-container")}
        >
            <button 
                className={bind(loopback, "state").as(state => state ? "option-container bg-active" : "option-container")}
                onClick={() => {
                    loopback.toggle_state()
                }}
            >
                <box>
                    <icon icon="video-display-symbolic" className="ml-15px mr-10px" />
                    <label 
                        className={bind(loopback, "state").as(state => state ? "text-active" : "text-normal")}
                        label={bind(loopback, "state").as( state => state ? "On" : "Off")}
                        xalign={0}
                        truncate={true}
                    />
                </box>
            </button>
    </box>
}

function WifiButton() {
    const { wifi } = Wifi.get_default()
    return <box className={bind(wifi, "enabled").as(enabled => enabled ? "option-container bg-active" : "option-container")}>
        <button 
            className={bind(wifi, "enabled").as(enabled => enabled ? "option-container bg-active" : "option-container")}
            onClick={() => {
                wifi.set_enabled(!wifi.get_enabled())
            }}
        >
            <box>
                <icon 
                    icon={bind(wifi, "iconName")} 
                    className="ml-15px mr-10px"
                />
                <label 
                    className={bind(wifi, "enabled").as(enabled => enabled ? "text-active" : "text-normal")}
                    label={bind(wifi, "iconName").as( icon =>{ 
                        if (icon === "network-wireless-disabled-symbolic") return "Off"
                        if (icon.startsWith("network-wireless-signal-")) return wifi.get_ssid()
                        if (icon === "network-wireless-acquiring-symbolic") return "Connecting..."
                        return "Not connected"
                    })}
                    xalign={0}
                    truncate
                />
            </box>
        </button>
    </box>
}

function BluetoothButton() {
    const bluetooth = Bluetooth.get_default()

    return <box 
    className={bind(bluetooth, "isPowered").as(enabled => enabled ? "option-container bg-active" : "option-container")}>
        <button 
            className={bind(bluetooth, "isPowered").as(enabled => enabled ? "option-container bg-active" : "option-container")}
            onClick={() => {
                bluetooth.isPowered = !bluetooth.isPowered
            }}
        >
            <box>
                <icon 
                    icon={bind(bluetooth, "isPowered").as(enabled => enabled ? "bluetooth-active-symbolic" : "bluetooth-disabled-symbolic")} 
                    className="ml-15px mr-10px"
                />
                <label 
                    className={bind(bluetooth, "isPowered").as(enabled => enabled ? "text-active" : "text-normal")}
                    label={bind(bluetooth, "isPowered").as( enabled => {
                        return enabled ? "On" : "Off"
                    })}
                    xalign={0}
                />
            </box>
        </button>
    </box>
}

export default function Options() {  

    return (
        <box vertical spacing={10}>
            <box spacing={10}>
                <ThemeSwitcher />
                <VirtualCamButton />
            </box>
            <box spacing={10}>
                <WifiButton />
                <BluetoothButton />
            </box>
        </box>
    )
}