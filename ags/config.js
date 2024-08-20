import { logo_menu, workspaces, date_widget, power, ControlCenter, ControlCenterButton } from './elements.js';

function Left() {
    return Widget.Box({
        spacing: 8,
        children: [
            logo_menu(),
            workspaces()
        ],
    })
}

function Center(){
    return Widget.Box({
        children: [
            date_widget()
        ]
    })
}

function Right(monitor){
    return Widget.Box({
        hpack: "end",
        spacing: 8,
        children: [
            ControlCenterButton(monitor),
            power(),
        ],
        class_name: 'right'
    })
}

function Bar(monitor = 0) {

    return Widget.Window({
        monitor,
        name: `bar${monitor}`,
        anchor: ['top', 'left', 'right'],
        child: Widget.CenterBox({
            start_widget: Left(),
            center_widget: Center(),
            end_widget: Right(monitor),
            name: 'window_box'
        }),
    })
}

function ControlCenterWindow(monitor = 0){
    return Widget.Window({
        monitor,
        name: `control_center${monitor}`,
        anchor: ['top', 'right'],
        child: ControlCenter(),
        margins: [60, 62, 0, 0],
        visible: false
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