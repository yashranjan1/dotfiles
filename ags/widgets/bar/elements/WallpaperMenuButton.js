import { changeActive } from "../../../variables/ActiveWindow.js"

export const WallpaperMenuButton = (monitor) => {
    const button = Widget.Button({
        child: Widget.Icon({
            icon: 'preferences-desktop-remote-desktop-symbolic'
        }),
        class_name: 'button toggle-button wallpaper-menu',
        on_clicked: (self) => {
            button.activated = !button.activated

            self.toggleClassName('activated-box', button.activated)

            const newWindow = `wallpaper_switcher${monitor}`

            changeActive(newWindow, self)
            
            App.toggleWindow(newWindow)
            
        },
        
    })
    return Object.assign(button, {
        activated: false,
        type: 'power'
    }
)
}