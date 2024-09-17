const notifs = await Service.import('notifications')


export const NotificationsPanel = () => {
    const list = Widget.Box({
        vertical: true,
        children: []
    })
    list.hook(notifs, (_, notifId) => {
        const notification = notifs.getNotification(notifId)
    }, "notified")
    return Widget.Window({
        monitor: 0,
        visible: false,
        margins: [60, 20, 0, 0],
        anchor: ['top', 'right'],
        child: Widget.Box({
            children: [],
            class_name: 'notifs-panel'
        }),
        class_name: 'notifs-window',
        name: 'notifications-panel'
    })
}
