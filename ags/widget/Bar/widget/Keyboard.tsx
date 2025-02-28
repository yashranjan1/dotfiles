import { bind, Variable } from "astal"

export default function KeyBoardLayout() {
    const name = Variable("").poll(1000, 'fcitx5-remote', (out, _) => out)

    return <box
        className={"control-center-btn"}
    >
        <box className={"kb-layout"}>
            <label label={bind(name).as(state => state === "1" ? 'A' : 'あ')} />
        </box>
    </box>
}
