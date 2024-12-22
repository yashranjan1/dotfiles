import { App, Astal, Gdk } from "astal/gtk3"
import { Workspaces, FocusedClient } from "./widget/Workspaces"
import Arch from "./widget/Logo"

export default function Bar(gdkmonitor: Gdk.Monitor) {
    return <window
        className="Bar"
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
                <FocusedClient />
            </box>
            <box />
            <box />
        </centerbox>
    </window>
}
