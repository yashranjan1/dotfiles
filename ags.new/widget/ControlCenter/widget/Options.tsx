import { bind } from "astal";
import { theme } from "../../../variables/theme-variables";
import { changeTheme } from "../../../helpers/theme";

export default function Options() {  

    return (
        <box vertical>
            <box>
                <box className={"option-container"}>
                    <button
                        onClick={() => changeTheme(-1)}
                    >
                        <icon icon="pan-start-symbolic"/>
                    </button>
                    <label label={bind(theme)}/>
                    <button
                        onClick={() => changeTheme(1)}
                    >
                        <icon icon="pan-end-symbolic"/>
                    </button>
                </box>
            </box>
            <box>
                
            </box>
        </box>
    )
}