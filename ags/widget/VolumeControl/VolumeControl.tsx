import { Astal } from "astal/gtk3";
import { WindowCustomProps } from "../../types/windowCustomProps";
import Wp from "gi://AstalWp";
import { bind } from "astal";
import AppVolSlider from "./widget/AppVolSlider";

export default function VolumeControl({ gdkmonitor, menuState }: WindowCustomProps) {

    const audio = Wp.get_default()?.audio!;
    const speaker = audio.defaultSpeaker!;


    return (
        <window
            className="VolumeControl"
            name={`volume-control-${gdkmonitor.get_model()}`}
            gdkmonitor={gdkmonitor}
            exclusivity={Astal.Exclusivity.NORMAL}
            anchor={Astal.WindowAnchor.TOP |
                Astal.WindowAnchor.RIGHT}
            visible={bind(menuState).as(s => s === `volume-control-${gdkmonitor.get_model()}` ? true : false)}
        >
            
            <box className={"volume-control-window shadow"}
                vexpand
                vertical
                spacing={20}
            >
                <box className={"volume-control-header"} spacing={10}>
                    <button onClick={() => menuState.set(`control-center-button-${gdkmonitor.get_model()}`)}>
                        <icon icon={"go-previous-symbolic"} />
                    </button>
                    <label label={"Volume Control"} hexpand xalign={0}/>
                </box>
                <box className={"volume-control-box"} 
                    vertical 
                    vexpand
                    spacing={10}
                >
                    <box className="app-vol" css="min-width: 140px">
                        <button onClick={() => menuState.set(`volume-control-${gdkmonitor.get_model()}`)}>
                            <icon icon={bind(speaker, "volumeIcon")} />
                        </button>
                        <slider
                            hexpand
                            onDragged={({ value }) => speaker.volume = value}
                            value={bind(speaker, "volume")}
                        />
                    </box>
                    {
                        bind(audio, "streams").as(streams => streams.map(stream => (
                            <AppVolSlider source={stream} />
                        )))
                    }
                </box>
            </box>

        </window>
    )
}
