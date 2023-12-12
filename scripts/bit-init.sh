#!/bin/bash
# This script is used for initializing Bit and updating the system path.
# It sets up the Bit environment for a given workspace.

# arguments to the script
WSDIR="$1"
BIT_VERSION="" # Leave empty for latest version

# install bvm and bit
# Installs the Bit version manager globally.
npm i -g @teambit/bvm
# Installs a specific version of Bit using the system's Node.js.
bvm install ${BIT_VERSION} --use-system-node
# Updates the system path to include the Bit binary.
export PATH="${HOME}/bin:${PATH}" # This step may change depending on your CI runner

# change to working directory before running bit install
# Changes the current directory to the working directory before running Bit install.
cd ${WSDIR}
bit install
