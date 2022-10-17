#!/bin/sh -l

echo "Hello $1"
pwd
ls -al
time=$(date)
find src/

#ls -al >> $GITHUB_ENV

## See https://github.com/actions/runner/issues/2033
git config --global --add safe.directory $GITHUB_WORKSPACE

echo "gitlog in entrypoint">> $GITHUB_OUTPUT
git log -C $GITHUB_WORKSPACE --no-merges --pretty=format:\'%h,"%f","%aN",%aE,%aI\'
echo "done [gitlog in entrypoint"]>> $GITHUB_OUTPUT

node /avalia/src/index.js

ls -al
find output
mkdir -p $GITHUB_WORKSPACE/metrics
# cp /avalia/src/output/* $GITHUB_WORKSPACE/metrics/

#echo "{time}={$time}"

echo "::set-output name=time::$time"
#echo "{time}={time}" >> $GITHUB_OUTPUT