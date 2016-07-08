# 云服务器快速部署文档(CentOS-7.2x64)

# 1. 安装JDK

	yum install -y java-1.8.0-openjdk*


##

	whereis java
	ll /usr/bin/java
	ll /etc/alternatives/java
	ll /usr/lib/jvm/java-1.8.0-openjdk-1.8.0.91-1.b14.el7_2.x86_64/jre/bin/java
	ll /usr/lib/jvm/java-1.8.0-openjdk-1.8.0.91-1.b14.el7_2.x86_64

	export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.91-1.b14.el7_2.x86_64


# 2. 安装Tomcat


	mkdir -p  /usr/local/download
	cd /usr/local/download
	wget -O apache-tomcat-8.0.36.tar.gz  http://mirrors.cnnic.cn/apache/tomcat/tomcat-8/v8.0.36/bin/apache-tomcat-8.0.36.tar.gz


	tar zxf apache-tomcat-8.0.36.tar.gz

	mv /usr/local/download/apache-tomcat-8.0.36 /usr/local/tomcat8
	cd /usr/local/tomcat8


# 3. 安装 Nginx



# 4. 安装MariaDB


# 5. 安装HBase


	cd /usr/local/download
	wget -O hbase-1.2.1-bin.tar.gz  http://mirrors.cnnic.cn/apache/hbase/1.2.1/hbase-1.2.1-bin.tar.gz

	tar zxf hbase-1.2.1-bin.tar.gz

	mv /usr/local/download/hbase-1.2.1 /usr/local/hbase-1.2.1

启动命令如下: 

	cd /usr/local/hbase-1.2.1
	./bin/start-hbase.sh


## 5.1 测试




###  中文手册: http://abloz.com/hbase/book.html


# . 配置


# 等待完善

