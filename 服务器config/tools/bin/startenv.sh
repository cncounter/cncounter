#!/bin/sh
export JAVA_HOME="/home/data/java/default/"
export TOMCAT_USER=tomcat
#export JAVA_OPTS="-Xms1024m -Xmx1024m -Xmn512m -Xss1024k -verbose:gc -XX:+PrintGCDateStamps -XX:+PrintGCDetails -Xloggc:$CATALINA_BASE/logs/gc.log -server
#export JAVA_OPTS="-Xms1024m -Xmx1024m -Xmn512m -XX:PermSize=160m -XX:-OmitStackTraceInFastThrow -Xss1024k -verbose:gc -XX:+PrintGCDateStamps -XX:+PrintGCDetails -Xloggc:$CATALINA_BASE/logs/gc.log -server -Xrunjdwp:transport=dt_socket,suspend=n,server=y,address=12345"
export JAVA_OPTS="-Xms1024m -Xmx1024m -Xmn512m -XX:PermSize=160m -Xss1024k -verbose:gc -XX:+PrintGCDateStamps -XX:+PrintGCDetails -Xloggc:$CATALINA_BASE/logs/gc.log -server -Xdebug -Xnoagent -Djava.compiler=NONE -Xrunjdwp:transport=dt_socket,suspend=n,server=y,address=12346"
