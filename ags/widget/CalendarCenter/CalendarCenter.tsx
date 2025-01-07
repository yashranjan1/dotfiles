import { App, Astal, Gtk } from "astal/gtk3"
import Calendar from "@Calendar/Calendar"
import { bind } from "astal"
import { WindowCustomProps } from "../../types/windowCustomProps"

export default function CalendarCenter({ gdkmonitor, menuState }: WindowCustomProps) {


    return <window
        className="Calendar"
        name={`calendar-center-${gdkmonitor.get_model()}`}
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.NORMAL}
        anchor={Astal.WindowAnchor.TOP}
        visible={bind(menuState).as(s => s === `date-${gdkmonitor.get_model()}` ? true : false)}
        application={App}>
            <box className={"calendar-center-box shadow"}>
                <Calendar />
            </box>
    </window>
}