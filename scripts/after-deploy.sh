#!/bin/bash
REPOSITORY=/home/ec2-user/catchmind

cd $REPOSITORY
cd dist
pm2 start server.js