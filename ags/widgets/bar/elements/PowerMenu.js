const mpris = await Service.import('mpris')

export const PowerMenu = () => {
    return Widget.Button({
        on_clicked: () => {console.log(mpris.players)},
        class_name: 'power-menu button',
        child: Widget.Icon('system-shutdown-symbolic')
    })
}