import { Row } from '../../../organisers/Row.js'
import { accent, theme, colorValues, accentColors } from '../../../variables/Theming.js'
import { cssVarGenerator } from '../../../variables/HelperFunctions.js'
import { currentWallpaper } from "../../../variables/Wallpapers.js"

export const DarkModeToggle = () => {

    const black = '#000000'
    const blackBlur = 'rgba(0, 0, 0, 0.8)'
    const white = '#ffffff'
    const whiteBlur = 'rgba(255, 255, 255, 0.61)'

    const darkGray = '#151515'
    const darkGrayBlur = 'rgba(255, 255, 255, 0.1)'
    const lightGray = '#adadad'
    const lightGrayBlur = 'rgba(0, 0, 0, 0.2)'

    return Widget.Button({
        on_clicked: () => {
            theme.setValue(theme.value == 'dark' ? 'light' : 'dark')
            const themeOutputJSON = {
                "theme": theme.value,
                "color": accent.value,
                "wallpaper": currentWallpaper.value
            }


            let themeOutputCSS = cssVarGenerator('fg', theme.value == 'dark' ? white : black) +
                cssVarGenerator('fg-complement', theme.value == 'dark' ? black : white) +
                cssVarGenerator('bg', theme.value == 'dark' ? blackBlur : whiteBlur) +
                cssVarGenerator('alt-bg', theme.value == 'dark' ? darkGrayBlur : lightGrayBlur) +
                cssVarGenerator('inactive-ws', theme.value == 'dark' ? lightGray : darkGray)

            const colorCode = colorValues.value[accentColors.value[accent.value]][theme.value]
            const accentOutputCSS = cssVarGenerator('accent', colorCode)

            Utils.writeFileSync(JSON.stringify(themeOutputJSON), '.config/ags/variables.json')
            Utils.writeFileSync(themeOutputCSS, '.config/ags/theme.css')
            Utils.writeFileSync(accentOutputCSS, '.config/ags/accent.css')

            App.applyCss('.config/ags/styles.css', true)
        },
        child: Row(
            [
                Widget.Icon({
                    icon: "",
                }).hook(theme, self => {
                    self.icon = theme.value == 'dark' ? 'weather-clear-night-symbolic' : 'weather-clear-symbolic'
                }),
                Widget.Label({
                    label: ""
                }).hook(theme, self => {
                    self.label = theme.value == 'dark' ? 'Dark' : 'Light'
                }),
            ],
            6,
            ''
        ),
        hexpand: true,
        class_name: 'shortcut-menu-item',
        cursor: 'pointer'
    })
}
