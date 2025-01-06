import { execAsync } from "astal";

export default function Sleep() {
    return (
        <button onClick={() => execAsync("systemctl suspend")} className="sleep">
            <box>
                <icon icon="weather-clear-night-symbolic" />
                <label label="Sleep" />
            </box>
        </button>
    )
}