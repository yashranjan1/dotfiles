import { cssVarGenerator } from "../../../variables/HelperFunctions.js"
import { accent, accentColors, colorValues, theme} from "../../../variables/Theming.js"

export const AccentChanger = () => {
    return Widget.Box({
        children: [
            Widget.Button({
                    child: Widget.Icon('pan-start-symbolic'),
                    class_name: 'accent-icon',
                    on_clicked: () => {
                        let newValue = accent.value - 1
                        if (newValue < 0) newValue += accentColors.value.length
                        accent.setValue((newValue) % accentColors.value.length)


                        const themeOutputJSON = {
                            "theme": theme.value,
                            "color": accent.value
                        }
    

                        const colorCode = colorValues.value[accentColors.value[accent.value]][theme.value]

                        const accentOutputCSS = cssVarGenerator('accent', colorCode)

                        Utils.writeFileSync(JSON.stringify(themeOutputJSON), '.config/ags/variables.json')
                        Utils.writeFileSync(accentOutputCSS, '.config/ags/accent.css')

                        App.applyCss('.config/ags/styles.css', true)
                        
                    }
                }),
                Widget.Label({
                    label: '',
                    hexpand: true,
                    class_name: 'accent-label',
                    truncate: 'end'
                }).hook(accent, self => {
                    self.label = accentColors.value[accent.value]
                }),
                Widget.Button({
                    child: Widget.Icon('pan-end-symbolic'),
                    class_name: 'accent-icon',
                    on_clicked: () => {
                        accent.setValue((accent.value + 1) % accentColors.value.length)
                        
                        const themeOutputJSON = {
                            "theme": theme.value,
                            "color": accent.value
                        }

                        const colorCode = colorValues.value[accentColors.value[accent.value]][theme.value]
                        const accentOutputCSS = cssVarGenerator('accent', colorCode)

                        Utils.writeFileSync(JSON.stringify(themeOutputJSON), '.config/ags/variables.json')
                        Utils.writeFileSync(accentOutputCSS, '.config/ags/accent.css')

                        App.applyCss('.config/ags/styles.css', true)
                    }
                }),
        ],
        hexpand: true,
        class_name: 'shortcut-menu-item'
    })
}