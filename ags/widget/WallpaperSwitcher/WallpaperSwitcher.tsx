import { bind } from "astal";
import { WindowCustomProps } from "../../types/windowCustomProps";
import { Astal } from "astal/gtk3";
import { wallpaperOpts } from "../../variables/theme-variables";
import WallpaperOption from "./widget/WallpaperOption";
import { changeWallpaper } from "../../helpers/theme";

export default function WallpaperSwitcher({ gdkmonitor, menuState }: WindowCustomProps) {

    const onClick = (path: string) => {
       changeWallpaper(path)
    }

    return (
        <window
            className="WallpaperSwitcher"
            name={`wallpaper-switcher-${gdkmonitor.get_model()}`}
            gdkmonitor={gdkmonitor}
            exclusivity={Astal.Exclusivity.NORMAL}
            anchor={Astal.WindowAnchor.TOP |
                Astal.WindowAnchor.RIGHT}
            visible={bind(menuState).as(s => s === `wallpaper-center-${gdkmonitor.get_model()}` ? true : false)}
        >
                <box className="wallpaper-switcher-box shadow" vexpand>
                    <scrollable heightRequest={450} minContentWidth={300} className={"scrollable"}>
                        <box vertical spacing={10} >
                            {bind(wallpaperOpts).as(opts => opts.map(opt => (
                                <WallpaperOption path={opt} onClick={onClick} />
                            )))}
                        </box>
                    </scrollable>
                </box>
        </window>
    )
}