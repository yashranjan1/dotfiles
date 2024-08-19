const hyprland = await Service.import("hyprland")

const workspaces = () => {
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

const logo_menu = () => {
    return Widget.Icon({ icon: 'archlinux-logo', class_name: 'logo'})
}

const power = () => {
    return Widget.Button({
        on_clicked: () => {},
        class_name: 'power-menu button',
        child: Widget.Icon('system-shutdown-symbolic')
    })
}

const date_widget = () => {
    return Widget.Label({
        class_name: 'date'
    })
    .poll(1000, label => label.label = Utils.exec('date +"%H:%M - %a %d %B %Y"'))
}

const control_center_button = (monitor) => {

    const button = Widget.Button({
        on_clicked: () => { 
            const box = button.child
            const icons = box.children
            button.activated = !button.activated
            for (var icon of icons){
                icon.toggleClassName('activated-icon', button.activated)  
            }
            box.toggleClassName('activated-box', button.activated)
            
            App.toggleWindow(`control_center${monitor}`)
            App.getWindow
            
        },
        child: Widget.Box({
            spacing: 8,
            children: [
                Widget.Icon({ icon: 'network-wireless-symbolic', class_name: 'not-activated' }),
                Widget.Icon({ icon: 'audio-volume-low-symbolic', class_name: 'not-activated' })
            ],
            class_name: 'control-center'
        }),
        class_name: 'button control-center-button',
        cursor: 'pointer'
    })

    return Object.assign(button, {
            activated: false
        }
    )
}

const control_center = () =>{
    return Widget.Box({
        vertical: true,
        spacing: 10,
        children: [
            top_cc(),
            vol_ctl()
        ],
        class_name: 'control-center-menu'
    })
}

const top_cc = () => {
    return Widget.Box({
        spacing: 50,
        children: [
            user_card(),
            top_opts()
        ]
    })
}

const user_card = () => {
    const userName = Utils.exec('whoami')
    const uptime = Utils.exec(`awk '{printf "%dh %dm\\n", $1/3600, ($1%3600)/60}' /proc/uptime`)
    return Widget.Box({
        spacing: 10,
        children: [
            Widget.Icon({
                icon : 'avatar-default',
                class_name: 'avatar'
            }),
            Widget.Box({
                vertical: true,
                children: [
                    Widget.Label({
                        xalign: 0,
                        label: userName,
                    }),
                    Widget.Label({
                        xalign: 0,
                        label: uptime,
                    }),
                ],
            }),
        ],
        class_name: 'user-card'
    })

}

const top_opts = () => {
    return Widget.Box({
        spacing: 8,
        children: [
            Widget.Button({
                child: Widget.Icon('emblem-system-symbolic'),
                class_name: 'opts-box',
                cursor: 'pointer'
            }),
            Widget.Button({
                child: Widget.Icon('system-log-out-symbolic'),
                class_name: 'opts-box',
                cursor: 'pointer'
            }),
            Widget.Button({
                child: Widget.Icon('system-shutdown-symbolic'),
                class_name: 'opts-box',
                cursor: 'pointer'
            })
        ],
        class_name: 'top-opts'
    })
}

const vol_ctl = () => {
    return Widget.Box({
        spacing: 8,
        children: [
            Widget.Icon('audio-speakers-symbolic'),
            Widget.Slider({
                value: 40,
                class_name: 'vol-level',
                max: 100,
                min: 0
            })
        ],
        class_name: 'vol-ctl'
    })
}

export { logo_menu, workspaces, power, date_widget, control_center, control_center_button }