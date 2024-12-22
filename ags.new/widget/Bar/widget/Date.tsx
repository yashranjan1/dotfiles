import { exec, execAsync, Variable } from "astal"
import { GLib } from "astal"

type DateProps = {
    format?: string
    displayName: string
}

function Date({ format = "%-l:%M %p", displayName }: DateProps) {
    const time = Variable<string>("").poll(1000, () =>
        GLib.DateTime.new_now_local().format(format)!)


    return <button className={"date-btn"}
        onClick={() => {
            execAsync(['astal', '-t', `notification-center-${displayName}`])
        }}
        >        
        <label
        className="date"
        name={`date-${displayName}`}
        onDestroy={() => time.drop()}
        label={time()}
    />
    </button>
}

export default Date;