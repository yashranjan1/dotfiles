import { App, Astal, Gdk } from "astal/gtk3"
import Arch from "./widget/Logo"
import Workspaces from "./widget/Workspaces"
import Date from "./widget/Date"

export default function Bar(gdkmonitor: Gdk.Monitor) {
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
                <Date displayName={gdkmonitor.get_model() as string} />
            </box>
            <box />
        </centerbox>
    </window>
}
