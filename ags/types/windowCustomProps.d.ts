import { Variable } from "astal"
import { Gdk } from "astal/gtk3"

type WindowCustomProps = {
    gdkmonitor: Gdk.Monitor
    menuState: Variable<string>
}
