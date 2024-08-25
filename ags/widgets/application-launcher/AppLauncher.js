import { Column } from "../../organisers/Column.js"
import { Row } from "../../organisers/Row.js"

const applications = await Service.import('applications')

export function AppLauncherWindow(monitor){

    const query = Variable("")    

    const appGrid = (monitor) => {
        return Widget.Scrollable({
            hscroll: 'never',
            vscroll: 'always',
            child: Widget.Box({
                children: [],
                vertical: true
                }).hook(query, self => {
                    let appList = []
                    let appRowList = []
                    applications.query(query.value).forEach(app => {
                        appRowList.push(
                            Widget.Button({
                                child: Widget.Box({
                                    children: [
                                        Widget.Icon({
                                            icon: app.icon_name,
                                            class_name: 'app-icon'
                                        }),
                                        Widget.Label({
                                            label: app.name,
                                            truncate: 'end',
                                            class_name: 'app-label'
                                        })
                                    ],
                                    
                                    hexpand: true,
                                }),
                                on_clicked: () => {
                                    app.launch()
                                    App.toggleWindow(`app_launcher${monitor}`)
                                },
                                class_name: 'app-button',
                                cursor: 'pointer'
                            })
                        )
                        if (appRowList.length == 3) {
                            let appRow = Widget.Box({
                                children: appRowList,
                                hexpand: true,
                                cursor: 'default'
                            })
                            appRowList = []
                            appList.push(appRow)
                        }
                    })
                    let filler =  Widget.Box({
                        hexpand: true,
                        class_name: 'app-filler'
                    })
                    appRowList.push(appRowList.length == 2 ? filler : filler, filler)
                    let appRow = Widget.Box({
                        children: appRowList,
                        hexpand: true
                    })
                    appList.push(appRow)
                    self.children = appList
            }),
            class_name: 'app-list'
        })
    }

    const entryField = (monitor) => {
        return Widget.Entry({
            class_name: 'input-field',
            text: '',
            hexpand: true,
            on_change: ({text})=>{
                query.setValue(text)
            }, 
            on_accept: ({text}) => {
                applications.query(text)[0].launch()
                App.toggleWindow(`app_launcher${monitor}`)
            }
        })
    }
    let window = Widget.Window({
        visible: false,
        monitor: monitor,
        name: `app_launcher${monitor}`,
        anchor: [],
        child: Column(
            [
                Row(
                    [

                    Widget.Icon({
                        icon: 'system-search-symbolic',
                        class_name: 'search-icon'
                    }),
                    Widget.Overlay({
                        child: entryField(monitor),
                        overlays: [
                            Widget.Label({
                                class_name: 'placeholder-text', // hack to change the positioning of the text
                                label: query.bind().as(text => text.length > 0 ? "" : "Applications" ),
                            })
                        ,]  
                    })
                    ],
                    0,
                    ''
                ),
                appGrid(monitor)
            ],
            10,
            'app-launcher',
        ),
        keymode: 'on-demand',
        class_name: 'launcher-window'
    })

    return window
}