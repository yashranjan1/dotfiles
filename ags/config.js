import { Bar } from "./widgets/bar/Bar.js"
import { ControlCenterWindow } from "./widgets/controlcenter/ControlCenter.js"
import { theme, accent, accentColors, colorValues } from "./variables/Theming.js"
import { AppLauncherWindow } from "./widgets/application-launcher/AppLauncher.js"
import { CalendarWindow } from "./widgets/calendar/Calendar.js"
import { PowerMenuWindow } from "./widgets/power-menu/PowerMenu.js"

let accentOptions = Utils.readFile('.config/ags/accentOptions.json')
accentOptions = JSON.parse(accentOptions)
colorValues.setValue(accentOptions)
accentColors.setValue(Object.keys(colorValues.value))

let vars = Utils.readFile('.config/ags/variables.json')
vars = JSON.parse(vars)
theme.setValue(vars.theme)
accent.setValue(vars.color)




App.config({
    windows: [
        Bar(0), 
        Bar(1),
        ControlCenterWindow(0),
        ControlCenterWindow(1),
        AppLauncherWindow(0),
        CalendarWindow(0),
        CalendarWindow(1),
        PowerMenuWindow(0),
        PowerMenuWindow(1)
    ],
    style:'./styles.css'
})