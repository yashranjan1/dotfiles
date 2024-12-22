import { App, Astal, Gdk } from "astal/gtk3"
import Calendar from "@Notif/Calendar"

export default function NotificationCenter(gdkmonitor: Gdk.Monitor) {
    return <window
        className="NotificationCenter"
        name={`notification-center-${gdkmonitor.get_model()}`}
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.NORMAL}
        anchor={Astal.WindowAnchor.TOP}
        visible={false}
        application={App}>
            <box className={"notification-center-box"}>
                <Calendar />
            </box>
    </window>
}