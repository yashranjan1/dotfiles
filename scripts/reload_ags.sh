#!/bin/bash

# Close the AGS application
pkill agsv1

# Wait a moment to ensure the application has closed
sleep 1

# Reopen the AGS application
nohup agsv1 > /dev/null 2>&1 &

echo "AGS application has been restarted."
