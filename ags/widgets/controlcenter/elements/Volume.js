const audio = await Service.import('audio')

export const Volume = () => {
    return Widget.Box({
        children: [
            Widget.Icon({ icon: 'audio-speakers-symbolic', css: 'font-size:16px'}),
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