import { execAsync } from "astal";

export default function Restart() {
    return (
        <button onClick={() => execAsync("reboot")} className="restart">
            <box>
                <icon icon="system-reboot-symbolic" />
                <label label="Restart" />
            </box>
        </button>
    )
}