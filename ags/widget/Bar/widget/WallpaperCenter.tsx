import { bind } from "astal";
import { MenuInput } from "../../../types/menuInput";


export default function WallpaperCenter({ monitor, state }: MenuInput) {

    return (
        <button 
            className={bind(state).as(s => s === `wallpaper-center-${monitor}` ? "bg-active control-center-btn" : "control-center-btn")}
            onClick={() => {
                if (state.get() === `wallpaper-center-${monitor}`) {
                    state.set("none")
                }
                else {
                    state.set(`wallpaper-center-${monitor}`)
                }
            }}
        >
            <icon icon="preferences-desktop-wallpaper-symbolic" />
        </button>
    )
}