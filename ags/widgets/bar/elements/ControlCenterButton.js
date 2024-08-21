export const ControlCenterButton = (monitor) => {

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
