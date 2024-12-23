import { App } from "astal/gtk3"
import style from "./style.scss"
import Bar from "@Bar/Bar"
import NotificationCenter from "@Notif/NotificationCenter"
import { Variable } from "astal"
import PowerMenu from "@/PowerMenu/PowerMenu"

const menuState = Variable<string>("none")

App.start({
    requestHandler(request: string, res: (response: any) => void) {
        switch (request) {
            case "toggle-notification-center-0":
                App.toggle_window(`notification-center-${App.get_monitors()[0].get_model()}`)
                res("done!")
        }
        res("unknown command")
    },
    css: style,
    icons: `${SRC}/icons`,
    main() {
        App.get_monitors().map( monitor => {
            Bar({ gdkmonitor: monitor, menuState: menuState })
        })
        App.get_monitors().map( monitor => {
            NotificationCenter({ gdkmonitor: monitor, menuState: menuState })
        })
        App.get_monitors().map( monitor => {
            PowerMenu({ gdkmonitor: monitor, menuState: menuState })
        })
    },
})
