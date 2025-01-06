export function CalendarWindow(monitor) {
    const Calendar = () => {
        return Widget.Box({
            child: Widget.Calendar({
                showDayNames: true,
                showHeading: true,
                hpack: 'center',
                class_name: 'calendar'
            }),
            class_name: 'calendar-box'
        })
    }

    return Widget.Window({
        visible: false,
        child: Widget.Box({
            child: Calendar(),
            class_name: 'calendar-container'
        }),
        name: `calendar${monitor}`,
        monitor: monitor,
        anchor: ['top'],
        margins: [50, 0, 0, 0],
        class_name: 'calendar-window'
    })
}
