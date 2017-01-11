# WEB2服务器操作记录


## 安装 vim

	yum install -y vim



## CentOS 安装与配置 ss

安装

	yum install -y python-setuptools && easy_install pip
	pip install shadowsocks


### 配置 ss


参考: (https://github.com/renfufei/shadowsocks](https://github.com/renfufei/shadowsocks)


	mkdir -p /etc/shadowsocks
	touch /etc/shadowsocks/config.json
	vim /etc/shadowsocks/config.json

> 内容为:

	{
	    "server_port":10086,
	    "local_port":1080,
	    "password":"******",
	    "timeout":600,
	    "method":"aes-256-cfb"
	}


### 增加自动启动脚本

编辑 /etc/rc.local

	vim /etc/rc.local

在末尾增加内容:

	# start shadowsocks
	/usr/bin/ssserver -c /etc/shadowsocks/config.json -d start


### 手动启动:

	/usr/bin/ssserver -c /etc/shadowsocks/config.json -d start

查看端口监听

	netstat -ntlp

其中, `n` 是用数字显示(number), `t` 是 TCP, `l`是监听(listening), `p`是显示进程(process)的意思.

查看有哪个IP在连接10086端口:

	netstat -nat|grep -i "10086"|grep ESTABLISHED|awk '{print $5}'|awk -F: '{print $1}'|awk '!a[$0]++'


## 修改sshd端口号

首先备份:

	sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak

然后编辑配置文件:

	vim /etc/ssh/sshd_config

去掉其中下面折行的注释(`#`),修改为想要的端口号:

	#Port 22
	Port 10022

然后保存.

接着重启服务:

	service sshd restart

>(已连接的ssh客户端不会断开^_^).

然后客户端需要修改端口号;重新连接


查看端口监听情况:

	netstat -ntlp



## 安装Docker

参考官方文档: [https://docs.docker.com/engine/installation/linux/centos/](https://docs.docker.com/engine/installation/linux/centos/)

查看系统版本号,要求3.10+:

	uname -r

更新 yum 库：

	sudo yum update -y

下载脚本并执行 docker 安装:

	curl -fsSL https://get.docker.com/ | sh

安装完成后允许 docker 服务启动:

	sudo systemctl enable docker.service

启动 Docker daemon; 守护进程:

	sudo systemctl start docker

简单测试:

	sudo docker run --rm hello-world

设置Docker守护进程自动启动:

	sudo systemctl enable docker

### chinese_docker 相关文档

另请参见: [https://github.com/widuu/chinese_docker/blob/master/installation/centos.md](https://github.com/widuu/chinese_docker/blob/master/installation/centos.md)


### 卸载:

查看安装的docker

	yum list installed | grep docker

卸载docker安装包

	sudo yum -y remove docker-engine.x86_64
	sudo yum -y remove docker-engine-selinux.noarch

删除 docker 的所有文件:

	rm -rf /var/lib/docker


## 修改主机名

查看IP映射:

	hostname -i

内容为: 

> 10.172.104.25

查看hosts映射:

cat /etc/hosts

内容为:

	127.0.0.1 localhost
	::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
	10.172.104.25 iZrj91tefvghtch6ehzx7qZXXX

修改对应ip地址的名称:


	vim /etc/hosts

内容为:

	10.172.104.25 cnc-web2

然后保存: 按`Esc`键 然后 `:wq`



接着查看 hostname:

	hostname

内容例如:

> iZrj91tefvghtch6ehzx7qZXXX

sudo hostname

临时修改主机名:

sudo hostname cnc-web2

再次查看IP映射:

	hostname -i

永久修改hostname:

	vim /etc/sysconfig/network

修改以下内容(如果没有,则不管):

	#HOSTNAME=iZu1t995fl8ZXXX
	HOSTNAME=cnc-web2



## 听云sys监控服务器配置

参见: [tingyun-sys_config.md](tingyun-sys_config.md)

## 配置Linux-SSH 互信

首先, 配置主机名称:

	vim /etc/hosts

加入以下内容:

	10.172.115.120 cnc-web1
	10.172.104.25 cnc-web2




1、 生成rsa公钥与私钥;

输入以下命令:

	cd ~
	ssh-keygen -t rsa

然后一路输入回车,不需要修改保存路径,也不设置密码。

2、 在目标服务器上创建 `~/.ssh/` 目录:

	ssh root@cnc-web1 mkdir -p .ssh

3、 将自身的公钥添加到目标服务器的授信KEY中:

执行此命令,或者手动在目标服务器添加均可。

	cat .ssh/id_rsa.pub | ssh root@cnc-web1 'cat >> .ssh/authorized_keys'

4、 修改目标机器上相关目录和文件的权限

	ssh root@cnc-web1 "chmod 700 .ssh; chmod 640 .ssh/authorized_keys"

5、 直接登录



因为端口号修改为 10022,所以需要修改 ssh 客户端的默认配置:

	vim /etc/ssh/ssh_config


在 `#Port 22` 下面增加 `Port 10022`, 

然后再执行命令:

	ssh cnc-web1

如果提示：

> Are you sure you want to continue connecting (yes/no)? <u>yes</u>

则输入 yes , 变成  known_hosts 即可。

OK。

参考: [5步配置Linux免登陆](http://www.tecmint.com/ssh-passwordless-login-using-ssh-keygen-in-5-easy-steps/)



## 安装 lrzsz

	yum install -y lrzsz


##  添加swap分区


1.查看系统是否已经启用swap分区


	cat /proc/swaps

或者使用:

	top

2. 创建一个专门的文件用于swap分区

	mkdir -p /data

	dd if=/dev/zero of=/data/swap bs=512 count=4194304

	chmod 600 /data/swap


稍等一会儿(size = bs * count),阿里云的IO现在大约是45MB/s;

(初始化;写N个`0x00`到文件`/data/swap`)

其中, `/dev/zero` 是一个特殊的文件,通过文件系统可以无限读取...NULL 

当然,对应的 `/dev/null` 则是一个写入黑洞, 可以无限写。

3. 将文件格式化为swap分区:

	mkswap /data/swap

4. 查看内核参数vm.swappiness

	cat /proc/sys/vm/swappiness

或者使用:
	
	sysctl -a | grep swappiness  

如果为0则根据实际情况调整成10或者5; 内存1G设置为10,2G设置为5...

	sysctl -w vm.swappiness=10

若想永久修改，则编辑/etc/sysctl.conf文件

	vim /etc/sysctl.conf

修改其中: 

	vm.swappiness=10

5. 启用交换分区的交换功能

	swapon /data/swap

写入fstab

	echo "/data/swap swap swap defaults    0  0" >> /etc/fstab



6. 如何关闭swap分区？

	swapoff /data/swap

	swapoff -a >/dev/null


参考: [阿里云云主机添加swap分区与swap性能优化](http://dgd2010.blog.51cto.com/1539422/1762907)


##  安装 JDK,设置 JAVA_HOME

安装:
	sudo yum list -y java*
	sudo yum install -y java-1.8.0-openjdk*

设置 JAVA_HOME:

	export JAVA_HOME=/etc/alternatives/java_sdk_1.8.0

设置自动配置环境变量:

	jhometip='# add JAVA_HOME'
	jhomescript='export JAVA_HOME=/etc/alternatives/java_sdk_1.8.0'
	sudo echo $jhometip >> /etc/rc.d/rc.local
	sudo echo $jhomescript >> /etc/rc.d/rc.local

如果只是单个用户,则可以配置为:

	jhometip='# add JAVA_HOME'
	jhomescript='export JAVA_HOME=/etc/alternatives/java_sdk_1.8.0'
	echo $jhometip >> ~/.bash_profile
	echo $jhomescript >> ~/.bash_profile

查看:

	cat /etc/rc.d/rc.local 
	echo $JAVA_HOME

查看 javac 的版本号:

	$JAVA_HOME/bin/javac -version

OK,设置完成.

如果没有重启,则如果使用其他用户登录 Linux, 可能也需要 export 一下。



参考: [http://blog.csdn.net/renfufei/article/details/52621034](http://blog.csdn.net/renfufei/article/details/52621034)


##  安装 Tomcat8

准备目录:

	mkdir -p /usr/local/download
	mkdir -p /usr/local/tools
	

下载:

	cd /usr/local/download
	wget http://apache.fayea.com/tomcat/tomcat-8/v8.5.8/bin/apache-tomcat-8.5.8.tar.gz

解压:

	cd /usr/local/download
	tar zxf apache-tomcat-8.5.8.tar.gz

拷贝:

	mkdir -p /usr/local/tools
	cd /usr/local/download
	mv apache-tomcat-8.5.8 /usr/local/tools/tomcat8

此时,Tomcat8的HOME应该为: `/usr/local/tools/tomcat8`;


修改配置文件:

	cd /usr/local/tools/tomcat8/conf
	cp server.xml server.xml.ORIG

编辑:

	vim server.xml

修改端口号等信息:

	<Server port="18005" shutdown="SHUTDOWN">

	<Connector port="18080" protocol="HTTP/1.1"

	<Connector port="18009" protocol="AJP/1.3" 


修改完成之后保存;

此时,就可以进行启动了。

	/usr/local/tools/tomcat8/bin/startup.sh  


设置Tomcat自动启动


	tomcattip='# start Tomcat'
	tomcatscript='/usr/local/tools/tomcat8/bin/startup.sh'
	sudo echo $tomcattip >> /etc/rc.d/rc.local
	sudo echo $tomcatscript >> /etc/rc.d/rc.local


## 统一归类处理服务器启动脚本:

	mkdir -p /etc/cncounter
	touch /etc/cncounter/setenv.sh
	touch /etc/cncounter/startservers.sh

	chmod 755 /etc/cncounter
	chmod 777 /etc/cncounter/setenv.sh
	chmod 777 /etc/cncounter/startservers.sh


然后将 `/etc/rc.d/rc.local` 之中, 环境变量相关的脚本迁移到 setenv.sh 之中.

	cat /etc/rc.d/rc.local

编辑:

	vim /etc/cncounter/setenv.sh

内容例如(原则上可以执行多次,每个用户都可以自己执行):

	# add JAVA_HOME
	export JAVA_HOME=/etc/alternatives/java_sdk_1.8.0
	# add TOMCAT_HOME
	export TOMCAT_HOME=/usr/local/tools/tomcat8

编辑:

	vim /etc/cncounter/startservers.sh

内容例如(原则上只在服务器启动时执行):

	# start shadowsocks
	/usr/bin/ssserver -c /etc/shadowsocks/config.json -d start
	
	# start Tomcat
	/usr/local/tools/tomcat8/bin/startup.sh


修改 `rc.local` 文件:

	vim /etc/rc.d/rc.local

内容类似于:

	# set env
	source /etc/cncounter/setenv.sh
	# init server
	/etc/cncounter/startservers.sh

对应的 `.bash_profile` 文件也需要修改, 直接调用 `setenv.sh` 即可:


	vim ~/.bash_profile

内容:

	# set env
	source /etc/cncounter/setenv.sh


## 安装 Nginx

参考: [CentOS下yum安装 Nginx: http://blog.csdn.net/renfufei/article/details/48381157](http://blog.csdn.net/renfufei/article/details/48381157)


查看 nginx 和 apache 的安装状态


	yum info nginx

	yum info httpd


如果有Apache,则移除 httpd

	yum remove httpd -y


安装 nginx 的命令


	yum install nginx -y


设置 nginx 自启动

	chkconfig nginx on

可以看到, 在 centos7 下提示,等价于:

	systemctl enable nginx.service


查看服务自启动情况

	chkconfig

启动nginx服务

	service nginx start


查看端口监听状态

	netstat -ntlp


## 听云-Tomcat-监控配置

参考: [tingyun-sys_config.md](tingyun-sys_config.md)



## yum 安装 GIT 客户端的命令

	sudo yum -y install git


## 配置GIT

设置

	git config --global user.name "renfufei"
	git config --global user.email "renfufei@qq.com"

查看GIT配置

	git config --list

## 下载、安装 MAVEN


	mkdir -p /usr/local/download
	cd /usr/local/download
	wget http://mirrors.tuna.tsinghua.edu.cn/apache/maven/maven-3/3.3.9/binaries/apache-maven-3.3.9-bin.tar.gz


	cd /usr/local/download
	tar xzvf apache-maven-3.3.9-bin.tar.gz
	mv apache-maven-3.3.9 /usr/local/tools/apache-maven-3.3.9




设置 PATH

设置 `MAVEN_HOME`:

	vim /etc/cncounter/setenv.sh

增加:


	# add MAVEN_HOME
	export MAVEN_HOME=/usr/local/tools/apache-maven-3.3.9
	# add 2 PATH
	export PATH=$PATH:$MAVEN_HOME/bin




## 配置 Tomcat

备份并修改

	cd /usr/local/tools/tomcat8/conf

	# cp server.xml server.xml.ORIG

	vim /usr/local/tools/tomcat8/conf/server.xml

修改其中的内容:

	<Engine name="Catalina" defaultHost="www.cncounter.com">

	<Host name="www.cncounter.com"  appBase="webapps"
		  unpackWARs="true" autoDeploy="true"

	<Alias>cncounter.com</Alias>
	<Alias>localhost</Alias>
	<Context docBase="/usr/local/cncounter_webapp/cncounter-web"  path="" />


配置完成后的文件请参考: [server.xml](server.xml)


## 配置部署脚本

参考 [stop_and_publish.sh](stop_and_publish.sh)


## 安装 jstatd

参考: [采用 jstatd 监控服务器: http://blog.csdn.net/renfufei/article/details/53187123](http://blog.csdn.net/renfufei/article/details/53187123)


配置 jstatd.all.policy

	mkdir -p /etc/java/
	cd /etc/java/
	vim jstatd.all.policy

文件内容如下:

	grant codebase "file:${java.home}/../lib/tools.jar" { 
	   permission java.security.AllPermission; 
	};


配置启动脚本:

	cd /etc/java/
	vim startjstatd.sh

内容如下:

	jstatd -p 11099 -J-Djava.security.policy=/etc/java/jstatd.all.policy -J-Djava.rmi.server.hostname=47.88.26.176 &

必须指定公网IP，否则不能通过公网连接。


官网介绍:[http://docs.oracle.com/javase/7/docs/technotes/tools/share/jstatd.html](http://docs.oracle.com/javase/7/docs/technotes/tools/share/jstatd.html)


如何通过 ssh tunnel 连接到远程的内网主机:

1. 首先启动内网服务器的 jstatd; 指定IP为局域网IP；
2. 查看 监听的2个端口号;(`netstat -ntlp`; 都是 jstatd 的进程号)
3. 配置 Local(Outcomming) 代理; 2个端口号,把客户机的2个端口号做对应的映射.
4. 增加客户机的IP,和内网机器一模一样。
5. 使用 jvisualvm 连接； 内网机器IP:标准端口号。

经测试成功。 但 proxy 的方式不成功。



## 配置 JMX 远程服务

修改 tomcat 启动文件:

	cd /usr/local/tools/tomcat8

	cp catalina.sh catalina.sh_BAK

	vim catalina.sh

在文件开头的某一行增加以下内容:

	JAVA_OPTS="$JAVA_OPTS -Dcom.sun.management.jmxremote 
		-Dcom.sun.management.jmxremote.port=19999
		-Dcom.sun.management.jmxremote.authenticate=false
		-Dcom.sun.management.jmxremote.ssl=false
		-Djava.rmi.server.hostname=47.88.26.176"


配制时没有换行,不确定加上换行是否有效.

其中 `hostname=47.88.26.176` 是公网IP，`port=19999` 是端口号。

然后重启服务器:

	netstat -ntlp

	cd /usr/local/cncounter_webapp/

	/usr/local/tools/tomcat8/bin/shutdown.sh 

	/usr/local/tools/tomcat8/bin/startup.sh 


稍等一会、继续查看端口号情况:

	netstat -ntlp


如果端口号已经监听, 则可以用上面的 jstatd 连接之中, 添加JMX连接.

JMX连接地址类似于: `47.88.26.176:19999`, 其他默认保持即可。

稍等一会,则连接成功 (JVisualVM的列表中,Tomcat图标上有JMX水印)!


> **说明** : 不确定 JMX 与 jstatd 有没有关系。
>
> 原来没有启用 jstatd 时，无论如何都连接不上 JMX.
>
> 连接上 JMX 之后,有时候 jstatd 的链接用不了,也许是网络超时。


另外应该可以使用 rmiregistry 注册机制：

参见: [官方文档: rmiregistry](http://docs.oracle.com/javase/7/docs/technotes/tools/solaris/rmiregistry.html)


## tomcat 优雅支持 nginx 代理的 https

参考: [https://www.oschina.net/question/12_213459](https://www.oschina.net/question/12_213459)

编辑配置文件

	cd $TOMCAT_HOME/conf/

	vim server.xml

在 Host 下 增加 Valve, 部分代码如下:

            <Valve className="org.apache.catalina.valves.RemoteIpValve"
               remoteIpHeader="x-forwarded-for"
               remoteIpProxiesHeader="x-forwarded-by"
               protocolHeader="x-forwarded-proto"/>



可以看到,通过 Valve, 解析 protocolHeader 部分, http 协议的 header-name 一般不区分大小写。

重启 Tomcat:

	cd /usr/local/cncounter_webapp/

	$TOMCAT_HOME/bin/shutdown.sh

	$TOMCAT_HOME/bin/startup.sh



当然, Nginx 的也需要有对应的配置;

	cd /etc/nginx/

	vim cncounter.com.conf

在其中对应的位置增加一行:

	proxy_set_header X-Forwarded-Proto $scheme;


重新加载 nginx 的配置:

	nginx -s reload

其中, `-s` 是给 nginx 主进程发送信号; 可以使用 `nginx -h` 来查看帮助;

支持的信号包括:  stop, quit, reopen, reload


