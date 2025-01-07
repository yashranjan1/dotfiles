import { changeActive } from "../../../variables/ActiveWindow.js"

export const PowerMenu = (monitor) => {
    const powerMenu = Widget.Button({
        on_clicked: (self) => {

            powerMenu.activated = !powerMenu.activated

            self.toggleClassName('activated-box', powerMenu.activated)

            const newWindow = `power_menu${monitor}`

            changeActive(newWindow, self)
            
            App.toggleWindow(newWindow)
        },
        class_name: 'button power-menu',
        child: Widget.Icon('system-shutdown-symbolic')
    })
    return Object.assign(powerMenu, {
            activated: false,
            type: 'power'
        }
    )
}