#!/bin/bash

# Get the currently playing song and artist from MPRIS players (VLC, Rhythmbox, etc.)
current_song=$(playerctl metadata title)
current_artist=$(playerctl metadata artist)

# Display the song and artist
echo "Currently Playing: $current_song - $current_artist"
