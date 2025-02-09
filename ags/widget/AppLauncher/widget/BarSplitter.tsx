import { bind, writeFileAsync } from "astal"
import { theme, split } from "../../../variables/theme-variables"
import { splitBar } from "../../../helpers/bar"
import { Gtk } from "astal/gtk3"

export function BarSplitter(){
    const onclick = () => {
        split.set(!split.get())
        writeFileAsync(`${SRC}/currentTheme.json`, JSON.stringify({ name: theme.get(), split: split.get() }))
        splitBar(split.get())
    }

    return (
        <box hexpand vexpand className={"splitter"} spacing={15}>
            <icon icon={"top_bar-symbolic"} />
            <box hexpand valign={Gtk.Align.CENTER} vertical>
                <label halign={Gtk.Align.START} label={"Split Bar"} className={"command-head"}/>
                <label halign={Gtk.Align.START} label={"Change the style of the bar"} className={"command-desc"}/>
            </box>
            <box halign={Gtk.Align.END} className={'switch-box'}>
                <switch onButtonPressEvent={onclick} vexpand={false} active={bind(split).as(s => !s)} />
            </box>
        </box>
    )
}
