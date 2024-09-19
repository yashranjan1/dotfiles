import { uptime } from "../../../variables/ControlCenter.js"
import { up } from "../../../variables/HelperFunctions.js"

export const UserCard = () => {
    const userName = Utils.exec('whoami')
    return Widget.Box({
        spacing: 10,
        children: [
            Widget.Icon({
                icon: 'avatar-default',
                class_name: 'avatar'
            }),
            Widget.Box({
                vertical: true,
                children: [
                    Widget.Label({
                        xalign: 0,
                        label: userName,
                    }),
                    Widget.Label({
                        xalign: 0,
                        label: uptime.bind().as(up),
                    }),
                ],
            }),
        ],
        class_name: 'user-card',
        hexpand: true
    })

}
