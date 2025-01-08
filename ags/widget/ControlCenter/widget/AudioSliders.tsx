import { bind, Variable } from "astal"
import Wp from "gi://AstalWp"
import { WindowCustomProps } from "../../../types/windowCustomProps"

export default function AudioSliders({ gdkmonitor, menuState }: WindowCustomProps) {
    const speaker = Wp.get_default()?.audio.defaultSpeaker!
    const mic = Wp.get_default()?.audio.defaultMicrophone!

    return (
        <box vertical>
            <box className="audio-slider" css="min-width: 140px">
                <button onClick={() => menuState.set(`volume-control-${gdkmonitor.get_model()}`)}>
                    <icon icon={bind(speaker, "volumeIcon")} />
                </button>
                <slider
                    hexpand
                    onDragged={({ value }) => speaker.volume = value}
                    value={bind(speaker, "volume")}
                />
            </box>
            <box className="audio-slider" css="min-width: 140px; margin-top: 20px">
                <button onClick={() => mic.get_mute() ? mic.set_mute(false) : mic.set_mute(true)}>
                    <icon icon={bind(mic, "volumeIcon")} />
                </button>
                <slider
                    hexpand
                    onDragged={({ value }) => mic.volume = value}
                    value={bind(mic, "volume")}
                />
            </box>
        </box>
    )
}
