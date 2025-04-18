#!/bin/bash

DB_FILE="db.db"

# Check if db.db exists
if [ -e "$DB_FILE" ]; then
    if [ -d "$DB_FILE" ]; then
        echo "A directory which has the name '$DB_FILE' exists. Please remove it to proceed."
        exit 1
    else
        echo "'$DB_FILE' already exists as a file."
        exit 0
    fi
fi

# Check if sqlite3 is installed
if ! command -v sqlite3 &> /dev/null; then
    echo "sqlite3 is not currently installed. First you need to install it to proceed."
    exit 1
fi

# Create empty database
sqlite3 "$DB_FILE" ".databases"

if [ -f "$DB_FILE" ]; then
    echo "SQLite database '$DB_FILE' created successfully."
else
    echo "Failed to create '$DB_FILE'."
    exit 1
fi
