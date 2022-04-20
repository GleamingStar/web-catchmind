#!/bin/bash
REPOSITORY=/home/ec2-user

cd $REPOSITORY
pm2 stop all
rm -rf catchmind