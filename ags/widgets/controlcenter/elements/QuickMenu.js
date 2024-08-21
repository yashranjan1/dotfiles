import { UserCard } from "./UserCard.js"
import { QuickOptions } from "./QuickOptions.js"

// use a row

export const QuickMenu = () => {
    return Widget.Box({
        spacing: 50,
        children: [
            UserCard(),
            QuickOptions()
        ]
    })
}