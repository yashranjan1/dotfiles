import { bind } from "astal";
import Wp from "gi://AstalWp";

export default function AppVolSlider({ source }: { source: Wp.Endpoint }) {
    return (
        <box className={"app-vol"}>
            <button onClick={() => source.get_mute() ? source.set_mute(false) : source.set_mute(true)}>
                <icon icon={source.get_icon()} />
            </button>
            <slider
                hexpand
                onDragged={({ value }) => source.volume = value}
                value={bind(source, "volume")}
            />
        </box>
    )
}