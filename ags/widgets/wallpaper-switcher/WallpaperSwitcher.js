import { currentWallpaper, wallpaperOptions } from "../../variables/Wallpapers.js"
import { theme, accent } from "../../variables/Theming.js"

export function WallpaperSwitcherWindow(monitor) {

    const wpOptionBox = (wp) => {
        const [name, path] = wp
        return Widget.Button({
            name: `wp-option${name}${monitor}`,
            child: Widget.Box({
                vertical: true,
                children: [
                    Widget.Box({
                        css: `background-image: url('${path}')`,
                        class_name: 'wallpaper-thumbnail'
                    }),
                    Widget.Label({
                        label: name,
                        class_name: 'wallpaper-label'
                    }).hook(currentWallpaper, self => {
                        currentWallpaper.value == name ? self.toggleClassName("active-label", true) : self.toggleClassName("active-label", false)
                    })

                ],
            }),
            on_clicked: () => {
                if (name != currentWallpaper.value) {
                    currentWallpaper.setValue(name)

                    const themeOutputJSON = {
                        "theme": theme.value,
                        "color": accent.value,
                        "wallpaper": name
                    }

                    Utils.writeFileSync(JSON.stringify(themeOutputJSON), '.config/ags/variables.json')

                    Utils.exec(`swww img ${path} --transition-type center --transition-fps 90 --transition-step 30`)
                    Utils.exec(`wal -i ${path}`)
                    Utils.writeFileSync(`$wp = ~/${path}`, '.config/hypr/options.conf')

                }

            },
            class_names: ['button', 'wallpaper-option'],
            cursor: 'pointer',
        }).hook(currentWallpaper, self => {
            currentWallpaper.value == name ? self.toggleClassName("active-wp", true) : self.toggleClassName("active-wp", false)
        })

    }

    const wallpaperSwitcher = () => {
        let optionRow = []
        let optionCol = []

        const wpList = Object.entries(wallpaperOptions.value)

        wpList.forEach(wp => {
            optionRow.push(wpOptionBox(wp))
            if (optionRow.length == 3) {
                let optionRowWidget = Widget.Box({
                    children: optionRow
                })
                optionCol.push(optionRowWidget)
                optionRow = []
            }
        })
        if (optionRow.length > 0) {
            let optionRowWidget = Widget.Box({
                children: optionRow
            })
            optionCol.push(optionRowWidget)
            optionRow = []
        }

        return Widget.Box({
            class_name: 'wallpaper-switcher',
            child: Widget.Box({
                vertical: true,
                children: optionCol
            })
        })
    }

    return Widget.Window({
        monitor: monitor,
        anchor: ['top', 'right'],
        margins: [40, 0, 0, 0],
        child: wallpaperSwitcher(),
        name: `wallpaper_switcher${monitor}`,
        class_name: 'wallpaper-menu-window',
        visible: false
    })
}
