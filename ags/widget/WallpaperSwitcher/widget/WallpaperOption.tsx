import { bind } from "astal";
import { wallpaper } from "../../../variables/theme-variables";

export default function WallpaperOption({ path, onClick }: { path: string, onClick: (path: string) => void }) {


    return (
        <button
            onClick={()=>onClick(path)}
            className={bind(wallpaper).as(p => p === path ? "wallpaper-option-btn-active" : "wallpaper-option-btn")}
        >
            <box 
                css={`background-image: url('${path}')`}
                className="wallpaper-option"
            >

            </box>
        </button>
    )
}