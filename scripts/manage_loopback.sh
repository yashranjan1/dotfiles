#!/bin/bash

# Check if an argument is passed
if [ -z "$1" ]; then
    echo "Usage: $0 <true|false>"
    exit 1
fi

# Execute based on the input
if [ "$1" == "true" ]; then
    echo "Loading v4l2loopback module..."
    sudo modprobe v4l2loopback

    if [ $? -eq 0 ]; then
        echo "v4l2loopback module loaded successfully."
    else
        echo "Failed to load v4l2loopback module."
    fi
elif [ "$1" == "false" ]; then
    echo "Removing v4l2loopback module..."
    sudo modprobe -r v4l2loopback

    if [ $? -eq 0 ]; then
        echo "v4l2loopback module removed successfully."
    else
        echo "Failed to remove v4l2loopback module."
    fi
else
    echo "Invalid input. Use 'true' to load or 'false' to remove the module."
    exit 1
fi
