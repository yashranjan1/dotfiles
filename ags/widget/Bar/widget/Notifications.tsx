import { bind } from "astal"
import { MenuInput } from "../../../types/menuInput"

export default function Notifications({ monitor, state }: MenuInput) {

    return  <button 
    className={bind(state).as(s => s === `notification-center-${monitor}` ? "control-center-btn bar-item-active" : "control-center-btn")}
    onClick={() => {
        if (state.get() === `notification-center-${monitor}`) {
            state.set("none")
        }
        else {
            state.set(`notification-center-${monitor}`)
        }
    }}
>
    <icon icon="notifications-applet-symbolic" />
</button>
}
