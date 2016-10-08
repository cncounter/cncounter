#!/bin/sh
#This scripts to gzip all twell log and delete localhost_access_log on tw3 tw4 tw5 tw27 tw28 tw29
#by linsong.wu 2009-04-28


DELDATE=`date -d "7 days ago" +%F`
LogDir="/server/tomcat/logs"
DATE2=$(date -d "2 days ago"  +%F)
TIME=$(date -d 'yesterday' +%F)
HOSTNAME=$(hostname)
TEMP="/tmp"
FILE="localhost_access_log.$TIME.txt" 
SECOND=$(echo $RANDOM | cut -c0-3)
sleep $SECOND

cd $LogDir

###cp localhost_access_log.${TIME}.txt  localhost_access_log.${TIME}
if [ -e $FILE ];then
	/usr/bin/perl /home/q/tools/bin/54xx-check.pl $FILE $TIME $HOSTNAME
else
	exit
fi

#### check 4xx
if [[ -s "$TEMP/$HOSTNAME.4xx.report.$TIME" ]]
then
    sed -i '/\.dll/d'  $TEMP/$HOSTNAME.4xx.report.$TIME
    sed -i '/\.asp/d'  $TEMP/$HOSTNAME.4xx.report.$TIME
    #echo "OK"

fi

if [[ -s " $TEMP/$HOSTNAME.5xx.report.$TIME" ]]
then
    echo "OK"
fi
#####rm -f $FILE


gzip localhost_access_log.${TIME}.txt >/dev/null 2>&1
gzip twell.log.${TIME}* >/dev/null 2>&1
gzip twelllogger.log.${TIME}* >/dev/null 2>&1
gzip diagnose.log.${TIME}* >/dev/null 2>&1
gzip ip-control.log.${DATE2}* >/dev/null 2>&1
gzip booking_validate.log.${TIME}* >/dev/null 2>&1
gzip booksystem.log.${TIME}* >/dev/null 2>&1
gzip flight_ad.log.${TIME}* >/dev/null 2>&1
gzip twell_error.log.${TIME}* >/dev/null 2>&1
gzip lowprice.log.${TIME}* >/dev/null 2>&1
rm -f localhost_access_log.${DELDATE}.txt.gz >/dev/null 2>&1
rm -f  twell.log.${DELDATE}* >/dev/null 2>&1
rm -f  ip-control.log.${DELDATE}* >/dev/null 2>&1
rm -f  booking_validate.log.${DELDATE}* >/dev/null 2>&1
rm -f  booksystem.log.${DELDATE}* >/dev/null 2>&1
rm -f  diagnose.log.${DELDATE}* >/dev/null 2>&1
rm -f  catalina.out.${DELDATE}* >/dev/null 2>&1
rm -f  lowprice.log.${DELDATE}* >/dev/null 2>&1
rm -f  twell_error.log.${DELDATE}* >/dev/null 2>&1
