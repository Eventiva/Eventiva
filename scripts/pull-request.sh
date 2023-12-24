#!/bin/bash

# arguments to the script
ORG="$1"
SCOPE="$2"
LANE="$3"
WSDIR="$4"

# change to working directory before running the remaining commands
cd ${WSDIR}

bit status --strict
bit lane create ${LANE}
bit snap -m "CI" --build

# try to remove the bit lane
bit lane remove ${ORG}.${SCOPE}/${LANE} --remote --silent 2>/dev/null
if [ $? -ne 0 ]; then
	echo "Error while removing bit lane. Lane may not exist"
fi

bit export
