#!/bin/sh -l

echo "Hello $1"
time=$(date)

#ls -al >> $GITHUB_ENV

node src/index.js

echo "{time}={$time}"

#echo "::set-output name=time::$time"
echo "{time}={xtime}" >> $GITHUB_OUTPUT