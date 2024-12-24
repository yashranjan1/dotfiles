import { Variable } from "astal"

export const theme = Variable<string>("")
export const wallpaper = Variable<string>("")

export const config = Variable<Array<Config>>([])
export const themeOpts = Variable<Array<string>>([])
export const wallpaperOpts = Variable<Array<string>>([])
