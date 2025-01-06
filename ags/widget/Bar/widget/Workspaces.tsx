import Hyprland from "gi://AstalHyprland"
import { bind } from "astal"

function FocusedClient() {
    const hypr = Hyprland.get_default()
    const focused = bind(hypr, "focusedClient")

    return <box
        className="focused-client"
        visible={focused.as(Boolean)}>
        {focused.as(client => (
            client && <label label={bind(client, "title").as(String => String.split("-")[String.split("-").length-1])} />
        ))}
    </box>
}

function Workspaces() {
    const hypr = Hyprland.get_default()

    const styles = "workspace-tab"

    return <box className="Workspaces">
        {bind(hypr, "workspaces").as(wss => wss
            .filter(ws => !(ws.id >= -99 && ws.id <= -2)) 
            .sort((a, b) => a.id - b.id)
            .map(ws => (
                <button
                    className={bind(hypr, "focusedWorkspace").as(fw =>
                        ws === fw ? `focused ${styles}` : styles)}
                    onClicked={() => ws.focus()}>
                </button>
            ))
        )}
        <FocusedClient />
    </box>
}

export default Workspaces;