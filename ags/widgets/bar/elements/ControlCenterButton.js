import { active, changeActive } from "../../../variables/ActiveWindow.js"

export const ControlCenterButton = (monitor) => {

    const button = Widget.Button({
        on_clicked: (self) => {
            button.activated = !button.activated

            self.child.toggleClassName('activated-box', button.activated)

            const newWindow = `control_center${monitor}`

            changeActive(newWindow, self)
            
            App.toggleWindow(newWindow)
            
        },
        child: Widget.Box({
            spacing: 8,
            children: [
                Widget.Icon({ icon: 'network-wireless-symbolic' }),
                Widget.Icon({ icon: 'audio-volume-low-symbolic' })
            ],
            class_name: 'control-center'
        }),
        class_name: 'button control-center-button',
        cursor: 'pointer',
        name: `button${monitor}`
    })

    return Object.assign(button, {
            activated: false,
            type: 'cc'
        }
    )
}
