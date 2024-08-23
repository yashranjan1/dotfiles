import { UserCard } from "./UserCard.js"
import { QuickOptions } from "./QuickOptions.js"
import { Row } from "../../../organisers/Row.js"

export const QuickMenu = () => {
    return Row(
        [
            UserCard(),
            QuickOptions()
        ],
        0,
        ''
    )
}