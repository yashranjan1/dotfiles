export const Column = (items=[], space=0, class_name) => {
    return Widget.Box({
        vertical: true,
        children: items,
        spacing: space,
        class_name: class_name
    })
}
