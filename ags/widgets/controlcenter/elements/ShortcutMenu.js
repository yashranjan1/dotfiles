import { Wifi } from "./Wifi.js"
import { Row } from "../../../organisers/Row.js"
import { Bluetooth } from "./Bluetooth.js"

export const ShortcutMenu = () => {
    return Widget.Box({
        vertical: true,
        children: [
            Row(
                [
                    Wifi(),
                    Bluetooth(),
                ], 
                8,
                ''
            )
        ],
    })
}