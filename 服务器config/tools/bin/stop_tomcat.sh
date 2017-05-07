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


TOMCAT_ID=`ps aux |grep "java"|grep "[D]catalina.base=$CATALINA_BASE "|awk '{ print $2}'`


if [ -n "$TOMCAT_ID" ] ; then
    TOMCAT_STOP_LOG=`$CATALINA_HOME/bin/shutdown.sh`
else
    echo "Tomcat instance not found : ${1%/}"
    exit

fi



for i in {1..10}; do


    TOMCAT_ID=`ps aux |grep "java"|grep "Dcatalina.base=$CATALINA_BASE "|grep -v "grep"|awk '{ print $2}'`

    if [ -n "$TOMCAT_ID" ]; then

        if [ "$i" = "1" ]; then
             echo -n "trying stop ($TOMCAT_ID): $i"
        else
             echo -n -e "\b$i"
        fi


        if [ $i -ge 5 ]; then
             kill "$TOMCAT_ID"
        fi

        sleep 1

    else
        if [ $i -gt 5 ]; then
            echo -e "\n$TOMCAT_BASE was killed($i)"
        else
            echo -e "\n$TOMCAT_BASE was stoped"
        fi

        exit;
    fi

done;

kill -9 "$TOMCAT_ID"

echo "$TOMCAT_BASE was force killed"
