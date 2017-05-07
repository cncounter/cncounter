#!/bin/sh
DATE=`date -d "yesterday" +%F`
DELDATE=`date -d "2 days ago" +%F`
LogDir="/server/tomcat/logs"
#DestDir="/server/logfilebackup"
DestDir="/server/logfile"
CacheDir="/server/cache4/twelllog"


cd   $LogDir

gzip localhost_access_log.${DATE}.txt

#gzip ptrace.log.${DATE}-*
#gzip trace.log.${DATE}
gzip twell.log.${DATE}*
gzip twelllogger.log.${DATE}*

#mv  $LogDir/twell.log.${DATE}-*.gz  $DestDir/twelllog/twell3

#cd $DestDir/twelllog/twell3
#tar cf 3.twell.${DATE}.tar twell.log.${DATE}-*.gz
#mv  3.twell.${DATE}.tar  $CacheDir

#cd $CacheDir
#rm -f 3.twell.${DELDATE}.tar

#mv $LogDir/qtrace.log.${DATE}*   $DestDir/qtrace/twell3

#cd $DestDir/qtrace/twell3

##tar cf 3.qtrace.log.${DATE}.tar    qtrace.log.${DATE}*
