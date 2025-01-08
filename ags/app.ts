import { App } from "astal/gtk3"
import Bar from "@Bar/Bar"
import { exec, readFileAsync, Variable } from "astal"
import PowerMenu from "@Power/PowerMenu"
import ControlCenter from "@CC/ControlCenter"
import AppLauncher from "@/AppLauncher/AppLauncher"
import WallpaperSwitcher from "@/WallpaperSwitcher/WallpaperSwitcher"
import NotificationPopups from "@/Notification/Popups"
import CalendarCenter from "@/CalendarCenter/CalendarCenter"
import NotificationCenter from "@/NotificationCenter/NotificationCenter"
import { config, theme, themeOpts, wallpaper, wallpaperOpts } from "./variables/theme-variables"

exec(["sass", "./style.scss", "/tmp/style.css"])

// config creation


await readFileAsync(`${SRC}/currentTheme.json`).then( data => {
    const parsed: { name: string, wallpaper: string } = JSON.parse(data)
    theme.set(parsed.name)
    wallpaper.set(parsed.wallpaper)
})
   


await readFileAsync(`${SRC}/themes.json`).then(data => {
    const parsed: Array<Config> = JSON.parse(data)
    config.set(parsed)

    themeOpts.set(parsed.map(t => t.name))
    wallpaperOpts.set(parsed.filter(t => t.name === theme.get())[0].wallpapers)
})


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
            CalendarCenter({ gdkmonitor: monitor, menuState: menuState })
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
        App.get_monitors().map(monitor => {
            NotificationCenter({ gdkmonitor: monitor, menuState: menuState })
        })
        NotificationPopups(App.get_monitors()[0])
    },
})
