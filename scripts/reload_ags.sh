#!/bin/bash

# Close the AGS application
ags quit

# Wait a moment to ensure the application has closed
sleep 0.5

# Reopen the AGS application
nohup ags run

echo "AGS application has been restarted."
