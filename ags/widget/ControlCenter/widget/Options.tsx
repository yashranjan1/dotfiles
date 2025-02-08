import { bind, execAsync } from "astal";
import { theme } from "../../../variables/theme-variables";
import { changeTheme } from "../../../helpers/theme";
import Bluetooth from "gi://AstalBluetooth"
import Wifi from "gi://AstalNetwork"
import VirtualCam from "../../../bindings/v4l2loopback";
import { WindowCustomProps } from "../../../types/windowCustomProps";


function ThemeSwitcher() {
    return <centerbox className={"option-container"} css="" hexpand>
        <button
            onClick={() => changeTheme(-1)}
        >
            <icon icon="pan-start-symbolic"/>
        </button>
        <label label={bind(theme)} />
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
        hexpand
        >
            <button 
                className={bind(loopback, "state").as(state => state ? "option-container bg-active" : "option-container")}
                onClick={() => {
                    loopback.toggle_state()
                }}
                hexpand
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

function WifiButton({ menuState, gdkmonitor }: WindowCustomProps) {
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
        <button className={"open-menu-btn"} onClick={() => menuState.set(`control-center-button-${gdkmonitor.get_model()}-wifi`)}>
            <icon icon="pan-end-symbolic" />
        </button>
    </box>
}

function BluetoothButton({ menuState, gdkmonitor }: WindowCustomProps) {
    const bluetooth = Bluetooth.get_default()

    return <box 
        className={bind(bluetooth, "isPowered").as(enabled => enabled ? "option-container bg-active" : "option-container")}
        hexpand
        >
        <button 
            className={bind(bluetooth, "isPowered").as(enabled => enabled ? "option-container bg-active" : "option-container")}
            onClick={() => {
                bluetooth.toggle()
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
        <button 
            className={"open-menu-btn"} 
            onClick={() => {
                menuState.set(`none`)
                execAsync("blueberry")
            }}
            hexpand
        >
            <icon icon="pan-end-symbolic" />
        </button>
    </box>
}

export default function Options({ menuState, gdkmonitor }: WindowCustomProps) {

    return (
        <box vertical spacing={10}>
            <box spacing={10}>
                <ThemeSwitcher />
                <VirtualCamButton />
            </box>
            <box spacing={10}>
                <WifiButton menuState={menuState} gdkmonitor={gdkmonitor}/>
                <BluetoothButton menuState={menuState} gdkmonitor={gdkmonitor} />
            </box>
        </box>
    )
}
