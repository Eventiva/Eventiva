#!/bin/bash

# arguments to the script
WSDIR="$1"
BIT_VERSION="0.2.8" # Leave empty for latest version

# install bvm and bit
npm i -g @teambit/bvm
bvm install ${BIT_VERSION} --use-system-node
export PATH="${HOME}/bin:${PATH}" # This step may change depending on your CI runner

# change to working directory before running bit install
cd ${WSDIR}
bit install
