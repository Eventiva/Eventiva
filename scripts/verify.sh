#!/bin/bash

# argument to the script
WSDIR="$1"

# change to working directory before running the commands
cd ${WSDIR}

# run the commands
bit status --strict
bit build
