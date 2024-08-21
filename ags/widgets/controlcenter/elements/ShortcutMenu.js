import { Wifi } from "./Wifi.js"
import { Row } from "../../../organisers/Row.js"

export const ShortcutMenu = () => {
    return Widget.Box({
        vertical: true,
        children: [
            Row(
                [
                    Wifi()
                ], 
                8,
                ''
            )
        ],
    })
}