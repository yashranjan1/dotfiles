const audio = await Service.import('audio')

export const Microphone = () => {

    return Widget.Box({
        children: [
            Widget.Icon({ icon: 'audio-input-microphone-symbolic', css: 'font-size:16px'}),
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