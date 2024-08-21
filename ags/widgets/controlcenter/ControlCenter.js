import { QuickMenu } from "./elements/QuickMenu.js"
import { Media } from "./elements/Media.js"
import { ShortcutMenu } from "./elements/ShortcutMenu.js"
import { Column } from "../../organisers/Column.js"

const ControlCenter = () =>{
    return Column(
        [
            QuickMenu(),
            Media(),
            ShortcutMenu()
        ],
        10, 
        'control-center-menu'
    )
}

export function ControlCenterWindow(monitor = 0){
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