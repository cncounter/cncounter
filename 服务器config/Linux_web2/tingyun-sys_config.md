# 听云sys监控服务器配置

## 0. 创建目录

mkdir -p /usr/local/tools/tingyun

cd /usr/local/tools/tingyun

## 1. download
wget http://download.networkbench.com/agent/system/1.1.1/tingyun-agent-system-1.1.1.x86_64.rpm?a=1479089111314 -O tingyun-agent-system-1.1.1.x86_64.rpm

## 2. 执行rpm安装

sudo rpm -Uvh tingyun-agent-system-1.1.1.x86_64.rpm

## 3. 设置授权序号

此授权序号,请注册听云后获取:

sudo /usr/local/bin/nbsys-config nbs.license_key=f69dab90e1e75cf3ad1537d771a5ec86

## 4. 启动守护进程

sudo service nbsysd start

## 5. 卸载、重装

停止服务:

	sudo service nbsysd stop

卸载服务:

	chkconfig --del nbsysd

查看:

	rpm -qa | grep tingyun

卸载:

	rpm -e tingyun-agent-system-1.1.1-1.x86_64


查看是否有进程:

	ps -ef | grep tingyun


注: 24小时之内没有数据，则可以删除服务器列表中的item


重新安装: ...


参考地址: https://report.tingyun.com/sys/server/48108/overview


# 安装 unzip 工具

	yum -y install unzip


# 听云-Tomcat-监控配置

参考地址: https://report.tingyun.com/server/overview/application


具体是什么,请注册听云账号后查看。

## 1. 下载:


	mkdir -p /usr/local/tools/tingyun
	cd /usr/local/tools/tingyun

	wget http://download.tingyun.com/agent/java/2.3.0/tingyun-agent-java-2.3.0.zip



## 2. 解压到应用服务器的根目录：

	unzip tingyun-agent-java-2.3.0.zip -d /usr/local/tools/tomcat8/

然后,在tingyun目录下执行自动安装程序：

	cd /usr/local/tools/tomcat8/tingyun
	java -jar tingyun-agent-java.jar install


备份 tingyun 目录下 tingyun.properties 文件

	cd /usr/local/tools/tomcat8/tingyun
	cp tingyun.properties tingyun.properties.ORIG

## 3. 修改配置文件:

	cd /usr/local/tools/tomcat8/tingyun
	vim tingyun.properties

本文中假设 License Key: 

	f69dab90e1e75cf3ad1537d771a5ec86

## 4. 修改license_key的值:


	#nbs.license_key=<%=license_key%>
	nbs.license_key=f69dab90e1e75cf3ad1537d771a5ec86

保存.

## 5. 重启服务器:

	cd ~
	/usr/local/tools/tomcat8/bin/shutdown.sh
	sleep 5
	/usr/local/tools/tomcat8/bin/startup.sh

## 6. 查看探针进程:

	netstat -ntlp


	ps -ef | grep tingyun


稍等一会, 就可以查看监控信息列表界面：  https://report.tingyun.com/server/overview/application

在 安装过程中, 可以看到提示, 如果有错误,请查看 tingyun 的日志文件:

	cat /usr/local/tools/tomcat8/tingyun/logs


OK,安装完毕。 一般来说,可能你需要 root 或者具有高权限的用户来运行 tomcat。

如果需要文档，也可用在新建应用的地方,下载[下载Java探针安装文档](http://download.tingyun.com/agent/java/2.3.0/tingyun-agent-java.pdf?a=1480495122589) ;
