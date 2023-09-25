#!/bin/bash
REPOSITORY=/home/ubuntu/build

cd $REPOSITORY

sudo pm2 kill
npm i

# sudo /usr/bin/yarn db:pull # when use prisma
# sudo /usr/bin/yarn generate # when use prisma
# sudo /usr/bin/pm2 start build

# sudo pm2 start npm -- start
sudo pm2 start server.js