import { bind } from "astal"
import Network from "gi://AstalNetwork"
import Wp from "gi://AstalWp"
import { MenuInput } from "../../../types/menuInput"

function AudioSlider() {
    const speaker = Wp.get_default()?.audio.defaultSpeaker!

    return <icon 
        className="mr-8px"
        icon={bind(speaker, "volumeIcon")} 
    />
}

function Wifi() {
    const { wifi } = Network.get_default()

    return <icon
        className="mr-8px"
        icon={bind(wifi, "iconName")}
    />
}

function Wired() {
    const { wired } = Network.get_default()

    return <icon
        icon={bind(wired, "iconName")}
    />
}


export default function ControlCenter({ monitor, state }: MenuInput) {

    return (
        <button 
            className={bind(state).as(s => s.startsWith(`control-center-button-${monitor}`) ? "bg-active control-center-btn" : "control-center-btn")}
            onClick={() => {
                if (state.get() === `control-center-button-${monitor}`) {
                    state.set("none")
                }
                else {
                    state.set(`control-center-button-${monitor}`)
                }
            }}
        >
            <box>
                <Wifi />
                <AudioSlider />
                <Wired />
            </box>
        </button>
    )
}