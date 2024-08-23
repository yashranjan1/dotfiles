import { Wifi } from "./Wifi.js"
import { Row } from "../../../organisers/Row.js"
import { Bluetooth } from "./Bluetooth.js"
import { DarkModeToggle } from "./DarkModeToggle.js"
import { Column } from "../../../organisers/Column.js"
import { AccentChanger } from "./AccentChanger.js"

export const ShortcutMenu = () => {
    return Column(
            [
                Row(
                    [
                        Wifi(),
                        Bluetooth(),
                    ], 
                    8,
                    ''
                ),
                Row(
                    [
                        DarkModeToggle(),
                        AccentChanger()
                    ],
                    8,
                    ''
                ), 
            ],
        8,
        ''
    )
}