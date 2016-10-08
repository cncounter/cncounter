#!/bin/bash
#
#
#
###
##########################
# ZIP LOGS
##########################

Z_ZIPDATE="$(date +%F -d "-1 day")";
Z_LOG_LOCATION="/home/q/www";
Z_LOG_DIR="logs";

echo ${Z_ZIPDATE};

for i in `find -L ${Z_LOG_LOCATION} -maxdepth 2 -type d -name ${Z_LOG_DIR}`;
do
        find -L $i -maxdepth 2 -type f  \( -name "*${Z_ZIPDATE}*" -a ! -name "*.gz" \) -exec gzip {} \;
        if [ $(find -L $i -maxdepth 1 -type f -name catalina.out | wc -l ) -gt 0 ];
        then
               if [ -s $i/catalina.out ];
               then
                       cp -ap $i/catalina.out{,.${Z_ZIPDATE}} && :> $i/catalina.out && gzip $i/catalina.out.${Z_ZIPDATE};
               else
                       :;
               fi
        else
               :;
        fi
done


#	##############################################################################
#	#RSYNC TO l-datalog5.data.cn1
#	#echo '*UY&^T76%' > /etc/ops_backup.scrt && chmod 600 /etc/ops_backup.scrt;
#	##############################################################################
#	
#	S_HOST="$(hostname)";
#	S_SYNDATE="$(date +%F -d "-1 day")";
#	S_DELDATE="$(date +%F -d "-3 day")";
#	S_LOGFILE="access catalina";
#	S_LOGDIR="/home/q/www/solo/logs";
#	S_SYNDIR="${S_LOGDIR}/SYN_OK";
#	
#	if echo ${S_LOGDIR} | grep "/$";
#	then
#		:;
#	else
#		S_LOGDIR="$(echo ${S_LOGDIR} | sed 's!$!/!g')";
#		echo ${S_LOGDIR};
#	fi
#	if echo ${S_SYNDIR} | grep "/$";
#	then
#		:;
#	else
#		S_SYNDIR="$(echo ${S_SYNDIR} | sed 's!$!/!g')";
#		echo ${S_SYNDIR};
#	fi
#	
#	S_SYNFILES="$(echo ${S_LOGFILE} | awk '{for (i=1; i<=NF; i++) print "'${S_LOGDIR}'"$i"'.${S_SYNDATE}.log.gz'"}')";
#	S_DELFILES="$(echo ${S_LOGFILE} | awk '{for (i=1; i<=NF; i++) print "'${S_SYNDIR}'"$i"'.${S_DELDATE}.log.gz'"}')";
#	
#	if ls ${S_SYNFILES} &> /dev/null;
#	then
#		if rsync -rav --checksum --progress ${S_SYNFILES} root@l-datalog5.data.cn1::cn1_opsbackup/${S_HOST}/ --password-file=/etc/ops_backup.scrt &> /tmp/${S_HOST}.log_${S_SYNDATE};
#		then
#			if [ -d ${S_SYNDIR} ]
#			then
#				mv ${S_SYNFILES} ${S_SYNDIR};
#			else
#				mkdir -p ${S_SYNDIR} && mv ${S_SYNFILES} ${S_SYNDIR};
#			fi
#		else
#			/bin/mail -s "Subject: ${S_HOST} Backup $S_SYNFILES ERROR.\n" "yigang.sun@qunar.com" < /tmp/${S_HOST}.log_${S_SYNDATE};
#		fi 
#	else
#		:;
#	fi
#	
#	##########################
#	# DEL N DAYS AGO LOGS
#	##########################
#	
#	if ls ${S_DELFILES} &> /dev/null;
#	then
#		rm ${S_DELFILES};
#	else
#		:;
#	fi
#	
