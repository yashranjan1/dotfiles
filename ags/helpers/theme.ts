import { exec, writeFile } from "astal";
import { config, theme, themeOpts, wallpaper, wallpaperOpts } from "../variables/theme-variables";
import { App } from "astal/gtk3";

const changeWallpaper = ( path: string ) => {
    wallpaper.set(path)
    writeFile(`${SRC}/currentTheme.json`, JSON.stringify({ name: theme.get(), wallpaper: wallpaper.get() }))
    exec(`../scripts/run_swww.sh ${wallpaper.get()}`)
}

const changeTheme = ( num: number ) => {

    // set variables
    const oldIndex = themeOpts.get().indexOf(theme.get())

    let newIndex = (oldIndex + num) % themeOpts.get().length

    if (newIndex < 0) {
        newIndex = themeOpts.get().length - 1
    }
    
    theme.set(themeOpts.get()[newIndex])
    const colors = config.get().find(t => t.name === theme.get())?.colors

    // write theme.scss
    writeFile(`${SRC}/theme.scss`, 
        `$accent: ${colors?.accent};
$theme_fg_color: ${colors?.theme_fg_color};
$theme_bg_color: ${colors?.theme_bg_color};
$inactive-ws: ${colors?.inactiveWs};
$theme_alt_bg_color: ${colors?.theme_alt_bg_color};
$red: ${colors?.red};
$yellow: ${colors?.yellow};
$green: ${colors?.green};
$purple: ${colors?.purple};`
    )

    // apply theme.scss
    exec(["sass", "./style.scss", "/tmp/style.css"])
    App.reset_css()
    App.apply_css(`/tmp/style.css`)    

    // write currentTheme.json
    wallpaperOpts.set(config.get().find(t => t.name === theme.get())?.wallpapers as string[])

    changeWallpaper(wallpaperOpts.get()[0])

    // update wallpaper and rerun wal
    exec(`../scripts/run_swww.sh ${wallpaper.get()}`)
}

export { changeTheme, changeWallpaper }