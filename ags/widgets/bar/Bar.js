import { Logo } from "./elements/Logo.js"
import { Workspaces } from "./elements/Workspaces.js"
import { DateWidget } from "./elements/DateWidget.js"
import { ControlCenterButton } from "./elements/ControlCenterButton.js"
import { PowerMenu  } from "./elements/PowerMenu.js"


function Left() {
    return Widget.Box({
        spacing: 8,
        children: [
            Logo(),
            Workspaces()
        ],
    })
}

function Center(monitor){
    return Widget.Box({
        children: [
            DateWidget(monitor)
        ]
    })
}

function Right(monitor){
    return Widget.Box({
        hpack: "end",
        children: [
            ControlCenterButton(monitor),
            PowerMenu(monitor),
        ],
        class_name: 'right'
    })
}

export function Bar(monitor = 0) {

    return Widget.Window({
        monitor,
        name: `bar${monitor}`,
        anchor: ['top', 'left', 'right'],
        child: Widget.CenterBox({
            start_widget: Left(),
            center_widget: Center(monitor),
            end_widget: Right(monitor),
            class_name: 'bar-box'
        }),
        class_name: 'bar'
    })
}