import { Volume } from "./Volume.js"
import { Microphone } from "./Microphone.js"

export const Media = () => {
    return Widget.Box({
        vertical: true,
        spacing: 8,
        children: [
            Volume(),
            Microphone()
        ],
        class_name: 'section'
    })
}
