#!/bin/bash
export JAVA_HOME=/home/d/java/default

DELREJECT="/sbin/iptables -t nat -D PREROUTING -i eth0 -p tcp -s 192.168.0.0/24 --dport 8080  -j REDIRECT --to-port 44001"
ADDREJECT="/sbin/iptables -t nat -I PREROUTING -i eth0 -p tcp -s 192.168.0.0/24 --dport 8080  -j REDIRECT --to-port 44001"
n=$(/sbin/iptables -t nat -L -n | grep 192\.168\.0\.0\/24 | grep 'tcp dpt:8080 redir ports 44001' | wc -l)

#### Close port 8080 START
#i=0
#while [ $i -lt $n ]
#do
#        i=$(($i+1))
#        if [ "$i" = $(($n+1)) ]
#        then
#        echo | mail -s "$HOSTNAME Something Wrong with delete 8080 reject"  opsteam@qunar.com page-noc@qunar.com
#        fi
#        $DELREJECT|| break
#done
#
#i=0
#while [ $i -lt 3 ]
#do
#        i=$(($i+1))
#        if [ "$i" = 3 ]
#        then
#        echo | mail -s "$HOSTNAME Something Wrong with add 8080 reject"  opsteam@qunar.com page-noc@qunar.com
#        fi
#        ${ADDREJECT}
#        sleep 2
#        /sbin/iptables -t nat -L -n | grep 192.168.0.0/24 | grep 'tcp dpt:8080 redir ports 44001' && break
#done
#### Close port 8080 STOP


/home/d/tomcat/bin/shutdown.sh
JBossFlag=`ps aux |grep '/home/data/tomcat/bin/bootstrap.jar' | grep -v "grep"|wc -l`
if [ $JBossFlag -gt 0 ]; then
	kill -9 `ps ax | grep '/home/data/tomcat/bin/bootstrap.jar' |grep -v "grep"|awk '{print $1}'`
        sleep 1
	JBossFlag=`ps aux |grep '/home/data/tomcat/bin/bootstrap.jar' |grep -v "grep"|wc -l`
        if [ $JBossFlag -gt 0 ]; then
        echo "Tomcat Shutdown Failed!!!"
        exit
        fi
fi
rm -fR /server/tomcat/work
DATE=`date "+%F %r"`
line=1
while [ $line -lt 101 ]
do
#        echo "$DATE  Restart Tomcat"  >> /server/alltwelllogfile/twelllog/twell237/twell.log

let line="$line+1"
done
echo "Tomcat Shutdown OK!"
echo "Shutdown tomcat at $(date +%F-%H-%M-%S)"  >> /server/tomcat/logs/tomcatreboot.log
