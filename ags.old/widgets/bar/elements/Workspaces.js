const hyprland = await Service.import("hyprland")

export const Workspaces = () => {
    const activeId = hyprland.active.workspace.bind("id")
    const workspaces = hyprland.bind("workspaces")
        .as(ws => ws.map(({ id }) => Widget.Box({
            child: Widget.Button({
                on_clicked: () => hyprland.messageAsync(`dispatch workspace ${id}`),
                class_name: activeId.as(i => `${i === id ? "focused" : "not-focused"}`),
                name: "workspace-tabs",
            }),
            class_name: 'workspace-container',
            name: activeId.as(i => `${i === id ? "focused" : "not-focused"}`),         
        })))

    return Widget.Box({
        class_name: "workspaces",
        children: workspaces,
    })
}