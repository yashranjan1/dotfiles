import { bind, Variable } from "astal"
import { GLib } from "astal"
import { DateProps } from "../../../types/dateProps"



function Date({ format = "%-k:%M", monitor, state }: DateProps) {
    const time = Variable<string>("").poll(1000, () =>
        GLib.DateTime.new_now_local().format(format)!)


    return <button className={bind(state).as(s => s === `date-${monitor}` ? "date-btn bar-item-active" : "date-btn")}
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
