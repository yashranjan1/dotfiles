import { bind } from "astal"
import Wp from "gi://AstalWp"

export default function AudioSliders() {
    const speaker = Wp.get_default()?.audio.defaultSpeaker!
    const mic = Wp.get_default()?.audio.defaultMicrophone!

    return (
        <box vertical>
            <box className="audio-slider" css="min-width: 140px">
                <button onClick={() => speaker.get_mute() ? speaker.set_mute(false) : speaker.set_mute(true)}>
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
