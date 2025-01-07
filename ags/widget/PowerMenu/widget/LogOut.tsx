import { execAsync } from "astal";

export default function LogOut() {
    return (
        <button onClick={() => execAsync("hyprctl dispatch exit")} className="logout">
            <box>
                <icon icon="system-log-out-symbolic" />
                <label label="Log Out" />
            </box>
        </button>
    )
}