const audio = await Service.import('audio')

export const Microphone = () => {

    return Widget.Box({
        children: [
            Widget.Button({
                child: Widget.Icon({ 
                    class_name: 'vol-icon'
                }).hook(audio, self => {
                    self.icon = audio["microphone"].is_muted ? 'microphone-sensitivity-muted-symbolic' : 'audio-input-microphone-symbolic'
                }),
                class_name: 'button',
                on_clicked: () => {
                    if (audio["microphone"].is_muted) audio["microphone"].is_muted = false
                    else audio["microphone"].is_muted = true
                }
            }),
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