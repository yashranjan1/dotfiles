#!/bin/bash

# Close the AGS application
pkill ags

# Wait a moment to ensure the application has closed
sleep 1

# Reopen the AGS application
nohup ags > /dev/null 2>&1 &

echo "AGS application has been restarted."
