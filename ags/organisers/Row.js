export const Row = (items=[], space=0, class_name='') => {
    return Widget.Box({
        children: items,
        spacing: space,
        class_name: class_name
    })
}
