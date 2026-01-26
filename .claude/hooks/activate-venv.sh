#!/bin/bash

# Activate Python virtual environment on session start
# This hook runs when Claude Code session starts in the chrono project

VENV_PATH="$(dirname "$0")/../../backend/venv"

# Check if venv exists
if [ -d "$VENV_PATH" ]; then
    # Windows uses Scripts/activate, Unix uses bin/activate
    if [ -f "$VENV_PATH/Scripts/activate" ]; then
        ACTIVATE_SCRIPT="$VENV_PATH/Scripts/activate"
    elif [ -f "$VENV_PATH/bin/activate" ]; then
        ACTIVATE_SCRIPT="$VENV_PATH/bin/activate"
    else
        echo "Warning: Could not find venv activation script"
        exit 0
    fi

    # If CLAUDE_ENV_FILE is set, capture env changes for persistence
    if [ -n "$CLAUDE_ENV_FILE" ]; then
        ENV_BEFORE=$(export -p | sort)
        source "$ACTIVATE_SCRIPT"
        ENV_AFTER=$(export -p | sort)

        # Write only new/changed environment variables
        comm -13 <(echo "$ENV_BEFORE") <(echo "$ENV_AFTER") >> "$CLAUDE_ENV_FILE"
        echo "Virtual environment activated: $VENV_PATH"
    else
        source "$ACTIVATE_SCRIPT"
        echo "Virtual environment activated: $VENV_PATH"
    fi
fi

exit 0
