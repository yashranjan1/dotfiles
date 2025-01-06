import { bind } from "astal"
import { Astal, Gtk } from "astal/gtk3"
import Mpris from "gi://AstalMpris"

function lengthStr(length: number) {
    const min = Math.floor(length / 60)
    const sec = Math.floor(length % 60)
    const sec0 = sec < 10 ? "0" : ""
    return `${min}:${sec0}${sec}`
}

function MediaPlayer({ player }: { player: Mpris.Player }) {

    const title = bind(player, "title").as(t =>
        t || "Unknown Track")

    const artist = bind(player, "artist").as(a =>
        a || "Unknown Artist")
    
    const coverArt = bind(player, "coverArt").as(c =>
        `background-image: url('${c}')`)

    const position = bind(player, "position").as(p => player.length > 0
        ? p / player.length : 0)

    const playerIcon = bind(player, "entry").as(e => {
        return "audio-x-generic-symbolic"
        }
    )
    const playIcon = bind(player, "playbackStatus").as(s =>
        s === Mpris.PlaybackStatus.PLAYING
            ? "media-playback-pause-symbolic"
            : "media-playback-start-symbolic"
    )


    return (
        <box spacing={10} expand={true} className="mpris-player">
            <box>
                <box className="cover-art" css={coverArt} />
            </box>
            <box vertical hexpand={true}>
                <box className="title">
                    <label truncate hexpand halign={Gtk.Align.START} label={title} />
                    <icon icon={playerIcon} halign={Gtk.Align.END} css={"margin-left: 20px;"} />
                </box>
            <label halign={Gtk.Align.START} valign={Gtk.Align.START} vexpand wrap label={artist} />
            <slider
                visible={bind(player, "length").as(l => l > 0)}
                onDragged={({ value }) => player.position = value * player.length}
                value={position}
                className={"music-slider"}
            />
            
            <centerbox className="actions">
                <label
                    hexpand
                    className="position"
                    halign={Gtk.Align.START}
                    visible={bind(player, "length").as(l => l > 0)}
                    label={bind(player, "position").as(lengthStr)}
                />
                <box spacing={10}>
                    <button
                        onClicked={() => player.previous()}
                        visible={bind(player, "canGoPrevious")}>
                        <icon icon="media-skip-backward-symbolic" />
                    </button>
                    <button
                        onClicked={() => player.play_pause()}
                        visible={bind(player, "canControl")}>
                        <icon icon={playIcon} />
                    </button>
                    <button
                        onClicked={() => player.next()}
                        visible={bind(player, "canGoNext")}>
                        <icon icon="media-skip-forward-symbolic" />
                    </button>
                </box>
                <label
                    className="length"
                    hexpand
                    halign={Gtk.Align.END}
                    visible={bind(player, "length").as(l => l > 0)}
                    label={bind(player, "length").as(l => l > 0 ? lengthStr(l) : "0:00")}
                />
            </centerbox>
            </box>
        </box>
    )
}

export default function MprisPlayers() {
    const mpris = Mpris.get_default()
    return <box vertical>
        {bind(mpris, "players").as(arr => arr.map(player => (
            <MediaPlayer player={player} />
        )))}
    </box>
}