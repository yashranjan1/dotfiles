import { App, Astal, Gtk } from "astal/gtk3";
import Arch from "@Bar/Logo";
import Workspaces from "@Bar/Workspaces";
import Date from "@Bar/Date";
import ControlCenter from "@Bar/ControlCenter";
import PowerMenu from "@Bar/PowerMenu";
import { WindowCustomProps } from "../../types/windowCustomProps";
import Notifications from "./widget/Notifications";
import HyprPicker from "./widget/HyprPicker";
import KeyBoardLayout from "./widget/Keyboard";

export default function Bar({ gdkmonitor, menuState }: WindowCustomProps) {
    return (
        <window
            className="Bar"
            name={`Bar-${gdkmonitor.get_model()}`}
            gdkmonitor={gdkmonitor}
            exclusivity={Astal.Exclusivity.EXCLUSIVE}
            anchor={
                Astal.WindowAnchor.TOP |
                Astal.WindowAnchor.LEFT |
                Astal.WindowAnchor.RIGHT
            }
            application={App}
        >
            <centerbox className={""}>
                <box spacing={10}>
                    <box className={"bar-item"}>
                        <Arch />
                    </box>
                    <box className={"bar-item"}>
                        <Workspaces />
                    </box>
                </box>
                <box>
                    <Date monitor={`${gdkmonitor.get_model()}`} state={menuState} />
                </box>
                <box hexpand halign={Gtk.Align.END}>
                    <KeyBoardLayout />
                    <HyprPicker />
                    <Notifications
                        monitor={`${gdkmonitor.get_model()}`}
                        state={menuState}
                    />
                    <ControlCenter
                        monitor={`${gdkmonitor.get_model()}`}
                        state={menuState}
                    />
                    <PowerMenu monitor={`${gdkmonitor.get_model()}`} state={menuState} />
                </box>
            </centerbox>
        </window>
    );
}
