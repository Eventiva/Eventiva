#!/bin/bash

# argument to the script
WSDIR="$1"

# change to working directory before running the commands
cd ${WSDIR}

# run the commands
bit tag -m "CI" --build

# for soft tagging workflow use
# bit tag -m "CI" --build --persist

bit export
