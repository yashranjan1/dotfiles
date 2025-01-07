const audio = await Service.import('audio')

export const Volume = () => {
    return Widget.Box({
        children: [
            Widget.Button({
                child: Widget.Icon({ 
                    class_name: 'vol-icon'
                }).hook(audio, self => {
                    self.icon = audio["speaker"].is_muted ? 'audio-volume-muted-symbolic' : 'audio-speakers-symbolic'
                }),
                class_name: 'button',
                on_clicked: () => {
                    if (audio["speaker"].is_muted) audio["speaker"].is_muted = false
                    else audio["speaker"].is_muted = true
                }
            }),
            Widget.Slider({
                on_change: ({ value, dragging }) => {
                    if (dragging) {
                        audio["speaker"].volume = value
                        audio["speaker"].is_muted = false
                    }
                },
                value: audio["speaker"].bind("volume"),
                class_name: 'vol-level',
                draw_value: false,
                min: 0,
                max: 1,
                hexpand: true,
            })
        ]
    })
}