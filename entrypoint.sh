#!/bin/sh -l

## See https://github.com/actions/runner/issues/2033
git config --global --add safe.directory $GITHUB_WORKSPACE
git config user.email "dxhub@avalia.systems"
git config user.name "Avalia DX Hub"

node /avalia/src/index.js

git add .
git commit -m "Update software metrics"
git push 
