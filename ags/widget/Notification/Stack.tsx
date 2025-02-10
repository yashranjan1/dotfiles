import { Gtk  } from "astal/gtk3"
import Notifd from "gi://AstalNotifd"
import Notification from "./widget/StackNotif"
import { type Subscribable } from "astal/binding"
import { Variable, bind, timeout } from "astal"


// The purpose if this class is to replace Variable<Array<Widget>>
// with a Map<number, Widget> type in order to track notification widgets
// by their id, while making it conviniently bindable as an array
export class NotificationStackObj implements Subscribable {
    // the underlying map to keep track of id widget pairs
    private map: Map<number, Gtk.Widget> = new Map() 

    // it makes sense to use a Variable under the hood and use its
    // reactivity implementation instead of keeping track of subscribers ourselves
    private var: Variable<Array<Gtk.Widget>> = Variable([])

    // notify subscribers to rerender when state changes
    private notifiy() {
        this.var.set([...this.map.values()].reverse())
    }

    constructor() {
        const notifd = Notifd.get_default()

        notifd.get_notifications().forEach(n => {
            this.set(n.id, Notification({
                notification: n,

                // once hovering over the notification is done
                // destroy the widget without calling notification.dismiss()
                // so that it acts as a "popup" and we can still display it
                // in a notification center like widget
                // but clicking on the close button will close it
                onHoverLost: () => {},

                // notifd by default does not close notifications
                // until user input or the timeout specified by sender
                // which we set to ignore above
                setup: () => {}
            }))
        })

        notifd.connect("notified", (_, id) => {
            this.set(id, Notification({
                notification: notifd.get_notification(id)!,

                // once hovering over the notification is done
                // destroy the widget without calling notification.dismiss()
                // so that it acts as a "popup" and we can still display it
                // in a notification center like widget
                // but clicking on the close button will close it
                onHoverLost: () => {},

                // notifd by default does not close notifications
                // until user input or the timeout specified by sender
                // which we set to ignore above
                setup: () => {}
            }))
        })

        // notifications can be closed by the outside before
        // any user input, which have to be handled too
        notifd.connect("resolved", (_, id) => {
            this.delete(id)
        })
    }

    private set(key: number, value: Gtk.Widget) {
        // in case of replacecment destroy previous widget
        this.map.get(key)?.destroy()
        this.map.set(key, value)
        this.notifiy()
    }

    private delete(key: number) {
        this.map.get(key)?.destroy()
        this.map.delete(key)
        this.notifiy()
    }

    // needed by the Subscribable interface
    get() {
        if (this.var.get().length === 0) {
            return <label label="No notifications"
            />
        }
        return this.var.get()
    }

    // needed by the Subscribable interface
    subscribe(callback: (list: Array<Gtk.Widget>) => void) {
        return this.var.subscribe(callback)
    }
}

export default function NotificationStack() {
    const notifs = new NotificationStackObj()

    const alignment = bind(notifs).as(notifs =>  Array.isArray(notifs)  ? Gtk.Align.START : Gtk.Align.CENTER)


    return <box vertical css={"padding: 10px 0;"} vexpand
            halign={bind(alignment)}
            valign={bind(alignment)}
        >
            {bind(notifs)}
        </box>
}
