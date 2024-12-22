import { bind } from "astal";
import { MenuInput } from "../../../types/menuInput";


export default function PowerMenu({ monitor, state }: MenuInput) {

    return (
        <button 
            className={bind(state).as(s => s === `power-menu-${monitor}` ? "bg-active control-center-btn" : "control-center-btn")}
            onClick={() => {
                if (state.get() === `power-menu-${monitor}`) {
                    state.set("none")
                }
                else {
                    state.set(`power-menu-${monitor}`)
                }
            }}
        >
            <icon icon="system-shutdown-symbolic" />
        </button>
    )
}