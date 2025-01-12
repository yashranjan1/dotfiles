#!/bin/bash

# Define the base directory
BASE_DIR="/home/yash/.config/theme"

# Start the JSON array
echo "["

# Iterate over the themes inside the "theme" folder
for THEME in "$BASE_DIR"/*; do
    if [ -d "$THEME" ]; then
        THEME_NAME=$(basename "$THEME")

        # Start the JSON object for this theme
        echo "    {"
        echo "        \"name\": \"$THEME_NAME\","

        # Add wallpapers
        echo "        \"wallpapers\": ["
        WALLPAPER_PATH="$THEME/Wallpapers"
        WALLPAPERS=()
        for WALLPAPER in "$WALLPAPER_PATH"/*; do
            WALLPAPER_NAME=$(basename "$WALLPAPER")
            FULL_WALLPAPER_PATH="/home/yash/.config/theme/$THEME_NAME/Wallpapers/$WALLPAPER_NAME"
            WALLPAPERS+=("\"$FULL_WALLPAPER_PATH\"")
        done
        echo "            $(
            IFS=,
            echo "${WALLPAPERS[*]}"
        )"
        echo "        ],"

        # Add colors
        echo "        \"colors\": {"
        COLOR_PATH="$THEME/Colors"
        COLORS=()
        for COLOR_FILE in "$COLOR_PATH"/*; do
            COLOR_NAME=$(basename "$COLOR_FILE" | cut -d '.' -f 1)
            COLOR_VALUE=$(basename "$COLOR_FILE" | cut -d '.' -f 2)
            COLORS+=("\"$COLOR_NAME\": \"$COLOR_VALUE\"")
        done
        echo "            $(
            IFS=,
            echo "${COLORS[*]}"
        )"
        echo "        }"

        # Close the JSON object for this theme
        echo "    },"
    fi
done | sed '$s/,$//' # Remove trailing comma from the last theme

# Close the JSON array
echo "]"
