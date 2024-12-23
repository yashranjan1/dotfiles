import { execAsync } from "astal"

export default function Shutdown() {
    return (
        <button onClick={() => execAsync("shutdown")} className="shutdown">
            <box>
                <icon icon="system-shutdown-symbolic" />
                <label label="Shutdown" />
            </box>
        </button>
    )
}