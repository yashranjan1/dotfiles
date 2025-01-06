import { bind, exec, Variable } from "astal";
import { Gtk } from "astal/gtk3";

const uptime = Variable<string>("").poll(60000, () => exec("cat /proc/uptime"))

export default function ProfileCard() {

    const userName = exec('whoami')

    return (
        <box hexpand={true}>
            <box className="profile-image" />
            <box vertical 
                className="" 
                valign={Gtk.Align.CENTER}
            >
                <label label={userName} halign={Gtk.Align.START}/>
                <label label={bind(uptime).as(t => {
                    const time = Number.parseInt(t.split(".")[0]) / 60

                    const h = Math.floor(time / 60)
                    const m = Math.floor(time % 60)
                    return `${h}h ${m < 10 ? "0" + m : m}m`
                })}/>
            </box>
        </box>
    )
}