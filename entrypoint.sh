#!/bin/sh -l

## See https://github.com/actions/runner/issues/2033
git config --global --add safe.directory $GITHUB_WORKSPACE

node /avalia/src/index.js
