import { Bar } from "./widgets/bar/Bar.js"
import { ControlCenterWindow } from "./widgets/controlcenter/ControlCenter.js"
import { theme, accent, accentColors, colorValues } from "./variables/Theming.js"
import { AppLauncherWindow } from "./widgets/application-launcher/AppLauncher.js"
import { CalendarWindow } from "./widgets/calendar/Calendar.js"
import { PowerMenuWindow } from "./widgets/power-menu/PowerMenu.js"
import { WallpaperSwitcherWindow } from "./widgets/wallpaper-switcher/WallpaperSwitcher.js"
import { currentWallpaper, wallpaperOptions } from "./variables/Wallpapers.js"


// Variable setup

// Accent
let accentOptions = Utils.readFile('.config/ags/accentOptions.json')
accentOptions = JSON.parse(accentOptions)
colorValues.setValue(accentOptions)
accentColors.setValue(Object.keys(colorValues.value))


// Theme
let themeVars = Utils.readFile('.config/ags/variables.json')
themeVars = JSON.parse(themeVars)
theme.setValue(themeVars.theme)
accent.setValue(themeVars.color)
currentWallpaper.setValue(themeVars.wallpaper)

// Wallpaper 
let wallpaperVars = Utils.readFile('.config/ags/wallpapers.json')
wallpaperVars = JSON.parse(wallpaperVars)
wallpaperOptions.setValue(wallpaperVars)


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
        PowerMenuWindow(1),
        WallpaperSwitcherWindow(0),
        WallpaperSwitcherWindow(1)
    ],
    style:'./styles.css'
})