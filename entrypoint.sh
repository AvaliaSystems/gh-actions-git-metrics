#!/bin/sh -l

echo "Hello $1"
pwd
ls -al
ls -al ..
time=$(date)
find src/

ls -al >> $GITHUB_ENV

node /avalia/src/index.js

echo "{time}={$time}"

#echo "::set-output name=time::$time"
echo "{time}={xtime}" >> $GITHUB_OUTPUT