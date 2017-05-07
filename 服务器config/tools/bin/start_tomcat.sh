#!/bin/bash
source /etc/profile

export CATALINA_HOME=/home/data/tomcat

if echo $1 | grep -q "/home/data/www"
then
    export CATALINA_BASE=${1%/}
else
    export CATALINA_BASE=/home/data/www/${1%/}
fi

instance=`ls /home/data/www/ | head -1`;

if ! [ -e $CATALINA_BASE/conf/server.xml ]
then
    echo -e " usage: $0 /home/data/www/$instance\n"
    exit 1;
fi


if [ -r "$CATALINA_BASE"/startenv.sh ]; then
  . "$CATALINA_BASE"/startenv.sh
fi

TOMCAT_ID=`ps aux |grep "java"|grep "Dcatalina.base=$CATALINA_BASE"|grep -v "grep"|awk '{ print $2}'`


if [ -n "$TOMCAT_ID" ] ; then
    echo "tomcat(${TOMCAT_ITOMCAT_ID}) still running now , please shutdown it firest";
    exit 2;
fi

TOMCAT_START_LOG=`$CATALINA_HOME/bin/startup.sh`


if [ "$?" = "0" ]; then
    echo "$0 ${1%/} start succeed"
else
    echo "$0 ${1%/} start failed"
    echo $TOMCAT_START_LOG
fi
