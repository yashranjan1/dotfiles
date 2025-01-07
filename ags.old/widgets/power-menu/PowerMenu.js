import { Column } from "../../organisers/Column.js"

export function PowerMenuWindow(monitor){

    const powerMenu = () => {
        return Column(
            [
                Widget.Button({
                    child: Widget.Box({
                        children: [
                            Widget.Icon({
                                icon: 'system-shutdown-symbolic',
                                class_name: 'power-menu-icon'
                            }),
                            Widget.Label('Power off')
                        ]
                    }),
                    class_name: 'power-menu-option',
                    cursor: 'pointer',
                    on_clicked: () => Utils.exec('shutdown now')
                }),
                Widget.Button({
                    child: Widget.Box({
                        children: [
                            Widget.Icon({
                                icon: 'system-reboot-symbolic',
                                class_name: 'power-menu-icon'
                            }),
                            Widget.Label('Restart')
                        ]
                    }),
                    class_name: 'power-menu-option',
                    cursor: 'pointer',
                    on_clicked: () => Utils.exec('reboot')
                }),
                Widget.Button({
                    child: Widget.Box({
                        children: [
                            Widget.Icon({
                                icon: 'system-log-out-symbolic',
                                class_name: 'power-menu-icon'
                            }),
                            Widget.Label('Log out')
                        ]
                    }),
                    class_name: 'power-menu-option',
                    cursor: 'pointer',
                    on_clicked: () => Utils.exec('hyprctl dispatch exit')
                }),
            ],
            10,
            'power-menu-box',
        )
    }
    return Widget.Window({
        monitor: monitor,
        anchor: ['top', 'right'],
        margins: [40, 0, 0, 0],
        child: powerMenu(),
        class_name: 'power-menu-window',
        name: `power_menu${monitor}`,
        visible: false
    })
}