import { App, Astal, Gdk, Gtk } from "astal/gtk3"
import Arch from "@Bar/Logo"
import Workspaces from "@Bar/Workspaces"
import Date from "@Bar/Date"
import ControlCenter from "@Bar/ControlCenter"
import PowerMenu from "@Bar/PowerMenu"
import { BarProps } from "../../types/barProps"
import WallpaperCenter from "@Bar/WallpaperCenter"


export default function Bar({ gdkmonitor, menuState }: BarProps) {


    return <window
        className="Bar"
        name={`Bar-${gdkmonitor.get_model()}`}
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={Astal.WindowAnchor.TOP
            | Astal.WindowAnchor.LEFT
            | Astal.WindowAnchor.RIGHT}
        application={App}>
        <centerbox>
            <box>
                <Arch />
                <Workspaces />
            </box>
            <box>
                <Date monitor={`${gdkmonitor.get_model()}`} state={menuState}/>
            </box>
            <box hexpand halign={Gtk.Align.END} >
                <WallpaperCenter monitor={`${gdkmonitor.get_model()}`} state={menuState}/>
                <ControlCenter monitor={`${gdkmonitor.get_model()}`} state={menuState}/>
                <PowerMenu monitor={`${gdkmonitor.get_model()}`} state={menuState}/>
            </box>
        </centerbox>
    </window>
}
