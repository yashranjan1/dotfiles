import { Row } from '../../../organisers/Row.js'
import { theme } from '../../../variables/Theming.js'

function cssVarGenerator(name, value){
    return `@define-color ${name} ${value};\n`
}

export const DarkModeToggle = () => {
    return Widget.Button({
        on_clicked: () => {
            theme.setValue(theme.value == 'dark' ? 'light' : 'dark')
            const themeOutputJSON = {
                "theme": theme.value
            }
    
            let themeOutputCSS = cssVarGenerator('fg', theme.value == 'dark' ? '#fff' : '#000') + 
            cssVarGenerator('bg', theme.value == 'dark' ? '#000' : '#fff') + 
            cssVarGenerator('alt-bg', theme.value == 'dark' ? '#151515' : '#adadad') + 
            cssVarGenerator('inactive-ws', theme.value == 'dark' ? '#adadad' : '#151515')
            
            Utils.writeFileSync(JSON.stringify(themeOutputJSON), '/home/yash/.config/ags/variables.json')
            Utils.writeFileSync(themeOutputCSS, '/home/yash/.config/ags/theme.css')

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