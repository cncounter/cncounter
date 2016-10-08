#!/bin/sh
#by forrest
#This scripts to restart tomcat
#
#


/server/bin/shutdown_tomcat.sh 1>/dev/null
sleep 2 
/server/bin/startup_tomcat.sh  1>/dev/null
sleep 2
echo 
TOMCATPID=$(ps ax |grep '/server/tomcat/bin'| grep -v "grep" |wc -l)
if [ $TOMCATPID -gt 0 ]
then
    echo "#############Start Tomcat OK##############"
    echo "succesful restart tomcat at $(date +%F-%H-%M-%S)" >> /server/bin/noc_restart_tomcat.log
else
    echo "!!!!!!!!!!!!!FAILED, Restart TOMCAT!!!!!!!"
    echo "failed restart tomcat at $(date +%F-%H-%M-%S)" >> /server/bin/noc_restart_tomcat.log
fi
