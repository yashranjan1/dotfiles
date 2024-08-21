const bluetooth = await Service.import('bluetooth')

export const Bluetooth = () => {
    // bluetooth.enabled = true
    return Widget.Box({
        children: [
                Widget.Button({
                setup: self => self.hook(bluetooth, () => {
                    self.toggleClassName("active", bluetooth.enabled)
                }),
                on_clicked: () => bluetooth.toggle(),
                child: Widget.Box({
                    spacing: 8,
                    children: [
                        
                        Widget.Icon()
                        .hook(bluetooth, self => {
                            self.icon = `${bluetooth.enabled ? 'bluetooth-active-symbolic': 'bluetooth-disabled-symbolic'}`
                        }, 'changed')
                        ,
                        Widget.Label({
                            truncate: 'end',
                        })
                        .hook(bluetooth, self => {
                            self.label = `${bluetooth.enabled ? "On" : "Off"}`
                        }, 'changed'),
                    ]
                }),
                class_name: `shortcut-menu-item`,
                cursor: 'pointer',
                hexpand: true
            }),,
            Widget.Button({
                setup: self => self.hook(bluetooth, () => {
                    self.toggleClassName("active", bluetooth.enabled)
                }),
                on_clicked: ()=>{},
                child: Widget.Icon({
                    icon: 'pan-end-symbolic'
                }),
                class_name: 'drop-down',
                cursor: 'pointer'
            }),
        ]
    })
}