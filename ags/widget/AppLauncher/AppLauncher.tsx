import { Astal, Gtk } from "astal/gtk3";
import { WindowCustomProps } from "../../types/windowCustomProps";
import { bind, Variable } from "astal";
import Apps from "gi://AstalApps"

function AppButton({ app, hide}: { app: Apps.Application, hide: () => void }) {
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
                {app.description && <label
                    className="description"
                    truncate
                    xalign={0}
                    label={app.description}
                />}
            </box>
        </box>
    </button>
}

export default function AppLauncher({ gdkmonitor, menuState }: WindowCustomProps) {


    const MAX_ITEMS = 5

    const apps = new Apps.Apps()
    const text = Variable("")
    const list = text(text => apps.fuzzy_query(text).slice(0, MAX_ITEMS))

    const hide = () => {
        menuState.set("none")
    }

    const onEnter = () => {
        apps.fuzzy_query(text.get())?.[0].launch()
        hide();
    }


    return (
        <window className="AppLauncher"
            name={`app-launcher-${gdkmonitor.get_model()}`}
            gdkmonitor={gdkmonitor}
            exclusivity={Astal.Exclusivity.IGNORE}
            visible={bind(menuState).as(s => s === `app-launcher-${gdkmonitor.get_model()}` ? true : false)}
            keymode={Astal.Keymode.ON_DEMAND}
        >
            <box vertical spacing={10} className={"app-launcher-box shadow"}>
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
                </box>
            </box>
        </window>
    )
}