const network = await Service.import('network')

export const Wifi = () => {   
    return Widget.Box({
        children: [
            Widget.Button({
                setup: self => self.hook(network.wifi, () => {
                    self.toggleClassName("active", network.wifi.icon_name != 'network-wireless-disabled-symbolic')
                }),
                on_clicked: ()=>{ {
                    if (network.wifi.enabled){
                        network.wifi.enabled = false
                    }
                    else {
                        network.wifi.enabled = true
                    }
                    
                } },
                child: Widget.Box({
                    spacing: 8,
                    children: [
                        Widget.Icon().hook(network.wifi, self => {
                            self.icon = `${network.wifi.icon_name}`
                        }, "changed"),
                        Widget.Label({
                            truncate: 'end'
                        }).hook(network.wifi, self => {
                            var ssid = network.wifi.ssid || "Not Connected"
                            self.label = `${ssid}`
                        }, "changed"),
                    ]
                }),
                class_name: `shortcut-menu-item`,
                cursor: 'pointer',
                hexpand: true
            }),
            Widget.Button({
                setup: self => self.hook(network.wifi, () => {
                    self.toggleClassName("active", network.wifi.icon_name != 'network-wireless-disabled-symbolic')
                }),
                on_clicked: ()=>{},
                child: Widget.Icon({
                    icon: 'pan-end-symbolic'
                }),
                class_name: 'drop-down',
                cursor: 'pointer'
            }),
        ],
    })
}