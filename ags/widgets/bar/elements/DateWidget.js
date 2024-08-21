export const DateWidget = () => {
    return Widget.Label({
        class_name: 'date'
    })
    .poll(1000, label => label.label = Utils.exec('date +"%H:%M - %a %d %B %Y"'))
}
