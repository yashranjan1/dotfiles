const hyprland = await Service.import("hyprland")
const audio = await Service.import("audio")

// Variables
export const uptime = Variable(0, {
    poll: [60_000, "cat /proc/uptime", line =>
        Number.parseInt(line.split(".")[0]) / 60,
    ],
})
function up(up) {
    const h = Math.floor(up / 60)
    const m = Math.floor(up % 60)
    return `${h}h ${m < 10 ? "0" + m : m}m`
}

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
        on_clicked: () => {console.log(audio)},
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

const ControlCenterButton = (monitor) => {

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

const ControlCenter = () =>{
    return Widget.Box({
        vertical: true,
        spacing: 10,
        children: [
            QuickMenu(),
            Media()
        ],
        class_name: 'control-center-menu'
    })
}

const QuickMenu = () => {
    return Widget.Box({
        spacing: 50,
        children: [
            UserCard(),
            QuickOptions()
        ]
    })
}

const UserCard = () => {
    const userName = Utils.exec('whoami')
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
                        label: uptime.bind().as(up),
                    }),
                ],
            }),
        ],
        class_name: 'user-card'
    })

}

const QuickOptions = () => {
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

const Media = () => {
    return Widget.Box({
        vertical: true,
        spacing: 8,
        children: [
            Volume(),
            Microphone()
        ],
        class_name: 'media-section'
    })
}

const Volume = () => {
    return Widget.Box({
        children: [
            Widget.Icon({ icon: 'audio-speakers-symbolic', css: 'font-size:16px'}),
            Widget.Slider({
                on_change: ({ value, dragging }) => {
                    if (dragging) {
                        audio["speaker"].volume = value
                        audio["speaker"].is_muted = false
                    }
                },
                value: audio["speaker"].bind("volume"),
                class_name: 'vol-level',
                draw_value: false,
                min: 0,
                max: 1,
                hexpand: true,
            })
        ]
    })
}

const Microphone = () => {

    return Widget.Box({
        children: [
            Widget.Icon({ icon: 'audio-input-microphone-symbolic', css: 'font-size:16px'}),
            Widget.Slider({
                on_change: ({ value, dragging }) => {
                    if (dragging) {
                        audio["microphone"].volume = value
                        audio["microphone"].is_muted = false
                    }
                },
                value: audio["microphone"].bind("volume"),
                class_name: 'vol-level',
                draw_value: false,
                min: 0,
                max: 1,
                hexpand: true,
            })
        ],
    })
}

export { logo_menu, workspaces, power, date_widget, ControlCenter, ControlCenterButton }