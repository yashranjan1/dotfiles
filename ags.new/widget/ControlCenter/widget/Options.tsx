import { bind } from "astal";
import { theme } from "../../../variables/theme-variables";

export default function Options() {
    return (
        <box vertical>
            <box>
                <box>
                    <button></button>
                    <label label={bind(theme)}/>
                    <button></button>
                </box>
            </box>
            <box>
                
            </box>
        </box>
    )
}