import { QuickMenu } from "./elements/QuickMenu.js"
import { Media } from "./elements/Media.js"
import { ShortcutMenu } from "./elements/ShortcutMenu.js"
import { Column } from "../../organisers/Column.js"

export const ControlCenter = () =>{
    return Column(
        [
            QuickMenu(),
            Media(),
            ShortcutMenu()
        ],
        10, 
        'control-center-menu'
    )
}