#!/bin/sh -l

echo "Hello $1"
time=$(date)
#echo "::set-output name=time::$time"

#ls -al >> $GITHUB_ENV

echo "{time}={$time}"

echo "{time}={xtime}" >> $GITHUB_OUTPUT