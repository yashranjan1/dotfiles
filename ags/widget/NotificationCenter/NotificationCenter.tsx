import NotificationStack from "@/Notification/Stack";
import { bind } from "astal";
import { Astal, Gtk } from "astal/gtk3";
import { WindowCustomProps } from "../../types/windowCustomProps";
import notifd from "gi://AstalNotifd";

export default function NotificationCenter({ gdkmonitor, menuState }: WindowCustomProps) {

    const notif = notifd.get_default()

    return <window
        className="NotificationCenter"
        name={`notification-center`}
        exclusivity={Astal.Exclusivity.NORMAL}
        anchor={
            Astal.WindowAnchor.TOP |
            Astal.WindowAnchor.RIGHT |
            Astal.WindowAnchor.BOTTOM
        }
        visible={bind(menuState).as(s => s === `notification-center-${gdkmonitor.get_model()}` ? true : false)}
        >
        <box className={"notification-center-box shadow"}>
            <box hexpand>
                <box vertical hexpand>
                    <box css={"margin: 0 15px 15px;"}>
                        <label className={"notification-header"} label="Notifications" hexpand halign={Gtk.Align.START} />
                        <button 
                            className={"clear-all-btn"} 
                            onClicked={() => {
                                notif.get_notifications().forEach(n => {
                                    n.dismiss()
                                })
                            }}
                        >
                            <icon icon={"edit-delete-symbolic"} />
                        </button>
                    </box>
                    <scrollable hscroll={Gtk.PolicyType.NEVER} hexpand className={"notif-scroll"}>
                        <box vertical hexpand>
                            <NotificationStack />
                        </box>
                    </scrollable>
                </box>
            </box>
        </box>
    </window>   
}
