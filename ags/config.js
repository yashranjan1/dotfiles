const hyprland = await Service.import("hyprland")

function Workspaces() {
    const activeId = hyprland.active.workspace.bind("id")
    const workspaces = hyprland.bind("workspaces")
        .as(ws => ws.map(({ id }) => Widget.Button({
            on_clicked: () => hyprland.messageAsync(`dispatch workspace ${id}`),
            class_name: activeId.as(i => `${i === id ? "focused" : "not-focused"}`),
            name: 'button'
        }
    )))

    return Widget.Box({
        class_name: "workspaces",
        children: workspaces,
    })
}

function LogoMenu(){
    return Widget.Icon({ icon: 'archlinux-logo', name: 'logo'})
}

function Left() {
    return Widget.Box({
        spacing: 8,
        children: [
            LogoMenu(),
            Workspaces()
        ],
    })
}

function Center(){
    return Widget.Label({
        class_name: 'date'
    })
    .poll(1000, label => label.label = Utils.exec('date +"%H:%M - %a %d %B %Y"'))
}

function Power(){
    return Widget.Button({
        on_clicked: () => {},
        class_name: 'power-menu',
        child: Widget.Icon('system-shutdown-symbolic')
    })
}

function Right(){
    return Widget.Box({
        hpack: "end",
        children: [
            Power()
        ],
        class_name: 'right'
    })
}

function Bar(monitor = 0) {
    const myLabel = Widget.Label({
        label: 'some example content',
    })

    return Widget.Window({
        monitor,
        name: `bar${monitor}`,
        anchor: ['top', 'left', 'right'],
        child: Widget.CenterBox({
            start_widget: Left(),
            center_widget: Center(),
            end_widget: Right(),
            name: 'window_box'
        }),
    })
}


App.config({
    windows: [
        Bar(0), // can be instantiated for each monitor
        Bar(1),
    ],
    style:'./styles.css'
})
