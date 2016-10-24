#!/bin/sh
 
cd /var/lib/jenkins/workspace/myWeather2
git pull
npm install --production
forever restartall
exit
