export const PowerMenu = () => {
    return Widget.Button({
        on_clicked: () => {console.log(icon)},
        class_name: 'power-menu button',
        child: Widget.Icon('system-shutdown-symbolic')
    })
}