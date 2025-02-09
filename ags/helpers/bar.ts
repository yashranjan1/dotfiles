import { writeFileAsync, execAsync } from "astal"
import { App } from "astal/gtk3"

export const splitBar = async (is_split: boolean) => {
    const fileName = is_split ? "split" : "connected"
    const css = `@import "${fileName}";`
    
    await writeFileAsync(`${SRC}/widget/Bar/style.scss`, css)
    await execAsync(["sass", "./style.scss", "/tmp/style.css"])
    App.reset_css()
    App.apply_css(`/tmp/style.css`)    
}
