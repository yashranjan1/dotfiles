import { Bar } from "./widgets/bar/Bar.js"
import { ControlCenter } from "./widgets/controlcenter/ControlCenter.js"


function ControlCenterWindow(monitor = 0){
    return Widget.Window({
        monitor,
        name: `control_center${monitor}`,
        anchor: ['top', 'right'],
        child: ControlCenter(),
        margins: [60, 62, 0, 0],
        visible: false,
        class_name: 'control-center-window'
    })
}


App.config({
    windows: [
        Bar(0), 
        Bar(1),
        ControlCenterWindow(0),
        ControlCenterWindow(1)
    ],
    style:'./styles.css'
})