import { App, Astal } from "astal/gtk3";
import { WindowCustomProps } from "../../types/windowCustomProps";
import { bind } from "astal";
import ProfileCard from "./widget/ProfileCard";
import QuickMenu from "./widget/QuickMenu";

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

            <box className={"control-center-box"} vertical>
                <box>
                    <ProfileCard />
                    <QuickMenu />
                </box>
            </box>
        </window>
    )
}