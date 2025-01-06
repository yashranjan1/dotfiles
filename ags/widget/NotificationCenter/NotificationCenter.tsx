import { App, Astal, Gtk } from "astal/gtk3"
import Calendar from "@Notif/Calendar"
import { bind } from "astal"
import { WindowCustomProps } from "../../types/windowCustomProps"
import  { NotificationMap } from "@/Notification/Popups"

export default function NotificationCenter({ gdkmonitor, menuState }: WindowCustomProps) {
    const notifs = new NotificationMap(true)


    return <window
        className="NotificationCenter"
        name={`notification-center-${gdkmonitor.get_model()}`}
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.NORMAL}
        anchor={Astal.WindowAnchor.TOP}
        visible={bind(menuState).as(s => s === `date-${gdkmonitor.get_model()}` ? true : false)}
        application={App}>
            <box className={"notification-center-box shadow"}>
                <box hexpand>
                    <box vertical hexpand>
                        <label className={"notification-header"} label="Notifications" />
                        <scrollable hexpand className={"notif-scroll"}>
                            <box vertical hexpand>
                                {bind(notifs).as(notifs => {
                                    if (notifs.length === 0) {
                                        return <box
                                            className="no-notifications"
                                            valign={Gtk.Align.CENTER}
                                            halign={Gtk.Align.CENTER}
                                            vexpand
                                            >
                                            <label
                                                label="No Notifications"
                                                halign={Gtk.Align.CENTER}
                                                valign={Gtk.Align.CENTER}
                                            />
                                        </box>
                                    }
                                    return notifs
                                })}
                            </box>
                        </scrollable>
                    </box>
                </box>
                <Calendar />
            </box>
    </window>
}