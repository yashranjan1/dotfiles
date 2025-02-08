#!/bin/bash

# Define the base directory
BASE_DIR="/home/yash/.config/theme"

# Start the JSON array
echo "["

# Iterate over the themes inside the "theme" folder
FIRST_THEME=true
for THEME in "$BASE_DIR"/*; do
    if [ -d "$THEME" ]; then
        THEME_NAME=$(basename "$THEME")

        # Find the wallpaper file inside the theme directory (could be any extension like .png, .jpg, etc.)
        WALLPAPER_FILE=""
        for FILE in "$THEME"/*; do
            if [[ "$FILE" =~ \.(jpg|png|jpeg|gif|bmp)$ ]]; then
                WALLPAPER_FILE="/home/yash/.config/theme/$THEME_NAME/$(basename "$FILE")"
                break  # Stop after finding the first wallpaper
            fi
        done

        # If it's not the first theme, add a comma before the next object
        if [ "$FIRST_THEME" = false ]; then
            echo ","
        else
            FIRST_THEME=false
        fi

        # Start the JSON object for this theme
        echo "  {"
        echo "    \"name\": \"$THEME_NAME\","
        echo "    \"wallpaper\": \"$WALLPAPER_FILE\","
        echo "    \"colors\": {"

        # Add colors from the Colors directory
        COLOR_PATH="$THEME/Colors"
        FIRST_COLOR=true
        for COLOR_FILE in "$COLOR_PATH"/*; do
            if [ -f "$COLOR_FILE" ]; then
                COLOR_NAME=$(basename "$COLOR_FILE" | cut -d '.' -f 1)
                COLOR_VALUE=$(basename "$COLOR_FILE" | cut -d '.' -f 2)

                # Add a comma for multiple colors
                if [ "$FIRST_COLOR" = false ]; then
                    echo ","
                else
                    FIRST_COLOR=false
                fi

                echo -n "      \"$COLOR_NAME\": \"$COLOR_VALUE\""
            fi
        done

        # Close the colors object
        echo
        echo "    }"
        echo -n "  }"
    fi
done

# Close the JSON array
echo
echo "]"

