#!/bin/bash

# Check if a path is provided as an argument
if [ -z "$1" ]; then
    echo "Usage: $0 <path>"
    exit 1
fi

# Assign the provided path to a variable
path="$1"

# Overwrite ~/.config/hypr/options.conf with the new wallpaper path
config_file="$HOME/.config/hypr/options.conf"
echo "\$wp = $path" >"$config_file"
# Set the colorscheme using wal
wal -i "$path"

# Execute the command with the given path
swww img "$path" --transition-type wipe --transition-fps 90 --transition-step 30
