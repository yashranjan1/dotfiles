import { Row } from "../../../organisers/Row.js"

export const QuickOptions = () => {

    const settings = Widget.Button({
        child: Widget.Icon('emblem-system-symbolic'),
        class_name: 'opts-box',
        cursor: 'pointer'
    })
    
    const logout = Widget.Button({
        child: Widget.Icon('system-log-out-symbolic'),
        class_name: 'opts-box',
        cursor: 'pointer'
    })
    const poweroff = Widget.Button({
        child: Widget.Icon('system-shutdown-symbolic'),
        on_clicked: () => Utils.exec('shutdown now'),
        class_name: 'opts-box',
        cursor: 'pointer'
    })

    return Row(
        [
            settings, 
            logout, 
            poweroff
        ],
        8,
        'top-opts'
    )
}