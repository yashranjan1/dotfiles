import { App, Astal, Gtk } from "astal/gtk3"
import { bind } from "astal"
import { WindowCustomProps } from "../../types/windowCustomProps"
import Shutdown from "./widget/Shutdown"
import Restart from "./widget/Restart"
import Sleep from "./widget/Sleep"
import LogOut from "./widget/LogOut"

export default function PowerMenu({ gdkmonitor, menuState }: WindowCustomProps) {
    return <window
        className="PowerMenu"
        name={`power-menu-${gdkmonitor.get_model()}`}
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.NORMAL}
        anchor={Astal.WindowAnchor.TOP |
            Astal.WindowAnchor.RIGHT}
        visible={bind(menuState).as(s => s === `power-menu-button-${gdkmonitor.get_model()}` ? true : false)}
        application={App}>
            <box className={"power-menu-box shadow"} vertical>
                <Shutdown />
                <Restart />
                <Sleep />
                <LogOut />
            </box>
    </window>
}