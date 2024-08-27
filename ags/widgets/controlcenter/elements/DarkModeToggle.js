import { Row } from '../../../organisers/Row.js'
import { accent, theme, colorValues, accentColors } from '../../../variables/Theming.js'
import { cssVarGenerator } from '../../../variables/HelperFunctions.js'


export const DarkModeToggle = () => {
    return Widget.Button({
        on_clicked: () => {
            theme.setValue(theme.value == 'dark' ? 'light' : 'dark')
            const themeOutputJSON = {
                "theme": theme.value,
                "color": accent.value
            }
    
            let themeOutputCSS = cssVarGenerator('fg', theme.value == 'dark' ? '#fff' : '#000') + 
            cssVarGenerator('bg', theme.value == 'dark' ? '#000' : '#fff') + 
            cssVarGenerator('alt-bg', theme.value == 'dark' ? '#151515' : '#adadad') + 
            cssVarGenerator('inactive-ws', theme.value == 'dark' ? '#adadad' : '#151515')

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