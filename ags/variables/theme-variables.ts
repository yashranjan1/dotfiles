import { Variable } from "astal"

export const theme = Variable<string>("")

export const split = Variable<boolean>(false)

export const config = Variable<Array<Config>>([])
export const themeOpts = Variable<Array<string>>([])
