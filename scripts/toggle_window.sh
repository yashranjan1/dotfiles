#!/bin/bash

# Check if the argument is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <WINDOW>"
    exit 1
fi

WINDOW=$1

# Run the hyprctl command and parse the monitor ID
MONITOR_ID=$(hyprctl activeworkspace | awk '/monitorID:/ {print $2}')

# Check if MONITOR_ID was successfully extracted
if [ -z "$MONITOR_ID" ]; then
    echo "Error: Unable to retrieve monitor ID."
    exit 1
fi

# Execute the ags request command
ags request "${WINDOW}-${MONITOR_ID}"
