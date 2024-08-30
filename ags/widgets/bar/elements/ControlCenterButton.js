import { changeActive } from "../../../variables/ActiveWindow.js"
const audio = await Service.import('audio')
const network = await Service.import('network')

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
                Widget.Icon().hook(audio, self => {
                    if (audio.speaker.volume == 0 || audio.speaker.is_muted) self.icon = 'audio-volume-muted-symbolic'
                    else if (audio.speaker.volume < 0.3) self.icon = 'audio-volume-low-symbolic'
                    else if (audio.speaker.volume < 0.6 && audio.speaker.volume >= 0.3) self.icon = 'audio-volume-medium-symbolic'
                    else if (audio.speaker.volume < 1 && audio.speaker.volume >= 0.6) self.icon = 'audio-volume-high-symbolic'
                }),
                Widget.Icon().hook(network, self=> self.icon = network.wifi.icon_name)
            ],
            class_name: 'control-center'
        }),
        class_name: 'button toggle-button',
        cursor: 'pointer',
    })

    return Object.assign(button, {
            activated: false,
            type: 'cc'
        }
    )
}
