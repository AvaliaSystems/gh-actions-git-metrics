#!/bin/sh -l

echo "Hello $1"
pwd
ls -al
ls -al ..
time=$(date)
find src/

ls -al >> $GITHUB_ENV

node /avalia/src/index.js
mkdir -p $GITHUB_WORKSPACE/metrics
cp /avalia/src/output/* $GITHUB_WORKSPACE/metrics/

echo "{time}={$time}"

#echo "::set-output name=time::$time"
#echo "{time}={time}" >> $GITHUB_OUTPUT