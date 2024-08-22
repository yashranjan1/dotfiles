import { Bar } from "./widgets/bar/Bar.js"
import { ControlCenterWindow } from "./widgets/controlcenter/ControlCenter.js"
import { theme, accent } from "./variables/Theming.js"


let vars = Utils.readFile('.config/ags/variables.json')
vars = JSON.parse(vars)
theme.setValue(vars.theme)
accent.setValue(vars.color)

App.config({
    windows: [
        Bar(0), 
        Bar(1),
        ControlCenterWindow(0),
        ControlCenterWindow(1)
    ],
    style:'./styles.css'
})