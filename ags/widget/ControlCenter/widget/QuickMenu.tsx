import { exec } from "astal";

export default function QuickMenu() {
    return (
        <box spacing={7}>
            <button className="control-center-menu-btn" onClick={() => exec("hyprlock")}>
                <icon icon="network-wireless-encrypted-symbolic" />
            </button>
            <button className="control-center-menu-btn" onClick={() => exec("hyprctl dispatch exit")}>
                <icon icon="system-log-out-symbolic" />
            </button>
            <button className="control-center-menu-btn" onClick={() => exec("shutdown now")}>
                <icon icon="system-shutdown-symbolic" />
            </button>
        </box>
    )
}
