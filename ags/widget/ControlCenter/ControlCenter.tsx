import { App, Astal, Gtk } from "astal/gtk3";
import { WindowCustomProps } from "../../types/windowCustomProps";
import { bind } from "astal";
import ProfileCard from "./widget/ProfileCard";
import QuickMenu from "./widget/QuickMenu";
import AudioSliders from "./widget/AudioSliders";
import Options from "./widget/Options";
import MprisPlayers from "./widget/MprisPlayers";

export default function ControlCenter({ gdkmonitor, menuState }: WindowCustomProps) {
    return (
        <window className="ControlCenter"
            name={`control-center-${gdkmonitor.get_model()}`}
            gdkmonitor={gdkmonitor}
            exclusivity={Astal.Exclusivity.NORMAL}
            anchor={Astal.WindowAnchor.TOP |
                Astal.WindowAnchor.RIGHT}
            visible={bind(menuState).as(s => s === `control-center-button-${gdkmonitor.get_model()}` ? true : false)}
            application={App}
        >

            <box 
                className={"control-center-box shadow"} 
                vertical
                spacing={10}
                vexpand={true}
            >
                <box>
                    <ProfileCard />
                    <QuickMenu />
                </box>
                <box className="audio-slider-container">
                    <AudioSliders menuState={menuState} gdkmonitor={gdkmonitor} />
                </box>
                <box>
                    <Options menuState={menuState} gdkmonitor={gdkmonitor} />
                </box>
                <box vexpand={true}>
                    <MprisPlayers />
                </box>
            </box>
        </window>
    )
}