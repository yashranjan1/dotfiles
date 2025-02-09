import { Astal, Gtk } from "astal/gtk3";
import { WindowCustomProps } from "../../types/windowCustomProps";
import { bind, Variable } from "astal";
import Apps from "gi://AstalApps"
import { BarSplitter } from "./widget/BarSplitter";

function AppButton({ app, hide }: { app: Apps.Application, hide: () => void }) {
    return <button
        className="app-button"
        onClicked={() => {hide(); app.launch() }}>
        <box>
            <icon icon={app.iconName} />
            <box valign={Gtk.Align.CENTER} vertical>
                <label
                    className="name"
                    truncate
                    xalign={0}
                    label={app.name}
                />
            </box>
        </box>
    </button>
}

function CommandView(){
    return (
        <box hexpand vexpand className={'command-view'} spacing={15}>   
            <icon icon={"utilities-terminal-symbolic"}/>
            <box valign={Gtk.Align.CENTER} vertical >
                <label halign={Gtk.Align.START} label={"This is the command view"} className={"command-head"}/>
                <label halign={Gtk.Align.START} label={"You can use custom defined commands here"} className={"command-desc"}/>
            </box>
        </box>
    )
}


export default function AppLauncher({ gdkmonitor, menuState }: WindowCustomProps) {


    const MAX_ITEMS = 5

    const apps = new Apps.Apps()
    const text = Variable("")
    const list = text(text => !text.startsWith(":") ? apps.fuzzy_query(text).slice(0, MAX_ITEMS) : [])
    const commands = text(text => {
        if (text.startsWith(":")){
            if (text == ":s") return <BarSplitter />
            return <CommandView /> 
        } 
        return <box /> 
    })

    const hide = () => {
        menuState.set("none")
    }

    const onEnter = () => {
        if (!text.get().startsWith(":")) {
            apps.fuzzy_query(text.get())?.[0].launch()
            hide();
        }
    }


    return (
        <window className="app-launcher"
            name={`app-launcher-${gdkmonitor.get_model()}`}
            gdkmonitor={gdkmonitor}
            exclusivity={Astal.Exclusivity.IGNORE}
            visible={bind(menuState).as(s => s === `app-launcher-${gdkmonitor.get_model()}` ? true : false)}
            anchor={
                Astal.WindowAnchor.TOP
            }
            keymode={Astal.Keymode.ON_DEMAND}
        >
            <box vertical spacing={25} className={"app-launcher-box shadow"}>
                <entry
                    onChanged={self => text.set(self.text)}
                    onActivate={self =>{ 
                        onEnter()
                        self.text = ""
                    }}
                    placeholderText="Search..."
                    className={"entry"}
                />

                <box spacing={6} vertical>
                    {list.as(list => list.map(app => {
                        return (
                            <AppButton app={app} hide={hide} />
                        )
                    }))}
                    {commands}
                </box>
            </box>
        </window>
    )
}
