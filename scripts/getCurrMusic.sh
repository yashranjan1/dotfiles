#!/bin/bash

# Get the currently playing song and artist from MPRIS players (VLC, Rhythmbox, etc.)
current_song=$(playerctl metadata title 2>/dev/null)
current_artist=$(playerctl metadata artist 2>/dev/null)

# Check if both song and artist are not empty
if [[ -n "$current_song" && -n "$current_artist" ]]; then
    # Display the song and artist
    echo "$current_song - $current_artist"
fi
