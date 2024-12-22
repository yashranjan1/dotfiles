import { App } from "astal/gtk3"
import style from "./style.scss"
import Bar from "./widget/Bar/Bar"
import NotificationCenter from "./widget/NotificationCenter/NotificationCenter"

const SRC = "/home/yash/.config/ags.new"

App.start({
    css: style,
    icons: `${SRC}/icons`,
    main() {
        App.get_monitors().map(Bar)
        App.get_monitors().map(NotificationCenter)
    },
})
