export const DateWidget = (monitor) => {
    return Widget.Button({
        child:  Widget.Label({
            class_name: 'date'
        })
        .poll(1000, label => label.label = Utils.exec('date +"%-l:%M %p"')),
        class_name: 'date-button',
        cursor: 'pointer',
        on_clicked: () => {
            App.toggleWindow(`calendar${monitor}`)
        }
    })
}
