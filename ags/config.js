import { Bar } from "./widgets/bar/Bar.js"
import { ControlCenterWindow } from "./widgets/controlcenter/ControlCenter.js"


App.config({
    windows: [
        Bar(0), 
        Bar(1),
        ControlCenterWindow(0),
        ControlCenterWindow(1)
    ],
    style:'./styles.css'
})