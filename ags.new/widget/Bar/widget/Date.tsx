import { bind, Variable } from "astal"
import { GLib } from "astal"
import { App } from "../../../../../../../usr/share/astal/gjs/gtk3"
import { DateProps } from "../../../types/dateProps"



function Date({ format = "%-l:%M %p", monitor, state }: DateProps) {
    const time = Variable<string>("").poll(1000, () =>
        GLib.DateTime.new_now_local().format(format)!)


    return <button className={bind(state).as(s => s === `date-${monitor}` ? "bg-active date-btn" : "date-btn")}
        onClick={() => {
            if (state.get() === `date-${monitor}`) {
                state.set("none")
            }
            else {
                state.set(`date-${monitor}`)
            }
        }}
        >        
        <label
        className="date"
        name={`date-${monitor}`}
        onDestroy={() => time.drop()}
        label={time()}
    />
    </button>
}

export default Date;