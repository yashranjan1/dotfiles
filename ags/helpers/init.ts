
import { readFile } from "astal"
import { config, theme, themeOpts, wallpaper, wallpaperOpts } from "../variables/theme-variables"

const readCurrentTheme = () => {
    const data =  readFile(`${SRC}/currentTheme.json`)
   
    const parsed: { name: string, wallpaper: string } = JSON.parse(data)
    theme.set(parsed.name)
    wallpaper.set(parsed.wallpaper)
}

const readConfig = () => {
    const data = readFile(`${SRC}/themes.json`)

    const parsed: Array<Config> = JSON.parse(data)
    config.set(parsed)

    themeOpts.set(parsed.map(t => t.name))
    wallpaperOpts.set(parsed.filter(t => t.name === theme.get())[0].wallpapers)

    console.log(theme, wallpaperOpts)
}

export { readCurrentTheme, readConfig }