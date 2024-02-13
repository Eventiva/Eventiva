#!/bin/bash

# This script initializes Bit in the workspace directory. It installs the Bit Version Manager (BVM),
# installs a specific version of Bit (or the latest version if no version is specified),
# and then runs `bit install` in the workspace directory.
# The script takes a single argument `WSDIR` which is the workspace directory where Bit should be installed.

# arguments to the script
WSDIR="$1"
BIT_VERSION="" # Leave empty for latest version

# install bvm and bit
npm i -g @teambit/bvm
bvm install ${BIT_VERSION} --use-system-node
export PATH="${HOME}/bin:${PATH}" # This step may change depending on your CI runner

# change to working directory before running bit install
cd ${WSDIR}
bit install
