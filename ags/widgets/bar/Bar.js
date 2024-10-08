import { Logo } from "./elements/Logo.js"
import { Workspaces } from "./elements/Workspaces.js"
import { DateWidget } from "./elements/DateWidget.js"
import { ControlCenterButton } from "./elements/ControlCenterButton.js"
import { PowerMenu } from "./elements/PowerMenu.js"
import { WallpaperMenuButton } from "./elements/WallpaperMenuButton.js"


function Left() {
    return Widget.Box({
        spacing: 8,
        children: [
            Logo(),
            Workspaces()
        ],
    })
}

function Center(monitor) {
    return Widget.Box({
        children: [
            DateWidget(monitor)
        ],
        class_name: 'full-opacity'
    })
}

function Right(monitor) {
    return Widget.Box({
        hpack: "end",
        children: [
            WallpaperMenuButton(monitor),
            ControlCenterButton(monitor),
            PowerMenu(monitor),
        ],
        class_name: 'right full-opacity'
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
        class_name: 'bar full-opacity'
    })
}
