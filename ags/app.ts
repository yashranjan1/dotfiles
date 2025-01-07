import { App } from "astal/gtk3"
import Bar from "@Bar/Bar"
import NotificationCenter from "@Notif/NotificationCenter"
import { exec, Variable } from "astal"
import PowerMenu from "@Power/PowerMenu"
import ControlCenter from "@CC/ControlCenter"
import AppLauncher from "@/AppLauncher/AppLauncher"
import WallpaperSwitcher from "@/WallpaperSwitcher/WallpaperSwitcher"
import NotificationPopups from "@/Notification/Popups"
import { readConfig, readCurrentTheme } from "./helpers/init"

exec(["sass", "./style.scss", "/tmp/style.css"])

// config creation
readCurrentTheme()
readConfig()

const menuState = Variable<string>("none")

App.start({
    requestHandler(request: string, res: (response: any) => void) {

        if (request.startsWith("app-launcher")) {
            const newValue: string = "app-launcher-" + App.get_monitors()[Number(request.split("-")[2])].get_model()
            if (newValue === menuState.get()) {
                menuState.set("none")
                res("closed!")
                return
            }
            menuState.set(newValue)
            res("opened!")
        }
    },
    css: "/tmp/style.css",
    icons: `${SRC}/icons`,
    main() {
        App.get_monitors().map(monitor => {
            Bar({ gdkmonitor: monitor, menuState: menuState })
        })
        App.get_monitors().map(monitor => {
            NotificationCenter({ gdkmonitor: monitor, menuState: menuState })
        })
        App.get_monitors().map(monitor => {
            PowerMenu({ gdkmonitor: monitor, menuState: menuState })
        })
        App.get_monitors().map(monitor => {
            ControlCenter({ gdkmonitor: monitor, menuState: menuState })
        })
        App.get_monitors().map(monitor => {
            AppLauncher({ gdkmonitor: monitor, menuState: menuState })
        })
        App.get_monitors().map(monitor => {
            WallpaperSwitcher({ gdkmonitor: monitor, menuState: menuState })
        })
        NotificationPopups(App.get_monitors()[0])
    },
})
