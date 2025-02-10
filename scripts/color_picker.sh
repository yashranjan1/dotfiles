#!/bin/bash

# Run HyprPicker and capture the selected color
COLOR=$(hyprpicker -a)

# Send a notification with the selected color
notify-send -a "HyprPicker" "Color added to clipboard" "Your color has been selected and added to your clipboard" -i ~/.config/ags/icons/hyprland.svg
