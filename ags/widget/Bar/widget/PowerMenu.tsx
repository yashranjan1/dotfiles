import { bind } from "astal";
import { MenuInput } from "../../../types/menuInput";


export default function PowerMenu({ monitor, state }: MenuInput) {

    return (
        <button 
            className={bind(state).as(s => s === `power-menu-button-${monitor}` ? "control-center-btn bar-item-active" : "control-center-btn")}
            onClick={() => {
                if (state.get() === `power-menu-button-${monitor}`) {
                    state.set("none")
                }
                else {
                    state.set(`power-menu-button-${monitor}`)
                }
            }}
        >
            <icon icon="system-shutdown-symbolic" />
        </button>
    )
}
