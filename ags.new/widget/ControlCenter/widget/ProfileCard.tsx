import { bind, exec, Variable } from "astal";
import { Gtk } from "astal/gtk3";

const uptime = Variable<string>("").poll(1000, () => exec("uptime -p"))

export default function ProfileCard() {

    const userName = exec('whoami')

    return (
        <box className={"profile-sec"}>
            <box className="profile-image" />
            <box vertical 
                className="" 
                valign={Gtk.Align.CENTER}
            >
                <label label={userName} halign={Gtk.Align.START}/>
                <label label={bind(uptime).as(p => `${p.split(" ")[1]}h ${p.split(" ")[3]}m`)} />
            </box>
        </box>
    )
}