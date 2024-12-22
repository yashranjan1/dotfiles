import { Variable } from "astal"
import { Gdk } from "astal/gtk3"

type BarProps = {
    gdkmonitor: Gdk.Monitor
    menuState: Variable<string>
}