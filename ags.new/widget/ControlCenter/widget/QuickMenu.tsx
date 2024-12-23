import { exec } from "astal";

export default function QuickMenu() {
    return (
        <box className="">
            <button className="control-center-menu-btn mr-7px" onClick={() => exec("hyprlock")}>
                <icon icon="network-wireless-encrypted-symbolic" />
            </button>
            <button className="control-center-menu-btn mr-7px" onClick={() => exec("hyprctl dispatch exit")}>
                <icon icon="system-log-out-symbolic" />
            </button>
            <button className="control-center-menu-btn" onClick={() => exec("shutdown")}>
                <icon icon="system-shutdown-symbolic" />
            </button>
        </box>
    )
}