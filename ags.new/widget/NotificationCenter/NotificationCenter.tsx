import { App, Astal } from "astal/gtk3"
import Calendar from "@Notif/Calendar"
import { bind } from "astal"
import { WindowCustomProps } from "../../types/windowCustomProps"

export default function NotificationCenter({ gdkmonitor, menuState }: WindowCustomProps) {
    return <window
        className="NotificationCenter"
        name={`notification-center-${gdkmonitor.get_model()}`}
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.NORMAL}
        anchor={Astal.WindowAnchor.TOP}
        visible={bind(menuState).as(s => s === `date-${gdkmonitor.get_model()}` ? true : false)}
        application={App}>
            <box className={"notification-center-box shadow"}>
                <Calendar />
            </box>
    </window>
}